// 모바일 네비게이션 토글
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
  });

  // 메뉴 항목 클릭 시 닫기(모바일)
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
