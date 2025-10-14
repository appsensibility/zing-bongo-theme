(function () {
  var openBtn = document.getElementById('lsm-open');
  var closeBtn = document.getElementById('lsm-close');
  var panel = document.getElementById('lsm-panel');
  var backdrop = document.getElementById('lsm-backdrop');
  var mainLogo = document.getElementById('zng-main-logo');
  if (!openBtn || !panel || !backdrop) return;

  function openMenu() {
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    backdrop.hidden = false;
    document.body.classList.add('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if(mainLogo) mainLogo.classList.add('is-open');
  }
  function closeMenu() {
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    panel.querySelectorAll('.submenu-open').forEach(function (el) { el.classList.remove('submenu-open'); });
    setTimeout(function(){ backdrop.hidden = true; }, 240);
    document.body.classList.remove('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    if(mainLogo) mainLogo.classList.remove('is-open');
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (document) document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeMenu(); });

  /*
  panel.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var li = link.parentElement;
    if (!li.classList.contains('menu-item-has-children')) return;
    e.preventDefault();
    li.classList.toggle('submenu-open');
  });*/
    panel.addEventListener('click', function (e) {
        console.log("Nav Menu Click", e);
        var link = e.target.closest('a');
        if (!link) return;

        console.log("Nav Menu Click", e);

        var li = link.parentElement;

        if (!li.classList.contains('menu-item-has-children')) return;

        e.preventDefault();

        // close siblings at this level
        var siblings = Array.prototype.filter.call(li.parentElement.children, function (n) { return n !== li; });
        siblings.forEach(function (s) { s.classList.remove('submenu-open'); });

        // toggle current
        li.classList.toggle('submenu-open');
    });
})();
