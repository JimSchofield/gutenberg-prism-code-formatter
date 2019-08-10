<?php
/**
 * Plugin Name: Code Filter for Prism.js
 * Description: 
 * Version: 1.0.0
 * Author: Jim Schofield
 * Text Domain: cfp
 *
 * @package cfp
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
/**
 * Enqueue block JavaScript and CSS for the editor
 */
function code_prism_filter_register() {
 
    // Enqueue block editor JS
    wp_register_script(
        'cpf/editor-scripts',
        plugins_url( '/dist/pcfBuild.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'dist/pcfBuild.js' ) 
    );
 
    // Enqueue block editor styles
    wp_register_style(
        'cpf/stylesheets',
        plugins_url( '/dist/style.css', __FILE__ ),
        [ 'wp-edit-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'dist/style.css' ) 
    );
    register_block_type('cpf/filter', array(
        'editor_script' => 'cpf/editor-scripts',
        'style' => 'cpf/stylesheets'   
    ));
 
}
// Hook the enqueue functions into the editor
add_action( 'init', 'code_prism_filter_register' );