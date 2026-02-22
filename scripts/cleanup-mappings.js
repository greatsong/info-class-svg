/**
 * cleanup-mappings.js
 * generate-all.js에서 아이콘-개념 매핑이 안 맞는 항목을 제거/교체합니다.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'generate-all.js');
let code = fs.readFileSync(FILE, 'utf-8');

// ===== 1. 삭제할 항목 (출력파일명 기준) =====
// 아이콘이 개념과 전혀 안 맞는 매핑들
const DELETE_BY_FILENAME = [
  // 01-devices: 디바이스가 아닌 것
  "'shapes'", // 도형모음 - 디바이스 아님
  "'infinity-device'", // 무한대 - 디바이스 아님
  "'combine'", // 결합 - 너무 추상적

  // 02-physical-computing: 아이콘이 개념과 안 맞는 것
  "'arduino'", // box → 아두이노 (상자 아이콘)
  "'microbit'", // square → 마이크로비트 (네모 아이콘)
  "'wheel'", // circle → 바퀴 (동그라미 아이콘)
  "'robot-arm'", // hand → 로봇팔 (사람 손 아이콘)
  "'ir-sensor'", // eye → 적외선센서 (눈 아이콘)
  "'3d-printer'", // printer → 3D프린터 (일반 프린터 아이콘)
  "'laser-cutter'", // scissors → 레이저커터 (가위 아이콘)
  "'soldering'", // flame → 납땜 (불꽃 아이콘)
  "'breadboard'", // layers → 브레드보드 (레이어 아이콘)
  "'actuator'", // move → 액추에이터 (이동 화살표 아이콘)
  "'circuit-tree'", // binary-tree → 회로트리 (조작된 개념)
  "'cone-sensor'", // cone → 콘센서 (조작된 개념)
  "'hand-sensor'", // hand-helping → 터치센서 (도움 손 아이콘)
  "'module-shapes'", // shapes → 모듈도형 (조작된 개념)
  "'atom-pc'", // atom → 원자 (STEAM에 이미 있음)
  "'flame-sensor'", // flame → 화염센서 (불꽃 아이콘 중복)
  "'water-sensor'", // droplet → 수분센서 (물방울은 너무 일반적)

  // 03-programming: 아이콘이 개념과 안 맞는 것
  "'if-condition'", // git-branch → 조건문 (깃 아이콘)
  "'if-else'", // git-fork → 조건분기 (깃 아이콘)
  "'3d-code'", // scale-3d → 3D코드 (조작된 개념)
  "'infinity-loop'", // infinity → 무한루프 (무한 기호)
  "'ratio'", // ratio → 비율 (프로그래밍 아님)
  "'proportions'", // proportions → 비례 (프로그래밍 아님)

  // 04-algorithm: 대부분 아이콘이 개념과 전혀 안 맞음
  "'bubble-sort'", // arrow-up-down → 버블정렬
  "'selection-sort'", // arrow-down-up → 선택정렬
  "'insertion-sort'", // indent-increase → 삽입정렬
  "'merge-sort'", // split → 합병정렬
  "'quick-sort'", // zap → 퀵정렬
  "'binary-search'", // scan-search → 이진탐색
  "'greedy'", // coins → 탐욕법
  "'dynamic-prog'", // table-2 → 동적프로그래밍
  "'big-o'", // gauge → 빅오표기법
  "'pattern-recognition'", // scan-eye → 패턴인식
  "'abstraction'", // boxes → 추상화
  "'scale-balance'", // scale → 저울 (알고리즘 아님)
  "'decomposition'", // shapes → 분해
  "'combine-algo'", // combine → 합성
  "'infinity-algo'", // infinity → 무한
  "'compare'", // git-compare → 비교 (깃 아이콘)
  "'heap'", // triangle → 힙
  "'hash-table'", // grid-2x2 → 해시테이블
  "'dfs'", // git-branch 중복
  "'queue'", // list-ordered → 큐 (순서목록 ≠ 큐)

  // 05-network-security: 아이콘이 개념과 안 맞는 것
  "'hand-trust'", // hand-helping → 신뢰손 (조작된 개념)
  "'location'", // map-pin → 위치표시 (네트워크/보안 아님)

  // 07-design-thinking:
  "'mockup'", // smartphone → 목업 (스마트폰 ≠ 목업)
];

// ===== 2. 교체할 항목 (더 나은 아이콘으로) =====
const REPLACEMENTS = [
  // 02-physical-computing: DC모터 → Tabler circuit-motor
  { old: "['settings','dc-motor'", new: "['circuit-motor','dc-motor'" },
  // 04-algorithm: 스택 → Tabler stack-2
  { old: "['layers','stack'", new: "['stack-2','stack'" },
  // 04-algorithm: 이진트리 → Tabler binary-tree
  { old: "['git-branch','binary-tree'", new: "['binary-tree','binary-tree'" },
  // 04-algorithm: 그래프 → Tabler graph
  { old: "['share-2','graph'", new: "['graph','graph'" },
  // 04-algorithm: 정렬 → Tabler arrows-sort
  { old: "['bar-chart','sorting'", new: "['arrows-sort','sorting'" },
  // 04-algorithm: BFS → Tabler topology-star-ring
  { old: "['network','bfs'", new: "['topology-star-ring','bfs'" },
  // 02-physical-computing: 아두이노보드 이름 변경
  { old: "['microchip','arduino-board','아두이노보드','아두이노 플랫폼','피지컬컴퓨팅, 코딩']", new: "['microchip','microchip','마이크로칩','집적 회로 칩','피지컬컴퓨팅, 마이크로프로세서']" },
];

// ===== 실행 =====
let lines = code.split('\n');
let removedCount = 0;

// 삭제 처리
lines = lines.filter(line => {
  for (const fn of DELETE_BY_FILENAME) {
    if (line.includes(fn + ',') || line.includes(fn + ']')) {
      console.log(`DELETE: ${fn} — ${line.trim().substring(0, 80)}`);
      removedCount++;
      return false;
    }
  }
  return true;
});

// 교체 처리
let replacedCount = 0;
let result = lines.join('\n');
for (const r of REPLACEMENTS) {
  if (result.includes(r.old)) {
    result = result.replace(r.old, r.new);
    console.log(`REPLACE: ${r.old.substring(0, 40)} → ${r.new.substring(0, 40)}`);
    replacedCount++;
  }
}

fs.writeFileSync(FILE, result, 'utf-8');
console.log(`\n✓ ${removedCount} entries removed, ${replacedCount} entries replaced`);
