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
  <?php echo $menu_html; ?>
</aside>
<div id="lsm-backdrop" class="lsm-backdrop" hidden></div>
