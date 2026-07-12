# 팡팡에듀 브랜드 컬러

이 문서는 팡팡에듀 홈페이지의 브랜드(포인트) 컬러 기준을 정의한다. 색을 바꾸거나 새 요소를 디자인할 때 이 문서를 먼저 참고한다.

## 브랜드 컬러 — 주황

| 역할 | HEX | RGB | 용도 |
|---|---|---|---|
| **Accent (주황)** | `#FF6600` | `rgb(255, 102, 0)` | 포인트 컬러. 링크·강조 텍스트·배지·CTA 버튼 배경·언더라인 등 |
| Accent tint (10%) | `#FF660019` | `rgba(255,102,0,0.1)` | 칩(chip) 배경 등 옅은 강조 배경 |

이 값은 **공식 로고(`images/logo.png`)의 배경 주황과 동일**하다(로고 네 모서리 픽셀 = `#FF6600`).

- 사이트는 **화이트 배경 + 니어블랙 텍스트 + 단일 주황 포인트**의 "모던 스위스" 체계다. 포인트 컬러는 **주황 하나만** 쓴다(두 번째 강조색을 추가하지 않는다).
- 코드상 이 색은 `css/style.css`의 `:root` 변수 **`--accent`** 와 **`--accent-ink`** 로만 정의된다. 색을 바꾸려면 이 두 값만 수정하면 전체에 반영된다(HTML에 하드코딩된 색 없음).

## 색 출처 / 확인 경위

- **현재 기준: 공식 로고(`images/logo.png`)의 배경 주황 `#FF6600`.** 로고 네 모서리 픽셀이 모두 `rgb(255,102,0)`로 균일 → 이 값을 브랜드 컬러로 확정.
- 경위: 처음엔 스마트스토어(`https://smartstore.naver.com/pangpangedu/...`) 상단 색을 기준으로 하려 했으나 Naver 봇 방지(캡차)로 자동 접근이 막혔고, 임시로 도서 표지의 제목색(`#E5762C`)을 썼다. 이후 공식 로고 PNG가 추가되어 그 배경색 `#FF6600`으로 통일함.
- 색을 바꾸려면 `css/style.css`의 `--accent`/`--accent-ink` 두 값과 위 표를 갱신한다.

## 로고

- 사용 파일: **`images/logo.svg`** — nav(34px)·footer(28px)에서 사용.
- 원본: **`images/logo.png`** (640×640, 공식 브랜드 로고, 여백 넓음). 형태 = 주황 배경 + 전구 모양 테두리 안에 갈색 "팡팡/에듀", 하단 흰색 "PANGPANGEDU".
- `logo.svg`는 원본 PNG에서 **콘텐츠(전구+글자) 경계를 찾아 여백을 최소로 정사각 크롭**한 이미지를 base64로 임베드한 것이다. 디자인(곡선·한글 글자) 훼손을 막기 위해 벡터 트레이싱은 쓰지 않고 크롭+임베드 방식을 택함. 작은 nav/footer 크기에서도 로고가 배지를 가득 채워 보이게 하는 것이 목적.
- **로고 교체/재크롭 방법:** `images/logo.png`를 새 파일로 바꾼 뒤 아래 스크립트로 svg 재생성(콘텐츠 경계 자동 감지 → 정사각 타이트 크롭 → 임베드):
  ```bash
  python3 - <<'PY'
  from PIL import Image
  import base64, io
  im = Image.open("images/logo.png").convert("RGB"); W,H = im.size; px = im.load()
  bg = px[5,5]                       # 모서리 = 배경색
  far = lambda c: abs(c[0]-bg[0])+abs(c[1]-bg[1])+abs(c[2]-bg[2]) > 60
  xs = [x for y in range(H) for x in range(W) if far(px[x,y])]
  ys = [y for y in range(H) for x in range(W) if far(px[x,y])]
  minx,maxx,miny,maxy = min(xs),max(xs),min(ys),max(ys)
  cx,cy = (minx+maxx)//2,(miny+maxy)//2
  side = round(max(maxx-minx+1, maxy-miny+1) * 1.08)   # 여백 약 8%(콘텐츠 ~92%)
  h = side//2; l,t,r,b = cx-h,cy-h,cx-h+side,cy-h+side
  if l<0: r-=l; l=0
  if t<0: b-=t; t=0
  if r>W: l-=r-W; r=W
  if b>H: t-=b-H; b=H
  buf = io.BytesIO(); im.crop((l,t,r,b)).save(buf,"PNG")
  b64 = base64.b64encode(buf.getvalue()).decode(); s = r-l
  open("images/logo.svg","w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s} {s}" width="{s}" height="{s}" role="img" aria-label="팡팡에듀 로고">\n  <image width="{s}" height="{s}" href="data:image/png;base64,{b64}"/>\n</svg>\n')
  PY
  ```
  (여백을 더/덜 주려면 `1.08` 배율 조정. 배경이 단색이 아니면 경계 감지 로직을 손봐야 함.)
- 구 로고 `images/logo.jpg`(보라 35×35)와 임시 반짝임 SVG는 폐기됨.

## 접근성 참고

주황(`#FF6600`)은 흰 배경 대비 명도차가 보라(`#7b2d8e`, 이전 값)보다 낮다(대략 2.5:1로, `#E5762C`보다도 더 밝아 대비가 약간 더 낮음). 큰 글씨·굵은 제목·아이콘·배지에는 문제없으나, **작은 본문 텍스트를 주황으로 쓰는 것은 지양**한다(가독성). 흰색 글자를 주황 배경 위에 얹는 배지/버튼은 브랜드 관례상 허용하되, 아주 작은 글자는 피한다. 더 강한 대비가 필요하면 텍스트/링크용으로 살짝 더 진한 주황(예: `#D65200`)을 별도 토큰으로 도입하는 방안을 검토한다.

## 이력

- 2026-07-12: 브랜드 포인트 컬러를 보라 `#7B2D8E` → 주황 `#E5762C`로 변경.
- 2026-07-12: 로고를 공식 브랜드 로고(`logo.png`, 주황 전구형)로 교체하고 이를 임베드한 `logo.svg`로 서빙. (직전의 임시 반짝임 SVG는 폐기.)
- 2026-07-12: 브랜드 주황을 로고 배경색과 동일한 `#FF6600`으로 확정(임시값 `#E5762C`에서 변경).
