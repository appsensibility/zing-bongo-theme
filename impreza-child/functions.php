<?php
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('lsm-css', get_stylesheet_directory_uri() . '/left-side-menu.css', [], '1.0');
  wp_enqueue_script('lsm-js', get_stylesheet_directory_uri() . '/left-side-menu.js', [], '1.0', true);
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
