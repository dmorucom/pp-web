# 방문 분석 (Web Analytics)

팡팡에듀 사이트의 방문 분석은 **Cloudflare Web Analytics**로 한다. (도입일: 2026-07-12)

## 왜 Cloudflare Web Analytics인가

- **무료**, 쿠키·개인정보 미수집 → 한국 PIPA 동의 배너 불필요.
- 스니펫 **한 줄**만 추가하면 되고, DNS를 Cloudflare로 옮기지 않아도 된다(JS snippet 방식). 이 사이트는 DNS가 GitHub Pages를 직접 가리키는 구조를 그대로 유지한다.
- 미니멀·프레임워크 배제 기조와 부합. GA4는 스크립트가 무겁고 쿠키 동의가 필요해 제외했다.

## 방문 기록 확인 방법

1. [dash.cloudflare.com](https://dash.cloudflare.com) 로그인.
2. 왼쪽 사이드바 **Analytics & Logs → Web Analytics**.
3. `www.pangpangedu.com` 선택.
4. 페이지뷰·방문자수·인기 페이지·리퍼러·국가·기기 지표 확인.

> ⏱️ 데이터는 **도입일부터 앞으로만** 집계된다(과거 소급 불가). 새 방문이 대시보드에 반영되기까지 몇 분 걸릴 수 있다.

## 구현

`index.html` 하단(`js/main.js` 로드 직후)에 beacon 스니펫이 있다:

```html
<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "179ba69decfd4c7981bb133a5a529def"}'></script><!-- End Cloudflare Web Analytics -->
```

- `token`은 Cloudflare 대시보드에서 사이트 추가 시 발급된 값. 사이트 hostname `www.pangpangedu.com`에 묶여 있다.
- 로드 시 `static.cloudflareinsights.com/beacon.min.js`(200)를 받고, 방문마다 `POST cloudflareinsights.com/cdn-cgi/rum`(204)으로 데이터를 보낸다. 이 두 요청이 검증 기준이다.

## 제약 (CLAUDE.md와 연동)

- 허용된 외부 의존은 **Google Fonts**와 이 **Cloudflare beacon** 둘뿐이다. 다른 CDN·추적 도구(GA4 등)는 추가하지 않는다.
- 커스텀 이벤트·전환 목표·별도 대시보드 페이지는 범위 밖. 기본 페이지뷰/방문자 지표만 사용한다.
