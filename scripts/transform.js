const fs = require('fs');
const path = require('path');

const LUCIDE_DIR = path.join(__dirname, '..', 'node_modules', 'lucide-static', 'icons');
const SVG_DIR = path.join(__dirname, '..', 'svg');
const MAPPING_FILE = path.join(__dirname, 'icon-mapping.json');

// 카테고리별 컬러 팔레트
const PALETTES = {
  '01-devices': {
    bg: '#eff6ff',
    colors: ['#2563eb', '#60a5fa', '#1e40af', '#475569', '#94a3b8'],
    gradients: [['#2563eb', '#60a5fa'], ['#1e40af', '#60a5fa']],
  },
  '02-physical-computing': {
    bg: '#f0fdf4',
    colors: ['#16a34a', '#4ade80', '#15803d', '#fbbf24', '#ea580c'],
    gradients: [['#16a34a', '#4ade80'], ['#15803d', '#86efac']],
  },
  '03-programming': {
    bg: '#f0fdf4',
    colors: ['#16a34a', '#4ade80', '#facc15', '#15803d', '#a3e635'],
    gradients: [['#16a34a', '#4ade80'], ['#15803d', '#a3e635']],
  },
  '04-algorithm': {
    bg: '#ecfeff',
    colors: ['#0891b2', '#06b6d4', '#22d3ee', '#155e75', '#67e8f9'],
    gradients: [['#0891b2', '#22d3ee'], ['#155e75', '#06b6d4']],
  },
  '05-network-security': {
    bg: '#fef2f2',
    colors: ['#dc2626', '#f87171', '#2563eb', '#60a5fa', '#fbbf24'],
    gradients: [['#dc2626', '#f87171'], ['#2563eb', '#60a5fa']],
  },
  '06-data-ai': {
    bg: '#eff6ff',
    colors: ['#2563eb', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'],
    gradients: [['#2563eb', '#8b5cf6'], ['#06b6d4', '#10b981']],
  },
  '07-design-thinking': {
    bg: '#fdf2f8',
    colors: ['#ec4899', '#f472b6', '#8b5cf6', '#a78bfa', '#fbbf24'],
    gradients: [['#ec4899', '#f472b6'], ['#8b5cf6', '#a78bfa']],
  },
  '08-steam': {
    bg: '#fff7ed',
    colors: ['#ea580c', '#fb923c', '#f59e0b', '#fbbf24', '#16a34a'],
    gradients: [['#ea580c', '#fb923c'], ['#f59e0b', '#fbbf24']],
  },
  '09-teaching': {
    bg: '#ecfeff',
    colors: ['#0891b2', '#22d3ee', '#f59e0b', '#fbbf24', '#16a34a'],
    gradients: [['#0891b2', '#22d3ee'], ['#f59e0b', '#fbbf24']],
  },
  '10-visual-symbols': {
    bg: '#f8fafc',
    colors: ['#1e293b', '#475569', '#2563eb', '#dc2626', '#16a34a'],
    gradients: [['#1e293b', '#475569'], ['#2563eb', '#60a5fa']],
  },
};

function transformSvg(lucideContent, category, iconIndex) {
  const palette = PALETTES[category];
  if (!palette) {
    console.error(`Unknown category: ${category}`);
    return null;
  }

  // Lucide SVG에서 내부 요소만 추출
  const innerMatch = lucideContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!innerMatch) return null;

  let inner = innerMatch[1]
    .replace(/<!--[\s\S]*?-->/g, '') // 주석 제거
    .trim();

  // 그래디언트 선택 (아이콘 인덱스 기반으로 번갈아 사용)
  const gradIdx = iconIndex % 2;
  const [gradStart, gradEnd] = palette.gradients[gradIdx];

  // 보조 색상 선택
  const accentColor = palette.colors[(iconIndex + 2) % palette.colors.length];

  // 고유 ID (충돌 방지)
  const uid = `g${category.replace(/[^a-z0-9]/g, '')}${iconIndex}`;

  // stroke="currentColor"를 그래디언트 URL로 교체
  inner = inner.replace(/stroke="currentColor"/g, `stroke="url(#${uid})"`);
  // fill="none"은 유지 (라인 아이콘이므로)

  // viewBox 변환: 24x24 → 64x64 (아이콘을 중앙에 36x36으로 배치)
  // translate(14, 14) scale(1.5) → 24*1.5=36, (64-36)/2=14
  const transformed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="${uid}" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${gradStart}"/>
      <stop offset="100%" stop-color="${gradEnd}"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="56" height="56" rx="16" fill="${palette.bg}"/>
  <rect x="4" y="4" width="56" height="56" rx="16" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.15"/>
  <g transform="translate(14, 14) scale(1.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${inner}
  </g>
</svg>`;

  return transformed;
}

function main() {
  // 매핑 파일 읽기
  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));

  let totalGenerated = 0;
  let totalFailed = 0;

  for (const [category, icons] of Object.entries(mapping)) {
    const categoryDir = path.join(SVG_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    icons.forEach((icon, index) => {
      const lucideFile = path.join(LUCIDE_DIR, `${icon.lucide}.svg`);

      if (!fs.existsSync(lucideFile)) {
        console.error(`Missing: ${icon.lucide}.svg`);
        totalFailed++;
        return;
      }

      const lucideContent = fs.readFileSync(lucideFile, 'utf-8');
      const transformed = transformSvg(lucideContent, category, index);

      if (transformed) {
        const outFile = path.join(categoryDir, `${icon.filename}.svg`);
        fs.writeFileSync(outFile, transformed);
        totalGenerated++;
      } else {
        totalFailed++;
      }
    });

    console.log(`✓ ${category}: ${icons.length} icons`);
  }

  console.log(`\nTotal: ${totalGenerated} generated, ${totalFailed} failed`);
}

main();
