# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

팡팡에듀(PangPang Edu) 출판사 공식 홈페이지. 초등 저학년 한자 어휘 학습지 "어휘력 팡팡" 시리즈를 소개하는 **순수 정적 사이트**(단일 스크롤 랜딩 페이지). 빌드 도구·프레임워크·패키지 매니저 없음 — HTML/CSS/바닐라 JS만 사용. GitHub Pages로 배포.

이 저장소는 기존 사이트(`dmorucom/web`, Bootstrap 기반)를 "모던 스위스 흑백" 디자인으로 리뉴얼한 결과물이다.

## Commands

빌드 단계가 없다. `index.html`을 브라우저로 직접 열거나 로컬 서버로 확인한다:

```bash
python3 -m http.server 8000   # → http://localhost:8000
node --check js/main.js        # JS 문법 검사 (테스트 스위트는 없음)
```

**검증 = 브라우저 렌더링 확인**(데스크톱/모바일 반응형, 네비 토글, 이미지·CSS 로드 200). 자동화 테스트 프레임워크는 의도적으로 없다. 시각적 회귀는 Playwright로 스크린샷·콘솔 404 확인이 유효하다.

배포는 `master`에 push하면 GitHub Pages가 자동 빌드한다:

```bash
git push origin master
gh api repos/dmorucom/pp-web/pages --jq '{status,html_url,cname}'   # 빌드 상태 확인
```

## Architecture

세 파일이 하나의 페이지를 이룬다. 셋의 계약(class/id)이 서로 맞아야 한다:

- **`index.html`** — 6개 섹션의 마크업: NAV / HERO / BOOKS(도서 4권) / ABOUT / CONTACT / FOOTER. `<head>`에서 외부 `css/style.css`와 Google Fonts(Noto Sans KR)를, 하단에서 `js/main.js`를 로드한다. 인라인 `<style>` 블록은 두지 않는다(요소별 `style=""` 속성은 목업에서 온 것으로 허용).
- **`css/style.css`** — 디자인 시스템 전체. `:root`의 CSS 변수가 단일 진실 원본: `--ink`(텍스트), `--accent:#e5762c`(유일한 포인트 컬러 = 브랜드 주황), `--accent-ink`(주황 10% 틴트), `--line`, `--paper` 등. 반응형 브레이크포인트 3개(1000/860/520px). 색·간격을 바꿀 땐 개별 규칙이 아니라 이 토큰을 먼저 본다.
- **`js/main.js`** — 유일한 동작: 모바일 햄버거 네비. `#navToggle` 클릭 시 `#navMenu`에 `.open` 토글(+ `aria-expanded` 동기화), 메뉴 링크 클릭 시 닫힘. 이 세 심볼(`#navToggle`, `#navMenu`, `.open`)이 HTML·CSS·JS 사이의 계약이다.

디자인의 시각적 기준 원본은 `/Users/jinwookhan/Work/web/mockups/option11-swiss-mono.html`이며, CSS는 이 목업의 스타일 블록을 그대로 이식한 것이다. 다른 후보 시안 13종도 같은 `mockups/` 폴더에 있다.

## 지켜야 할 제약 (design constraints)

- **단일 브랜드 주황 `#e5762c`만** 포인트 컬러로 쓴다(이전 보라 `#7b2d8e`에서 변경). 다른 강조색을 추가하지 않는다. 상세 기준·출처·접근성 주의는 `docs/brand.md` 참조.
- Bootstrap/jQuery 등 프레임워크·CDN 의존을 **다시 들이지 않는다**(의도적으로 제거함). Google Fonts만 외부 의존.
- 이미지 경로는 루트 기준 `images/...`(선행 슬래시·`../` 금지).
- 모든 노출 텍스트는 한국어. 브랜드명 `팡팡에듀`, 시리즈명 `어휘력 팡팡`.
- 범위 밖(추가하지 말 것): 블로그/CMS, 결제·장바구니, 다국어, 문의 폼 백엔드, 관리자, 애널리틱스.

## 배포 & 계정 (중요)

- 저장소 `dmorucom/pp-web`, 브랜치 `master`, GitHub Pages(root). 임시 URL `https://dmorucom.github.io/pp-web/`.
- **커스텀 도메인 전환은 미완.** `CNAME`에 `www.pangpangedu.com`이 있으나, 이 도메인은 아직 기존 `dmorucom/web`이 사용 중이라 이 저장소엔 미할당(Pages `cname` = null). 전환하려면: `dmorucom/web`의 Pages 커스텀 도메인 해제 → 이 저장소 Settings→Pages에서 재지정. 같은 계정이라 레지스트라 DNS는 그대로 둬도 됨. **기존 `dmorucom/web`은 롤백 안전망으로 삭제하지 않는다.**
- **`gh` 계정 권한:** `dmorucom`은 조직이 아니라 사용자 계정이며, 이 계정만 저장소에 push 가능. 다른 로그인 계정(gmoru·hanent110)은 쓰기 불가. 작업 전 `gh auth switch --user dmorucom` 필요.

## 설계 문서

- 브랜드 컬러 기준: `docs/brand.md`
- 스펙: `docs/superpowers/specs/2026-07-12-pangpangedu-homepage-renewal-design.md`
- 구현 계획: `docs/superpowers/plans/2026-07-12-pangpangedu-homepage-renewal.md`
