# 작업 로그 (Worklog)

다른 세션·다른 사람이 "그동안 뭐가 바뀌었는지"를 빠르게 따라잡기 위한 요약이다.
세부 기준 문서가 따로 있는 항목은 링크로 연결한다. 마크업/스타일이 바뀌면 이 로그도 함께 갱신한다.

커밋 범위: `343a7b9` … `602fcf1` (아래 각 항목에 해시 표기).

---

## 2026-07-12 — 방문 분석 도입

- **한 일:** Cloudflare Web Analytics beacon을 `index.html` 하단에 추가(토큰 `179ba69d…`). 쿠키·개인정보 미수집 → 동의 배너 불필요. DNS는 Cloudflare로 옮기지 않고 GitHub Pages 직접 서빙 유지(JS snippet 방식).
- **왜:** 방문 기록을 볼 수단이 전혀 없었음(GitHub Pages는 방문자 분석 미제공, 과거 소급 불가).
- **파일:** `index.html`, `CLAUDE.md`(애널리틱스 예외 + 허용 외부 의존에 beacon 추가).
- **확인 방법:** [dash.cloudflare.com](https://dash.cloudflare.com) → Web Analytics → `www.pangpangedu.com`. 데이터는 도입일부터만 집계.
- **검증:** 라이브에서 `beacon.min.js` 200, `POST /cdn-cgi/rum` 204 확인.
- **상세 문서:** `docs/analytics.md`
- **커밋:** `343a7b9`(도입), `e737795`(문서화)

## 2026-07-12 — 파비콘 추가

- **한 일:** 브랜드 로고(`images/logo.png`, 640×640)에서 파비콘 3종 생성 — 루트 `favicon.ico`(16/32/48), `images/favicon-32.png`, `images/apple-touch-icon.png`(180). `<head>`에 `icon`/`apple-touch-icon` 링크 추가.
- **왜:** 파비콘 미설정으로 브라우저의 자동 `/favicon.ico` 요청이 404. 기능 영향은 없지만 탭에 브랜드 아이콘이 없고 콘솔 에러 발생.
- **파일:** `index.html`, `favicon.ico`, `images/favicon-32.png`, `images/apple-touch-icon.png`
- **검증:** 라이브에서 세 파일 200, 콘솔 favicon 404 사라짐 확인.
- **커밋:** `ccb0d8e`

## 2026-07-25 — 모바일 히어로 부록 수치 겹침 수정

- **증상:** 좁은 화면에서 히어로 부록 수치 3개("50~70%" / "약 100개" / "약 80개")가 한 줄에 눌려 숫자·라벨이 겹침.
- **원인:** `.hero-stats .st { flex:1 }`(flex-basis:0)가 ≤520px에서 유지돼 3칸이 강제로 한 줄에 끼임. (다른 섹션은 ≤520px에서 1열 전환되는데 이 수치만 누락.)
- **수정:** ≤520px에서 히어로 수치를 세로 1열 스택으로 전환(칸 사이 구분선).
- **파일:** `css/style.css`
- **검증:** 라이브 계산 스타일 `flex-direction:column`, 각 칸 전체 너비, 겹침 없음 확인.
- **커밋:** `cf7d712`

## 2026-07-25 — 페이지 영역 이름 지도 작성

- **한 일:** 페이지 6개 영역(NAV/HERO/BOOKS/ABOUT/CONTACT/FOOTER)과 하위 요소의 명칭·기술 이름을 표로 정리. 대화 시 "어디"를 서로 빠르게 가리키기 위한 이름표. 시각 버전은 Artifact로도 발행.
- **파일:** `docs/page-structure.md`, `CLAUDE.md`(문서 목록에 링크)
- **상세 문서:** `docs/page-structure.md`
- **커밋:** `8d5c347`

## 2026-07-25 — 모바일 히어로 태그·이미지 겹침 수정

- **증상:** 모바일에서 히어로 오른쪽의 주황 태그("어휘력 팡팡 · 우리집 시리즈")가 책 이미지 위를 덮어 겹침. 이미지가 눌려 보임.
- **원인:** `.hero-tagpill`·`.hero-caption`이 `position:absolute`로 이미지 위에 떠 있음 → 모바일에서 컨테이너가 좁아 이미지 위로 올라옴. (이미지 비율은 실제로 정상, 눌림은 겹침에 의한 착시 — 측정: 렌더 1.637 = 원본 1.637.)
- **수정:** ≤1000px에서 `.hero-right`를 세로 스택(`flex-direction:column`)으로 전환, 태그·캡션을 `position:static`으로 흐름 배치 → 태그 → 이미지 → 캡션 순.
- **파일:** `css/style.css`
- **검증:** 라이브에서 태그·캡션 모두 이미지와 겹침 없음, 원본 비율 유지 확인.
- **커밋:** `602fcf1`

---

## 현재 상태 요약

- 사이트 정상 서빙: `www.pangpangedu.com`(GitHub Pages, `dmorucom/pp-web`, `master`).
- 외부 의존: Google Fonts + Cloudflare Web Analytics beacon **둘뿐**(그 외 CDN·추적 도구 없음).
- 파비콘: 브랜드 로고 기반으로 적용됨.
- 모바일 반응형: 히어로 수치·히어로 이미지 영역 겹침 이슈 모두 해소. 분기점 **1000 / 860 / 520px**.

## 검증·배포 참고 (다음 세션용)

- 배포: `master`에 push → GitHub Pages 자동 빌드. push 전 `gh auth switch --user dmorucom` 필요(자세히는 배포 메모리/CLAUDE.md).
- 빌드 상태: `gh api repos/dmorucom/pp-web/pages/builds/latest --jq '.status'` → `built`.
- CSS 변경 검증 시 주의: 브라우저가 `css/style.css`를 캐시하므로 라이브 스크린샷이 구버전으로 보일 수 있음. `curl`로 라이브 CSS 내용을 직접 확인하거나, Playwright에서 `fetch(css?bust=…)` 후 `<style>` 주입해 강제 갱신하는 방식이 확실함.

## 관련 문서

- 방문 분석: `docs/analytics.md`
- 페이지 영역 이름: `docs/page-structure.md`
- 브랜드 컬러: `docs/brand.md`
