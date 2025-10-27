<?php
/* Author: Nathaniel Mantell
 * Date created: 2025-10-09
 */

add_action('wp_enqueue_scripts', function () {
  $dir  = get_stylesheet_directory();
  $uri  = get_stylesheet_directory_uri();

  $css_rel = '/left-side-menu.css';
  $js_rel  = '/left-side-menu.js';

  $css_ver = file_exists($dir.$css_rel) ? filemtime($dir.$css_rel) : null;
  $js_ver  = file_exists($dir.$js_rel) ? filemtime($dir.$js_rel) : null;

  wp_enqueue_style('lsm-css', $uri.$css_rel, [], $css_ver);
  wp_enqueue_script('lsm-js', $uri.$js_rel, [], $js_ver, true);
});

add_action('after_setup_theme', function () {
  register_nav_menus([
    'top_nav_dropdown_menu' => __('Top Nav Dropdown Menu', 'impreza-child')
  ]);
});

if (!function_exists('wp_body_open')) {
  function wp_body_open(){ do_action('wp_body_open'); }
}

add_action('wp_body_open', function () {
  get_template_part('left-side-menu');
});

//Shortcode to output menu button
add_shortcode('lsm_button', function ($atts) {
  $a = shortcode_atts(['label' => 'Menu'], $atts, 'lsm_button');
  ob_start(); ?>
  <button id="lsm-open" class="lsm-btn" aria-haspopup="true" aria-controls="lsm-panel" aria-expanded="false">
    <span class="lsm-bars" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
    <span class="screen-reader-text"><?php echo esc_html($a['label']); ?></span>
  </button>
  <?php
  return ob_get_clean();
});