/**
 * SVG 아이콘 검증 스크립트
 * - 모든 SVG 파일의 구조적 무결성 검사
 * - viewBox, gradient, background rect, 아이콘 콘텐츠 확인
 * - catalog.json과 실제 파일 일치 여부 검증
 *
 * 사용법: node scripts/validate-svg.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SVG_DIR = path.join(ROOT, 'svg');
const CATALOG_PATH = path.join(ROOT, 'catalog.json');

let errors = 0;
let warnings = 0;
let checked = 0;

function error(msg) { console.error(`  ✗ ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠ ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✓ ${msg}`); }

// ── 1. SVG 파일별 구조 검증 ──────────────────────────────────
function validateSvgFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileErrors = errors;

  // 빈 파일 검사
  if (content.trim().length === 0) {
    error(`${rel}: 빈 파일`);
    return;
  }

  // 최소 크기 검사 (정상 SVG는 최소 200바이트 이상)
  if (content.length < 100) {
    error(`${rel}: 파일 크기 너무 작음 (${content.length}B) — 손상 가능성`);
    return;
  }

  // viewBox="0 0 64 64" 확인
  if (!content.includes('viewBox="0 0 64 64"')) {
    error(`${rel}: viewBox="0 0 64 64" 누락`);
  }

  // xmlns 확인
  if (!content.includes('xmlns="http://www.w3.org/2000/svg"')) {
    error(`${rel}: xmlns 선언 누락`);
  }

  // linearGradient 정의 확인
  if (!content.includes('<linearGradient')) {
    error(`${rel}: linearGradient 정의 누락`);
  }

  // 배경 rect 확인 (rx="16")
  if (!content.includes('rx="16"')) {
    error(`${rel}: 배경 둥근사각형 (rx="16") 누락`);
  }

  // 아이콘 콘텐츠 존재 확인 (숫자 SVG는 <text>, 일반은 <g transform>)
  const hasIconGroup = content.includes('<g transform="translate(14,14) scale(1.5)"');
  const hasTextContent = content.includes('<text');
  if (!hasIconGroup && !hasTextContent) {
    error(`${rel}: 아이콘 콘텐츠 (<g transform> 또는 <text>) 누락`);
  }

  // stroke="currentColor" 잔류 검사 (변환이 안 된 경우)
  if (content.includes('stroke="currentColor"')) {
    error(`${rel}: stroke="currentColor" 미변환 — 그래디언트 적용 안 됨`);
  }

  // 닫는 태그 확인
  if (!content.includes('</svg>')) {
    error(`${rel}: </svg> 닫는 태그 누락 — SVG 손상`);
  }

  checked++;
  if (errors === fileErrors) return true; // 에러 없음
  return false;
}

// ── 2. 디렉토리 구조 검증 ────────────────────────────────────
function validateDirectoryStructure() {
  console.log('\n[1/4] 디렉토리 구조 검증');

  if (!fs.existsSync(SVG_DIR)) {
    error('svg/ 디렉토리가 존재하지 않음');
    return;
  }

  const categories = fs.readdirSync(SVG_DIR).filter(d =>
    fs.statSync(path.join(SVG_DIR, d)).isDirectory()
  ).sort();

  if (categories.length === 0) {
    error('svg/ 하위에 카테고리 폴더 없음');
    return;
  }

  // 카테고리 네이밍 규칙 (01-xxx, 02-xxx, ...)
  categories.forEach(cat => {
    if (!/^\d{2}-[\w-]+$/.test(cat)) {
      warn(`${cat}: 카테고리 폴더 명명 규칙 불일치 (XX-name 형식 권장)`);
    }
  });

  ok(`${categories.length}개 카테고리 발견: ${categories.join(', ')}`);
  return categories;
}

// ── 3. 모든 SVG 파일 검증 ────────────────────────────────────
function validateAllSvgFiles(categories) {
  console.log('\n[2/4] SVG 파일 구조 검증');

  let totalFiles = 0;
  let passedFiles = 0;

  categories.forEach(cat => {
    const catDir = path.join(SVG_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.svg')).sort();

    if (files.length === 0) {
      warn(`${cat}/: SVG 파일 없음 — 빈 카테고리`);
      return;
    }

    files.forEach(file => {
      const passed = validateSvgFile(path.join(catDir, file));
      totalFiles++;
      if (passed) passedFiles++;
    });

    // 파일명 중복 검사
    const names = files.map(f => f.replace('.svg', ''));
    const dupes = names.filter((n, i) => names.indexOf(n) !== i);
    if (dupes.length > 0) {
      error(`${cat}/: 중복 파일명 — ${dupes.join(', ')}`);
    }
  });

  console.log(`  → ${totalFiles}개 파일 검사, ${passedFiles}개 통과`);
  return totalFiles;
}

// ── 4. catalog.json 검증 ─────────────────────────────────────
function validateCatalog(categories) {
  console.log('\n[3/4] catalog.json 검증');

  if (!fs.existsSync(CATALOG_PATH)) {
    error('catalog.json 파일 없음 — node scripts/generate-all.js 실행 필요');
    return;
  }

  let catalog;
  try {
    catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8'));
  } catch (e) {
    error(`catalog.json 파싱 실패: ${e.message}`);
    return;
  }

  // 필수 필드 확인
  if (!catalog.version) warn('catalog.json: version 필드 없음');
  if (!catalog.totalCount) warn('catalog.json: totalCount 필드 없음');
  if (!Array.isArray(catalog.categories)) {
    error('catalog.json: categories 배열 없음');
    return;
  }
  if (!Array.isArray(catalog.icons)) {
    error('catalog.json: icons 배열 없음');
    return;
  }

  // 실제 파일과 catalog 매칭 검사
  const catalogFiles = new Set(catalog.icons.map(i => `${i.category}/${i.filename}`));
  let missingInCatalog = 0;
  let missingOnDisk = 0;

  // 디스크에 있는데 catalog에 없는 파일
  categories.forEach(cat => {
    const catDir = path.join(SVG_DIR, cat);
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.svg'));
    files.forEach(f => {
      if (!catalogFiles.has(`${cat}/${f}`)) {
        warn(`${cat}/${f}: 디스크에 존재하나 catalog.json에 누락`);
        missingInCatalog++;
      }
    });
  });

  // catalog에 있는데 디스크에 없는 파일
  catalog.icons.forEach(icon => {
    const filePath = path.join(SVG_DIR, icon.category, icon.filename);
    if (!fs.existsSync(filePath)) {
      error(`${icon.category}/${icon.filename}: catalog에 등록되었으나 파일 없음`);
      missingOnDisk++;
    }
  });

  // 아이콘 메타데이터 검사
  catalog.icons.forEach(icon => {
    if (!icon.name || icon.name.trim() === '') {
      warn(`${icon.category}/${icon.filename}: 한국어 이름 비어있음`);
    }
    if (!icon.description || icon.description.trim() === '') {
      warn(`${icon.category}/${icon.filename}: 설명 비어있음`);
    }
  });

  // totalCount 일치 확인
  const actualCount = catalog.icons.length;
  if (catalog.totalCount !== actualCount) {
    warn(`catalog.json: totalCount(${catalog.totalCount}) ≠ 실제 아이콘 수(${actualCount})`);
  }

  ok(`catalog.json: ${catalog.icons.length}개 아이콘 등록, ${catalog.categories.length}개 카테고리`);
  if (missingInCatalog > 0) warn(`${missingInCatalog}개 파일이 catalog에 미등록`);
  if (missingOnDisk > 0) error(`${missingOnDisk}개 catalog 항목의 파일 없음`);
}

// ── 5. catalog.csv 검증 ──────────────────────────────────────
function validateCatalogCsv() {
  console.log('\n[4/4] catalog.csv 검증');

  const csvPath = path.join(ROOT, 'catalog.csv');
  if (!fs.existsSync(csvPath)) {
    error('catalog.csv 파일 없음');
    return;
  }

  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());

  // BOM 확인
  if (!content.startsWith('\uFEFF')) {
    warn('catalog.csv: UTF-8 BOM 누락 — 엑셀 호환성 문제 가능');
  }

  // 헤더 확인
  const header = lines[0].replace('\uFEFF', '');
  if (header !== '파일명,카테고리,이미지이름,이미지설명,사용하면좋을상황') {
    warn('catalog.csv: 헤더 형식 불일치');
  }

  ok(`catalog.csv: ${lines.length - 1}개 행`);
}

// ── 실행 ─────────────────────────────────────────────────────
console.log('═══════════════════════════════════════════');
console.log(' SVG 아이콘 검증 시작');
console.log('═══════════════════════════════════════════');

const categories = validateDirectoryStructure();
if (categories) {
  validateAllSvgFiles(categories);
  validateCatalog(categories);
  validateCatalogCsv();
}

console.log('\n═══════════════════════════════════════════');
console.log(` 검증 완료: ${checked}개 검사 | ${errors}개 오류 | ${warnings}개 경고`);
console.log('═══════════════════════════════════════════');

if (errors > 0) {
  console.log('\n오류가 발견되었습니다. 위 항목을 수정 후 다시 실행하세요.');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n경고가 있지만 배포에는 문제없습니다.');
  process.exit(0);
} else {
  console.log('\n모든 검증을 통과했습니다!');
  process.exit(0);
}
