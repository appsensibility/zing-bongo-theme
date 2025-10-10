<script>
	window.fwSettings={
	'widget_id':156000000375
	};
	!function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}() 
</script>
<script type='text/javascript' src='https://widget.freshworks.com/widgets/156000000375.js' async defer></script>

<?php /*

  This file is part of a child theme called JB Custom-Child.
  Functions in this file will be loaded before the parent theme's functions.
  For more information, please read
  https://developer.wordpress.org/themes/advanced-topics/child-themes/

*/

// this code loads the parent's stylesheet (leave it in place unless you know what you're doing)

function your_theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, 
      get_template_directory_uri() . '/style.css'); 

    wp_enqueue_style( 'child-style', 
      get_stylesheet_directory_uri() . '/style.css', 
      array($parent_style), 
      wp_get_theme()->get('Version') 
    );
}

add_action('wp_enqueue_scripts', 'your_theme_enqueue_styles');

/*  Add your own functions below this line.
    ======================================== */ 
function hide_plugins_from_dashboard( $plugins ) {
    // List the base path of the plugins you want to hide
    $plugins_to_hide = [
        'gravityflow/gravityflow.php',
        'gravity-pdf-core-booster/gravity-pdf-core-booster.php',
        'gravityformssignature/signature.php',
        'us-core/us-core.php',
        'js_composer/js_composer.php',
    ];

    foreach ( $plugins_to_hide as $plugin ) {
        if ( isset( $plugins[$plugin] ) ) {
            unset( $plugins[$plugin] );
        }
    }

    return $plugins;
}

add_filter( 'all_plugins', 'hide_plugins_from_dashboard' );

function remove_plugin_submenu() {
    remove_submenu_page( 'gravityflow-inbox', 'gravityflow_settings' );
    remove_submenu_page( 'gravityflow-inbox', 'gravityflow-support' );
    remove_submenu_page( 'gf_edit_forms', 'gf_addons' );
    remove_submenu_page( 'gf_edit_forms', 'gf_system_status' );
    remove_submenu_page( 'gf_edit_forms', 'gf_help' );
    remove_submenu_page( 'us-theme-options', 'us-addons' );
    remove_submenu_page( 'us-theme-options', 'us-setup-wizard' );
    remove_submenu_page( 'us-theme-options', 'us-home' );
    remove_submenu_page( 'us-theme-options', '#advanced' );
	remove_submenu_page( 'tools.php', 'site-health.php' );
	remove_submenu_page( 'wp-mail-smtp', 'wp-mail-smtp-about' );
}
add_action( 'admin_menu', 'remove_plugin_submenu', 999 );

function remove_plugin_admin_menu() {
    remove_menu_page( 'vc-general' );
}
add_action( 'admin_menu', 'remove_plugin_admin_menu', 999 );


function hide_screen_options() {
    echo '<style type="text/css">
            #screen-options-link-wrap {
                display: none !important;
            }
        </style>';
}
add_action( 'admin_head', 'hide_screen_options' );

function hide_help_tab() {
    echo '<style type="text/css">
            #contextual-help-link-wrap {
                display: none !important;
            }
        </style>';
}
add_action( 'admin_head', 'hide_help_tab' );

function hide_specific_theme_css() {
    global $pagenow;
    if ( 'themes.php' === $pagenow ) {
        echo '<style type="text/css">
                .theme[data-slug="Impreza"] { display: none !important; }
            </style>';
    }
}
add_action( 'admin_head', 'hide_specific_theme_css' );
