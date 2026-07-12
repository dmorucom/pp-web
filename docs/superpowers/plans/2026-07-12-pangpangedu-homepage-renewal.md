# 팡팡에듀 홈페이지 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 팡팡에듀 랜딩 페이지를 시안 11(모던 스위스 흑백) 디자인의 정적 사이트로 새 `pp-web` 저장소에 이식하고 배포 준비를 마친다.

**Architecture:** 순수 정적 사이트. 단일 스크롤 페이지(`index.html`) + 외부 CSS(`css/style.css`) + 최소 vanilla JS(`js/main.js`). 빌드 도구·프레임워크 없음. 시각적 기준 원본은 `/Users/jinwookhan/Work/web/mockups/option11-swiss-mono.html`이며, 이 계획은 그 인라인 스타일/스크립트를 외부 파일로 분리하고 이미지 경로·SNS 링크를 실제 값으로 교체하는 이식 작업이다.

**Tech Stack:** HTML5, CSS3(자체 디자인 시스템, Google Fonts: Noto Sans KR), vanilla JavaScript. 배포: GitHub Pages.

## Global Constraints

- 브랜드명: `팡팡에듀`, 시리즈명: `어휘력 팡팡`.
- 포인트 컬러는 퍼플 `#7b2d8e` 단색만 사용(시안 11 디자인 시스템 유지).
- 프레임워크·빌드 도구·패키지 매니저 도입 금지(Bootstrap/jQuery 제거 상태 유지).
- 모든 사용자 노출 텍스트는 한국어.
- 이미지 경로는 저장소 루트 기준 `images/...`(상대경로, 선행 슬래시 없음).
- 도메인: `www.pangpangedu.com` (CNAME 파일에 기록). DNS 실제 전환은 이 계획의 범위 밖.
- 기존 `dmorucom/web` 저장소는 건드리지 않는다(롤백 안전망).
- 작업 디렉터리: `/Users/jinwookhan/Work/pp-web` (이미 `git init` 완료됨).

---

## File Structure

```
pp-web/
├─ index.html          # 메인 단일 페이지 (마크업)
├─ css/style.css       # 시안 11 디자인 시스템 (전역 스타일)
├─ js/main.js          # 모바일 네비 토글
├─ images/             # 사용 이미지 6종
├─ CNAME               # www.pangpangedu.com
├─ .gitignore
├─ README.md
└─ docs/superpowers/…  # 스펙·계획 문서 (이미 존재)
```

**원본 참조(읽기 전용, 복사/이식 대상):**
- `/Users/jinwookhan/Work/web/mockups/option11-swiss-mono.html` — 마크업·스타일·스크립트 원본
- `/Users/jinwookhan/Work/web/images/` — 이미지 원본

---

### Task 1: 저장소 스캐폴딩 및 이미지 자산

**Files:**
- Create: `/Users/jinwookhan/Work/pp-web/.gitignore`
- Create: `/Users/jinwookhan/Work/pp-web/CNAME`
- Create: `/Users/jinwookhan/Work/pp-web/README.md`
- Create: `/Users/jinwookhan/Work/pp-web/images/` (원본에서 6개 파일 복사)

**Interfaces:**
- Consumes: 없음(첫 태스크).
- Produces: `images/logo.jpg`, `images/book.jpg`, `images/book_bathroom.jpg`, `images/book_livingroom.jpg`, `images/book_kitchen.png`, `images/book_myroom.png` — 이후 `index.html`이 참조. `CNAME`, `.gitignore`, `README.md`.

- [ ] **Step 1: 이미지 6종을 원본에서 복사**

Run:
```bash
mkdir -p /Users/jinwookhan/Work/pp-web/images
cd /Users/jinwookhan/Work/web/images
cp logo.jpg book.jpg book_bathroom.jpg book_livingroom.jpg book_kitchen.png book_myroom.png /Users/jinwookhan/Work/pp-web/images/
```
(시안 11이 참조하는 6종만 복사한다. blog/service/sns-bg 등 미사용 자산은 복사하지 않는다.)

- [ ] **Step 2: 복사 검증**

Run: `ls -1 /Users/jinwookhan/Work/pp-web/images/`
Expected(정확히 6줄):
```
book.jpg
book_bathroom.jpg
book_kitchen.png
book_livingroom.jpg
book_myroom.png
logo.jpg
```

- [ ] **Step 3: `.gitignore` 작성**

Create `/Users/jinwookhan/Work/pp-web/.gitignore`:
```
.DS_Store
*.log
```

- [ ] **Step 4: `CNAME` 작성**

Create `/Users/jinwookhan/Work/pp-web/CNAME` (내용은 도메인 한 줄, 끝 개행 포함):
```
www.pangpangedu.com
```

- [ ] **Step 5: `README.md` 작성**

Create `/Users/jinwookhan/Work/pp-web/README.md`:
```markdown
# 팡팡에듀 홈페이지

초등 저학년 한자 어휘 학습지 "어휘력 팡팡" 시리즈 출판사 팡팡에듀 공식 홈페이지.

- 순수 정적 사이트 (HTML/CSS/JS, 빌드 도구 없음)
- 배포: GitHub Pages
- 도메인: https://www.pangpangedu.com

## 로컬 미리보기

`index.html`을 브라우저로 직접 열거나:

    python3 -m http.server 8000

접속: http://localhost:8000

## 구조

- `index.html` — 단일 페이지 마크업
- `css/style.css` — 디자인 시스템(모던 스위스 흑백)
- `js/main.js` — 모바일 네비 토글
- `images/` — 로고·도서 표지
```

- [ ] **Step 6: 커밋**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
git add .gitignore CNAME README.md images
git commit -m "chore: 저장소 스캐폴딩 및 이미지 자산 추가"
```

---

### Task 2: 디자인 시스템 CSS 이식

**Files:**
- Create: `/Users/jinwookhan/Work/pp-web/css/style.css`

**Interfaces:**
- Consumes: 없음(스타일은 독립적). Google Fonts는 `index.html` `<head>`에서 로드하므로 CSS는 `font-family:'Noto Sans KR',…`만 참조.
- Produces: `css/style.css` — 시안 11의 모든 클래스(`.wrap`, `.nav`, `.hero`, `.books-grid`, `.book`, `.badge`, `.about-grid`, `.contact-grid`, `.sns`, `footer`, 반응형 미디어쿼리 3종 등)를 정의. `index.html`(Task 3)이 이 클래스들을 사용.

- [ ] **Step 1: 원본의 `<style>` 내용을 `css/style.css`로 복사**

원본 `/Users/jinwookhan/Work/web/mockups/option11-swiss-mono.html`의 `<style>`와 `</style>` **사이**(파일 기준 11~281번째 줄, `:root{` 부터 마지막 미디어쿼리 닫는 `}`까지)의 CSS를 **그대로** `/Users/jinwookhan/Work/pp-web/css/style.css`로 옮긴다. `<style>`/`</style>` 태그 자체는 포함하지 않는다. CSS 규칙은 한 글자도 수정하지 않는다(이미지 경로는 CSS에 없으므로 변경 불필요).

- [ ] **Step 2: 파일 무결성 검증**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
head -n 1 css/style.css
grep -c "media(max-width" css/style.css
```
Expected: 첫 줄은 `  :root{` (또는 `:root{`), `media(max-width` 매치 수는 `3`.

- [ ] **Step 3: `<style>`/`</style>` 태그가 섞여 들어가지 않았는지 확인**

Run: `grep -c "</\?style" /Users/jinwookhan/Work/pp-web/css/style.css`
Expected: `0`

- [ ] **Step 4: 커밋**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
git add css/style.css
git commit -m "feat: 시안 11 디자인 시스템 CSS 이식"
```

---

### Task 3: index.html 마크업 이식 (경로·SNS 링크 교체, 외부 CSS/JS 연결)

**Files:**
- Create: `/Users/jinwookhan/Work/pp-web/index.html`

**Interfaces:**
- Consumes: `css/style.css`(Task 2)의 클래스, Task 1의 `images/*`, Task 4의 `js/main.js`. JS는 `id="navToggle"`(버튼)과 `id="navMenu"`(메뉴 컨테이너) 두 엘리먼트를 요구하므로 마크업에 반드시 포함한다.
- Produces: `index.html` — 완성된 페이지 마크업.

- [ ] **Step 1: 원본 body 마크업을 기반으로 `index.html` 작성**

원본 `/Users/jinwookhan/Work/web/mockups/option11-swiss-mono.html`의 `<body>`~`</body>` 마크업(NAV/HERO/BOOKS/ABOUT/CONTACT/FOOTER)을 그대로 사용하되, `<head>`와 링크는 아래 확정본으로 작성한다. 즉 `<head>`는 인라인 `<style>` 대신 외부 CSS를 링크하고, 하단 인라인 `<script>` 대신 외부 JS를 링크한다.

`<head>` 확정본:
```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>팡팡에듀 — 어휘력 팡팡</title>
<meta name="description" content="초등 저학년 한자 어휘 학습지 '어휘력 팡팡' 시리즈. 놀이처럼 재미있게 익히는 어휘력 학습지, 팡팡에듀.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
```

`</body>` 직전의 스크립트 태그 확정본(인라인 JS 제거, 외부 파일 링크):
```html
<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 이미지 경로를 `../images/` → `images/`로 교체**

원본 마크업에는 `src="../images/..."`가 6곳 있다(로고 2회, book.jpg 1회, 도서 표지 4회 중 book.jpg 포함해 총 6개 참조). 모두 `src="images/..."`로 바꾼다. 최종 `index.html`에 남는 이미지 참조는 다음과 같아야 한다:
```
images/logo.jpg        (nav, footer — 2회)
images/book.jpg        (hero)
images/book_bathroom.jpg
images/book_livingroom.jpg
images/book_kitchen.png
images/book_myroom.png
```

- [ ] **Step 3: SNS 링크를 실제 URL로 교체**

CONTACT 섹션의 소셜 링크 두 개를 실제 계정 URL로 바꾼다(원본은 `href="#"`):
```html
<div class="sns">
  <a href="https://www.instagram.com/pangpang_edu/" target="_blank" rel="noopener"><span>Instagram</span><span class="arrow">↗</span></a>
  <a href="https://www.threads.net/@pangpang_edu" target="_blank" rel="noopener"><span>Threads</span><span class="arrow">↗</span></a>
</div>
```

- [ ] **Step 4: 자산 참조 무결성 검증(깨진 경로 없음)**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
# index.html이 참조하는 모든 이미지가 실제로 존재하는지 확인
for f in $(grep -oE 'images/[A-Za-z0-9_./-]+' index.html | sort -u); do
  test -f "$f" && echo "OK  $f" || echo "MISSING  $f"
done
# 남아있는 ../ 상대경로나 인라인 style 블록이 없는지 확인
grep -c "\.\./" index.html
grep -c "<style" index.html
```
Expected: 모든 이미지 줄이 `OK ...`, `MISSING`은 하나도 없음. `../` 매치 수 `0`, `<style` 매치 수 `0`.

- [ ] **Step 5: 커밋**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
git add index.html
git commit -m "feat: index.html 마크업 이식 및 실제 SNS 링크 연결"
```

---

### Task 4: 모바일 네비게이션 JS

**Files:**
- Create: `/Users/jinwookhan/Work/pp-web/js/main.js`

**Interfaces:**
- Consumes: `index.html`의 `#navToggle`(햄버거 버튼), `#navMenu`(메뉴, `.open` 클래스로 토글).
- Produces: `js/main.js` — DOM 로드 후 토글/자동 닫힘 동작.

- [ ] **Step 1: `js/main.js` 작성**

Create `/Users/jinwookhan/Work/pp-web/js/main.js`:
```javascript
// 모바일 네비게이션 토글
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });

  // 메뉴 항목 클릭 시 닫기(모바일)
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });
})();
```

- [ ] **Step 2: 문법 검증**

Run: `node --check /Users/jinwookhan/Work/pp-web/js/main.js`
Expected: 출력 없음(종료 코드 0). node가 없으면 이 단계는 건너뛰고 Step 3의 브라우저 확인으로 대체한다.

- [ ] **Step 3: 커밋**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
git add js/main.js
git commit -m "feat: 모바일 네비게이션 토글 스크립트 추가"
```

---

### Task 5: 로컬 통합 검증 (데스크톱·모바일 렌더링)

**Files:**
- 수정 없음. 앞선 태스크 산출물을 실제 브라우저에서 확인하고, 발견된 결함만 해당 파일에서 고친다.

**Interfaces:**
- Consumes: `index.html`, `css/style.css`, `js/main.js`, `images/*` 전부.
- Produces: 없음(검증 게이트). 결함 발견 시 원인 파일 수정 후 재확인.

- [ ] **Step 1: 로컬 서버 실행**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
python3 -m http.server 8000
```
(백그라운드로 실행하거나 별도 터미널에서 실행. 확인 후 종료.)

- [ ] **Step 2: 데스크톱 폭에서 육안 확인**

`http://localhost:8000` 접속(창 폭 ≥ 1200px). 다음을 모두 확인:
- NAV: 로고 이미지 + "팡팡에듀" 표시, 우측에 "도서 보기" 액센트 버튼, 메뉴 3개(출판 도서/책 소개/연락처) 노출.
- HERO: 좌측 헤드라인 "놀이처럼 배우는 한자 어휘의 힘", 통계 3개(50~70% / 104개 / 89개), 우측에 `book.jpg` 도서 이미지가 그리드 배경 위에 표시.
- BOOKS: 도서 카드 4개가 4열 그리드로, 각 표지 이미지 로드, 배지(01·02 판매중=퍼플, 03·04 출간 예정=아웃라인).
- ABOUT: "어휘의 뿌리는 한자에 있습니다", 50~70% 대형 수치, 플로우 3단계, 칩 4개.
- CONTACT: 이메일/전화/주소 표시, 소셜 링크 2개.
- FOOTER: 로고 + 카피라이트.
- 이미지가 하나도 깨지지 않음(브라우저 콘솔에 404 없음).

- [ ] **Step 3: 모바일 폭에서 확인(반응형 + 네비 토글)**

브라우저 창을 375px 폭으로 줄이거나 개발자도구 모바일 뷰로 전환:
- 메뉴가 햄버거 버튼으로 접힘.
- 햄버거 클릭 → 메뉴 드롭다운 열림. 메뉴 항목 클릭 → 해당 섹션으로 스크롤되며 메뉴 닫힘.
- BOOKS 그리드가 1열로 재배치(520px 미만), 히어로가 세로 스택.
- 가로 스크롤이 생기지 않음.

- [ ] **Step 4: 결함 수정(있을 경우)**

발견된 문제는 원인 파일(`index.html`/`css/style.css`/`js/main.js`)에서 수정하고 Step 2~3을 재확인한다. 수정이 있었다면:
```bash
cd /Users/jinwookhan/Work/pp-web
git add -A
git commit -m "fix: 로컬 검증 중 발견된 렌더링 이슈 수정"
```
문제가 없으면 이 스텝은 건너뛴다.

- [ ] **Step 5: 서버 종료**

실행 중인 `python3 -m http.server` 프로세스를 종료한다.

---

### Task 6: 배포 준비 (GitHub 저장소 + Pages)

**Files:**
- 수정 없음(git 원격 설정 및 GitHub 설정 작업).

**Interfaces:**
- Consumes: 커밋 완료된 사이트 전체.
- Produces: GitHub 원격 저장소에 push된 사이트, GitHub Pages 활성화, 임시 `*.github.io` URL에서 동작 확인.

> **주의:** GitHub 저장소 생성/인증이 필요한 스텝은 사용자 계정 권한이 필요하다. `gh` CLI 인증이 되어 있지 않으면 사용자가 직접 실행해야 한다. 인증이 필요한 명령은 세션 프롬프트에 `! <명령>`으로 실행하도록 안내한다.

- [ ] **Step 1: 저장소 상태 확인(클린)**

Run:
```bash
cd /Users/jinwookhan/Work/pp-web
git status --porcelain
git log --oneline
```
Expected: `git status --porcelain` 출력 없음(클린), 커밋 로그에 Task 1~5 커밋이 존재.

- [ ] **Step 2: GitHub 신규 저장소 생성 및 push**

저장소 이름을 사용자와 확정한다(예: `pangpangedu-web`). 인증된 `gh` CLI 기준:
```bash
cd /Users/jinwookhan/Work/pp-web
gh repo create <저장소명> --public --source=. --remote=origin --push
```
`gh` 인증이 없으면 사용자에게 `! gh auth login` 또는 GitHub 웹에서 빈 저장소 생성 후 다음을 실행하도록 안내:
```bash
git remote add origin https://github.com/<계정>/<저장소명>.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: GitHub Pages 활성화**

GitHub 저장소 → Settings → Pages → Source를 `Deploy from a branch`, 브랜치 `main` / 폴더 `/ (root)`로 설정. `gh` CLI 사용 시:
```bash
gh api -X POST repos/<계정>/<저장소명>/pages -f "source[branch]=main" -f "source[path]=/" || true
```
(이미 활성화된 경우 오류는 무시.)

- [ ] **Step 4: 배포 확인**

몇 분 후 임시 URL(`https://<계정>.github.io/<저장소명>/`)에 접속해 사이트가 뜨고 이미지/스타일이 정상 로드되는지 확인한다.

> **참고:** `CNAME` 파일 때문에 GitHub Pages는 `www.pangpangedu.com`을 커스텀 도메인으로 인식한다. 실제 DNS 전환(도메인 A레코드/CNAME을 새 저장소로 변경)은 이 계획의 범위 밖이며, 임시 URL 확인 후 사용자와 별도로 진행한다. 기존 `dmorucom/web` 저장소는 삭제하지 않는다.

- [ ] **Step 5: 완료 보고**

임시 URL, 저장소 URL, 남은 후속 작업(도메인 DNS 전환)을 사용자에게 정리해 보고한다.

---

## Self-Review

**1. Spec coverage:**
- 기술 구성(정적, Bootstrap 제거) → Task 2·3·4에서 자체 CSS/JS로 구현, 프레임워크 미도입. ✓
- 파일 구조 → Task 1~4가 정확히 스펙의 트리 생성. ✓
- 디자인 시스템(시안 11) → Task 2가 원본 CSS 이식. ✓
- 섹션 6종(NAV/HERO/BOOKS/ABOUT/CONTACT/FOOTER) → Task 3 마크업 + Task 5 육안 검증. ✓
- 자산 6종 복사 → Task 1. ✓ (스펙 §6은 main-bg.jpg도 나열했으나 시안 11이 참조하지 않아 YAGNI로 제외 — Task 1 Step 1에 명시.)
- 배포(새 저장소, Pages, CNAME, DNS 별도, 기존 저장소 보존) → Task 6. ✓
- 범위 밖(블로그/결제/다국어/폼/관리자) → 어떤 태스크에도 없음. ✓

**2. Placeholder scan:** "TBD/TODO/적절히 처리" 등 없음. 코드가 필요한 스텝은 실제 코드 포함. 대용량 CSS는 단일 진실 원본(mockup)에서의 정확한 복사 지시로 대체(DRY) 후 무결성 grep으로 검증. ✓

**3. Type consistency:** JS가 요구하는 `#navToggle`/`#navMenu`가 Task 3 Interfaces에 명시되고 원본 마크업에 존재. `.open` 클래스 토글이 CSS(`.nav-menu.open{display:flex}`)와 일치. 이미지 경로 규칙(`images/…`)이 Task 1 산출물과 Task 3 참조에서 일치. ✓
