(function () {
  var openBtn = document.getElementById('lsm-open');
  var closeBtn = document.getElementById('lsm-close');
  var panel = document.getElementById('lsm-panel');
  var backdrop = document.getElementById('lsm-backdrop');
  var mainLogo = document.getElementById('zng-main-logo');
  if (!openBtn || !panel || !backdrop) return;

  var mqMobile = window.matchMedia('(max-width: 1024px)');

  function openMenu() {
    panel.classList.add('is-open');
    backdrop.classList.add('is-open');
    backdrop.hidden = false;
    document.body.classList.add('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    if (mainLogo) mainLogo.classList.add('is-open');
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    panel.querySelectorAll('.submenu-open').forEach(function (el) {
      el.classList.remove('submenu-open');
    });
    setTimeout(function () {
      backdrop.hidden = true;
    }, 240);
    document.body.classList.remove('lsm-locked');
    openBtn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    if (mainLogo) mainLogo.classList.remove('is-open');
  }

  function closeSiblings(li) {
    if (!li || !li.parentElement) return;
    Array.prototype.forEach.call(li.parentElement.children, function (sib) {
      if (sib !== li) sib.classList.remove('submenu-open');
    });
  }

  function bindMobileClickToggle() {
    panel.addEventListener('click', onPanelClick, true);
  }

  function unbindMobileClickToggle() {
    panel.removeEventListener('click', onPanelClick, true);
  }

  function onPanelClick(e) {
    if (!mqMobile.matches) return;
    if (!panel.classList.contains('is-open')) return;

    var link = e.target.closest('a');
    if (!link) return;

    var li = link.parentElement;
    if (!li || !li.classList.contains('menu-item-has-children')) return;

    e.preventDefault();
    closeSiblings(li);
    li.classList.toggle('submenu-open');
  }

  function bindDesktopHover() {
    panel.addEventListener('mouseover', onMouseOver, true);
    panel.addEventListener('mouseout', onMouseOut, true);
    panel.addEventListener('focusin', onFocusIn, true);
    panel.addEventListener('focusout', onFocusOut, true);
  }

  function unbindDesktopHover() {
    panel.removeEventListener('mouseover', onMouseOver, true);
    panel.removeEventListener('mouseout', onMouseOut, true);
    panel.removeEventListener('focusin', onFocusIn, true);
    panel.removeEventListener('focusout', onFocusOut, true);
  }

  function findTopLevelMenuItem(el) {
    var li = el && el.closest ? el.closest('li') : null;
    if (!li) return null;
    if (!li.parentElement) return null;
    if (!li.parentElement.classList.contains('lsm-menu')) return null; // top level only
    return li;
  }

  function onMouseOver(e) {
    if (mqMobile.matches) return;
    if (!panel.classList.contains('is-open')) return;

    var li = findTopLevelMenuItem(e.target);
    if (!li || !li.classList.contains('menu-item-has-children')) return;

    closeSiblings(li);
    li.classList.add('submenu-open');
  }

  function onMouseOut(e) {
    if (mqMobile.matches) return;
    if (!panel.classList.contains('is-open')) return;

    var fromLi = findTopLevelMenuItem(e.target);
    if (!fromLi) return;

    var toEl = e.relatedTarget;
    if (toEl && fromLi.contains(toEl)) return;

    fromLi.classList.remove('submenu-open');
  }

  function onFocusIn(e) {
    if (mqMobile.matches) return;
    if (!panel.classList.contains('is-open')) return;

    var li = findTopLevelMenuItem(e.target);
    if (!li || !li.classList.contains('menu-item-has-children')) return;

    closeSiblings(li);
    li.classList.add('submenu-open');
  }

  function onFocusOut(e) {
    if (mqMobile.matches) return;
    if (!panel.classList.contains('is-open')) return;

    var li = findTopLevelMenuItem(e.target);
    if (!li) return;

    var toEl = e.relatedTarget;
    if (toEl && li.contains(toEl)) return;

    li.classList.remove('submenu-open');
  }

  function applyMode() {
    panel.querySelectorAll('.submenu-open').forEach(function (el) {
      el.classList.remove('submenu-open');
    });

    if (mqMobile.matches) {
      unbindDesktopHover();
      bindMobileClickToggle();
    } else {
      unbindMobileClickToggle();
      bindDesktopHover();
    }
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  if (mqMobile.addEventListener) mqMobile.addEventListener('change', applyMode);
  else mqMobile.addListener(applyMode);

  applyMode();
})();