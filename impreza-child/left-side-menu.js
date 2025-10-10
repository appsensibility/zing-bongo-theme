(function () {
  var openBtn = document.getElementById('lsm-open');
  var closeBtn = document.getElementById('lsm-close');
  var panel = document.getElementById('lsm-panel');
  var backdrop = document.getElementById('lsm-backdrop');
  if (!openBtn || !closeBtn || !panel || !backdrop) return;

  function openMenu() {
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    backdrop.hidden = false;
    document.body.classList.add('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    setTimeout(function(){ backdrop.hidden = true; }, 240);
    document.body.classList.remove('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });

  panel.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var li = link.parentElement;
    if (!li.classList.contains('menu-item-has-children')) return;
    e.preventDefault();
    li.classList.toggle('submenu-open');
  });
})();
