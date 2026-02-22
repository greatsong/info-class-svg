# 교육용 SVG 아이콘 라이브러리

출판 수준의 교육자료(중고등 정보 교과서, 초등~중등 SW교육 워크북, 교사용 수업 자료, 프로젝트 수업)에 사용할 SVG 아이콘 라이브러리입니다.

## 라이브 갤러리

**https://greatsong.github.io/info-class-svg/**

- 실시간 검색, 카테고리 필터
- 그리드 뷰 / 문서(테이블) 뷰
- 클릭 시 다운로드 / SVG 코드 복사
- 다크모드 지원

## 현재 상태

- **총 887개** SVG 아이콘 (목표: 1000개)
- 12개 카테고리
- Lucide + Tabler Icons 기반 자동 변환 + 커스텀 숫자 SVG 생성

## 카테고리 구조

| # | 카테고리 | 폴더명 | 개수 | 설명 |
|---|---------|--------|------|------|
| 01 | 컴퓨터와 디지털 기기 | `01-devices` | 63 | PC, 모바일, 주변기기, 부품, IoT |
| 02 | 피지컬컴퓨팅과 메이킹 | `02-physical-computing` | 70 | 센서, 액추에이터, 회로, 로봇, 논리게이트 |
| 03 | 소프트웨어와 프로그래밍 | `03-programming` | 90 | 변수, 조건문, 반복문, 함수, 블록코딩, 언어 |
| 04 | 알고리즘과 자료구조 | `04-algorithm` | 84 | 정렬, 탐색, 스택, 큐, 트리, 수학, 토폴로지, 그래프 알고리즘 |
| 05 | 네트워크와 정보보안 | `05-network-security` | 64 | 인터넷, 프로토콜, 보안, 클라우드, 디지털시민성 |
| 06 | 데이터와 인공지능 | `06-data-ai` | 79 | 데이터 수집/분석/시각화, ML, AI, 통계 |
| 07 | 디자인씽킹과 문제해결 | `07-design-thinking` | 59 | 공감, 정의, 아이디어, 프로토타입, 검증 |
| 08 | STEAM 융합 | `08-steam` | 109 | 과학/수학/사회/미술/음악, 2D·3D 도형, 악기 |
| 09 | 수업 활동과 평가 | `09-teaching` | 64 | 교과서, 학습목표, 루브릭, 피드백, 학용품 |
| 10 | 시각 기호와 안내 요소 | `10-visual-symbols` | 120 | 화살표, 체크, 경고, 도형기호, 변환, 레이어 |
| 11 | 숫자와 번호 | `11-numbers` | 51 | 숫자 0~40, 원숫자 0~9 |
| 12 | 도형과 입체 | `12-shapes` | 34 | 2D 기본도형, 3D 입체도형, 치수, 비율 |

## SVG 스타일 스펙

- **viewBox**: `0 0 64 64`
- **배경**: 카테고리별 밝은 색상의 둥근 사각형 (`rx="16"`)
- **아이콘**: Lucide/Tabler 24x24 → `scale(1.5)` → 36x36로 중앙 배치
- **색상**: 카테고리별 그래디언트 + 엑센트 컬러 (2~5색)
- **라인**: `stroke-linecap="round"`, `stroke-linejoin="round"`, `stroke-width="2"`

### 카테고리별 컬러 팔레트

| 카테고리 | 배경 | 그래디언트 | 엑센트 |
|---------|------|-----------|--------|
| 01 기기 | `#eff6ff` | `#2563eb → #60a5fa` | `#1e40af` `#475569` `#94a3b8` |
| 02 피지컬 | `#f0fdf4` | `#16a34a → #4ade80` | `#fbbf24` `#ea580c` `#15803d` |
| 03 프로그래밍 | `#f0fdf4` | `#16a34a → #4ade80` | `#facc15` `#15803d` `#a3e635` |
| 04 알고리즘 | `#ecfeff` | `#0891b2 → #22d3ee` | `#06b6d4` `#155e75` `#67e8f9` |
| 05 네트워크 | `#fef2f2` | `#dc2626 → #f87171` | `#2563eb` `#fbbf24` `#60a5fa` |
| 06 데이터/AI | `#eff6ff` | `#2563eb → #8b5cf6` | `#06b6d4` `#f59e0b` `#10b981` |
| 07 디자인씽킹 | `#fdf2f8` | `#ec4899 → #f472b6` | `#8b5cf6` `#fbbf24` `#a78bfa` |
| 08 STEAM | `#fff7ed` | `#ea580c → #fb923c` | `#f59e0b` `#fbbf24` `#16a34a` |
| 09 수업/평가 | `#ecfeff` | `#0891b2 → #22d3ee` | `#f59e0b` `#fbbf24` `#16a34a` |
| 10 시각기호 | `#f8fafc` | `#1e293b → #475569` | `#2563eb` `#dc2626` `#16a34a` |
| 11 숫자 | `#fef3c7` | `#d97706 → #f59e0b` | `#92400e` `#d97706` `#fbbf24` |
| 12 도형 | `#fae8ff` | `#9333ea → #c084fc` | `#6b21a8` `#9333ea` `#a855f7` |

## 파일 구조

```
info-class-svg/
├── README.md                 ← 이 문서
├── index.html                ← GitHub Pages 갤러리 (순수 HTML+CSS+JS)
├── catalog.json              ← 아이콘 메타데이터 (검색/필터용)
├── catalog.csv               ← 스프레드시트 호환 카탈로그
├── package.json              ← npm 의존성 (lucide-static, @tabler/icons)
├── .gitignore
├── .nojekyll                 ← GitHub Pages Jekyll 비활성화
├── scripts/
│   ├── generate-all.js       ← 핵심 생성 스크립트 (아이콘 매핑 + 변환 + 카탈로그)
│   ├── validate-svg.js       ← SVG 검증 스크립트 (구조 무결성 + catalog 일치 검사)
│   ├── transform.js          ← 초기 변환 스크립트 (deprecated, generate-all.js로 통합)
│   └── icon-mapping.json     ← 초기 매핑 (deprecated)
└── svg/
    ├── 01-devices/           (63 SVGs)
    ├── 02-physical-computing/(70 SVGs)
    ├── 03-programming/       (90 SVGs)
    ├── 04-algorithm/         (84 SVGs)
    ├── 05-network-security/  (64 SVGs)
    ├── 06-data-ai/           (79 SVGs)
    ├── 07-design-thinking/   (59 SVGs)
    ├── 08-steam/             (109 SVGs)
    ├── 09-teaching/          (64 SVGs)
    ├── 10-visual-symbols/    (120 SVGs)
    ├── 11-numbers/           (51 SVGs)
    └── 12-shapes/            (34 SVGs)
```

## 핵심 스크립트: `scripts/generate-all.js`

이 스크립트 하나로 SVG 생성, catalog.json, catalog.csv를 모두 만듭니다.

### 실행 방법

```bash
# 의존성 설치 (최초 1회)
npm install

# 전체 재생성
node scripts/generate-all.js
```

### 스크립트 구조

```javascript
// 1. 카테고리별 컬러 팔레트 (PALETTES 객체)
// 2. 아이콘 매핑 (ICONS 객체)
//    - [lucide/tabler-아이콘명, 출력파일명, 한국어이름, 설명, 사용상황]
// 3. transformSvg() - SVG 변환 함수
//    - 24x24 → 64x64 viewBox
//    - 배경 rect + 그래디언트 적용
//    - stroke="currentColor" → stroke="url(#gradient)"
// 4. 아이콘 소스 해석 순서: Lucide → Tabler fallback
// 5. catalog.json, catalog.csv 자동 생성
```

### 아이콘 소스

| 소스 | npm 패키지 | 아이콘 수 | 경로 |
|------|-----------|----------|------|
| Lucide | `lucide-static` | ~1,936 | `node_modules/lucide-static/icons/` |
| Tabler | `@tabler/icons` | ~4,985 | `node_modules/@tabler/icons/icons/outline/` |

두 소스 모두 동일한 형식: 24x24, `stroke="currentColor"`, `stroke-width="2"`, MIT 라이선스

추가로, Tabler에 없는 숫자(12~40)는 `generateNumberSvg()` 함수로 커스텀 생성합니다.
아이콘명이 `_num:숫자` 형식이면 텍스트 기반 SVG를 자동 생성합니다.

### 변환 과정

```
원본 (Lucide/Tabler 24x24)     →     변환 결과 (64x64)
┌──────────────────────┐       ┌──────────────────────────────┐
│ <svg viewBox="0 0     │       │ <svg viewBox="0 0 64 64">   │
│   24 24">             │       │   <defs>                     │
│   <path d="..." />    │  →    │     <linearGradient .../>    │
│ </svg>                │       │   </defs>                    │
│                       │       │   <rect rx="16" fill="bg"/>  │
│                       │       │   <g transform="translate    │
│                       │       │     (14,14) scale(1.5)">     │
│                       │       │     <path d="..." />         │
│                       │       │   </g>                       │
│                       │       │ </svg>                       │
└──────────────────────┘       └──────────────────────────────┘
```

## 아이콘 추가 → 테스트 → 문서화 → 배포 프로세스

새 아이콘을 추가할 때 아래 순서를 따릅니다. 이상한 아이콘이 섞이지 않도록 **검증 단계를 반드시 거칩니다**.

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐
│ 1. 아이콘    │ →  │ 2. 생성       │ →  │ 3. 검증       │ →  │ 4. 배포   │
│    매핑 추가  │    │ npm run      │    │ npm run      │    │ git push │
│              │    │   generate   │    │   validate   │    │          │
└─────────────┘    └──────────────┘    └──────────────┘    └──────────┘
```

### Step 1. 아이콘 매핑 추가

`scripts/generate-all.js`의 `ICONS` 객체에서 해당 카테고리 배열에 항목 추가:

```javascript
'01-devices': [
  // ... 기존 아이콘들 ...
  ['lucide-icon-name', 'output-filename', '한국어이름', '설명', '사용상황'],
],
```

- `lucide-icon-name`: Lucide 또는 Tabler 아이콘 이름 (확장자 없이)
  - Lucide 아이콘 목록: https://lucide.dev/icons
  - Tabler 아이콘 목록: https://tabler.io/icons (outline만 사용)
- `output-filename`: 출력 파일명 (확장자 없이, `.svg` 자동 추가)
- 한국어이름, 설명, 사용상황: catalog에 들어갈 메타데이터

새 카테고리를 추가하려면:

1. `PALETTES` 객체에 컬러 팔레트 추가
2. `ICONS` 객체에 카테고리 배열 추가
3. `index.html`의 `CN` 객체에 카테고리 한국어명 추가

### Step 2. 생성 (Generate)

```bash
npm run generate
```

SVG 파일, catalog.json, catalog.csv가 모두 재생성됩니다. 콘솔에 카테고리별 개수와 실패 건수가 출력됩니다.

### Step 3. 검증 (Validate)

```bash
npm run validate
```

검증 스크립트(`scripts/validate-svg.js`)가 자동으로 다음 항목을 검사합니다:

| 검사 항목 | 설명 |
|-----------|------|
| 빈 파일 / 손상 | 파일이 비어있거나 100B 미만이면 오류 |
| viewBox | `0 0 64 64` 형식인지 확인 |
| xmlns | SVG namespace 선언 존재 확인 |
| linearGradient | 그래디언트 정의 존재 확인 |
| 배경 rect | `rx="16"` 둥근사각형 배경 확인 |
| 아이콘 콘텐츠 | `<g transform>` 또는 `<text>` 존재 확인 |
| currentColor 잔류 | 그래디언트 미적용 아이콘 감지 |
| 닫는 태그 | `</svg>` 존재 확인 |
| 파일명 중복 | 같은 카테고리 내 중복 파일명 감지 |
| catalog ↔ 파일 일치 | catalog.json 등록과 실제 파일 매칭 |
| 메타데이터 | 한국어 이름, 설명 빈값 경고 |
| CSV 형식 | UTF-8 BOM, 헤더 형식 확인 |

**오류(✗)가 있으면 `exit 1`** 로 종료되어, CI나 배포 스크립트에서 자동으로 중단됩니다.

### Step 4. 배포 (Deploy)

검증 통과 후 GitHub Pages에 배포합니다:

```bash
# 방법 A: 한 번에 생성 + 검증 + 커밋 + 푸시
npm run deploy

# 방법 B: 단계별 수동
npm run build          # generate + validate
git add -A
git commit -m "add: 새 아이콘 설명"
git push
```

GitHub Pages가 `master` 브랜치에서 자동 빌드되므로, push 후 1~2분 내에 https://greatsong.github.io/info-class-svg/ 에 반영됩니다.

### npm scripts 요약

| 명령어 | 동작 |
|--------|------|
| `npm run generate` | SVG + catalog.json + catalog.csv 생성 |
| `npm run validate` | 모든 SVG 파일 + catalog 검증 |
| `npm run build` | generate → validate (생성 후 검증) |
| `npm test` | validate와 동일 (CI 호환) |
| `npm run deploy` | generate → validate → git commit → push |

### 빠른 체크리스트

새 아이콘을 추가할 때 이 체크리스트를 따르세요:

- [ ] `scripts/generate-all.js`의 `ICONS`에 항목 추가
- [ ] Lucide/Tabler에 해당 아이콘이 있는지 확인
- [ ] `npm run build` 실행 (생성 + 검증)
- [ ] 검증 결과에 오류(✗) 없는지 확인
- [ ] 갤러리에서 새 아이콘 육안 확인 (`index.html`을 브라우저로 열기)
- [ ] `git add`, `git commit`, `git push`
- [ ] GitHub Pages 반영 확인

## catalog.json 구조

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-02-22T...",
  "totalCount": 510,
  "categories": [
    { "id": "01-devices", "name": "컴퓨터와 디지털 기기", "count": 40 }
  ],
  "icons": [
    {
      "filename": "monitor.svg",
      "category": "01-devices",
      "name": "모니터",
      "description": "컴퓨터 모니터 화면",
      "tags": ["모니터", "컴퓨터", "화면"],
      "useCases": "컴퓨터 구성요소 설명, 출력장치 소개",
      "source": "lucide"
    }
  ]
}
```

## catalog.csv 형식

UTF-8 BOM 인코딩, 엑셀/구글 시트 호환:

```
파일명,카테고리,이미지이름,이미지설명,사용하면좋을상황
monitor.svg,01-devices,모니터,컴퓨터 모니터 화면,"컴퓨터 구성요소 설명, 출력장치 소개"
```

## 갤러리 (index.html) 기능

- **순수 HTML+CSS+JS** — 외부 의존성 없음
- `catalog.json`을 fetch하여 동적 렌더링
- 실시간 검색: 이름, 설명, 사용상황, 카테고리명으로 필터
- 두 가지 뷰: 그리드 (아이콘 카드) / 문서 (테이블)
- 모달: 아이콘 상세 정보, 다운로드, SVG 코드 복사
- 다크모드: `prefers-color-scheme` 자동 감지
- CSV/JSON 다운로드 링크

## 라이선스

아이콘 원본: [Lucide](https://lucide.dev) + [Tabler Icons](https://tabler.io/icons) — MIT License

변환된 교육용 아이콘 및 카탈로그: MIT License
