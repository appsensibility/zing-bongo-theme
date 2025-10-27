<?php
$menu_html = wp_nav_menu([
  'menu'            => 'Top Nav Dropdown Menu',
  'theme_location'  => 'top_nav_dropdown_menu',
  'container'       => 'nav',
  'container_class' => 'lsm-nav',
  'menu_class'      => 'lsm-menu',
  'echo'            => false,
  'fallback_cb'     => false,
]);
?>
<!--button id="lsm-open" aria-haspopup="true" aria-controls="lsm-panel" aria-expanded="false">Menu</button-->

<aside id="lsm-panel" class="lsm-panel" aria-hidden="true">
    <button id="lsm-close" aria-label="Close menu">✕</button>
    <div class="lsm-nav-logo-container">
        <img class="lsm-nav-logo" height="80" src="https://development-website.online/wp-content/uploads/Bongo-Tech-Logo.webp" class="attachment-full size-full" alt="" loading="lazy" decoding="async" srcset="https://development-website.online/wp-content/uploads/Bongo-Tech-Logo.webp 599w, https://development-website.online/wp-content/uploads/Bongo-Tech-Logo-300x88.webp 300w" sizes="auto, (max-width: 599px) 100vw, 599px">
    </div>
    <?php echo $menu_html; ?>
</aside>
<div id="lsm-backdrop" class="lsm-backdrop" hidden></div>
