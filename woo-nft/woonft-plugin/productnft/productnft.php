<?php
/**
 * Plugin Name: ProductNFT
 * Plugin URI: https://woonft-store.yoshi.tech
 * Description: Bridging the gap between digital and physical commerce through the power of blockchain. Store owners can now offer their products as unique NFT (Non-Fungible Token) variants on the NEAR protocol via Mintbase.
 * Version: 1.0.0
 * Author: Ivan Ciric
 * Author URI: https://yoshi.tech/
 */

if (!defined('ABSPATH')) {
    exit;
}

register_activation_hook(__FILE__, function () {
    add_option('productnft_api_key', 'trial');
    add_option('productnft_openai_api_key', '');
    add_option('productnft_image_type', 'ai');
});

add_action('admin_init', function () {
    register_setting('productnft-settings-group', 'productnft_api_key');
    register_setting('productnft-settings-group', 'productnft_openai_api_key');
    register_setting('productnft-settings-group', 'productnft_image_type');
});

add_filter('plugin_action_links_' . plugin_basename(__FILE__), function ($links) {
    $settings_link = '<a href="admin.php?page=productnft-settings">' . __('Settings') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
});


add_action('admin_enqueue_scripts', 'productnft_admin_enqueue_assets');
add_action('wp_enqueue_scripts', 'productnft_enqueue_assets');

function productnft_enqueue_assets() {
    productnft_enqueue_scripts();
    productnft_enqueue_styles();
}

function productnft_admin_enqueue_assets() {
    wp_enqueue_script('productnft-bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js', ['jquery'], '4.5.2', true);
    wp_enqueue_script('productnft-imgcheckbox-script', plugin_dir_url(__FILE__) . 'js/jquery.imgcheckbox.js', ['jquery'], '0.5.2', true);
    wp_enqueue_script('productnft-admin-script', plugin_dir_url(__FILE__) . 'js/productnft-admin.js', ['jquery'], '1.0.0', true);
    wp_enqueue_style('productnft-bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css', [], '4.5.2');
    wp_enqueue_style('productnft-admin-styles', plugin_dir_url(__FILE__) . 'css/productnft-admin-styles.css', [], '1.0.0', true);
}

function productnft_enqueue_scripts() {
    wp_enqueue_script('productnft-bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js', ['jquery'], '4.5.2', true);
}

function productnft_enqueue_styles() {
    wp_enqueue_style('productnft-bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css', [], '4.5.2');
    
    
}

function productnft_localize_script($handle, $data =false) {
    wp_localize_script($handle, 'productnft_params', $data);
}

add_action('admin_menu', function () {
    add_menu_page('productnft', 'ProductNFT', 'manage_options', 'productnft-settings', 'productnft_settings_page', 'dashicons-cart', 6);
});

function productnft_settings_page() {
    ?>
    <div class="wrap">
        <h1>ProductNFT Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('productnft-settings-group'); ?>
            <?php do_settings_sections('productnft-settings-group'); ?>
            <table class="form-table">
                <tr valign="top">
                <th scope="row">License Key</th>
                    <td>
                        <span class="productnft-tooltip" data-toggle="tooltip" title="Your plugin activation key">
                                <input type="text" name="productnft_api_key" value="<?php echo esc_html(get_option('productnft_api_key')); ?>">
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">NFT images <br/><small>(defaults to product image)</small></th>
                    <td>
                            <div class="custom-control custom-switch">
                                <span class="productnft-tooltip" data-toggle="tooltip" title="Check if you want to use AI generated product images">
                                    <input type="checkbox" class="custom-control-input" id="productnft_image_type" name="productnft_image_type" value="1" <?php checked(1, get_option('productnft_image_type'), true); ?> >
                                    <label class="custom-control-label" for="productnft_image_type">Use AI</label>
                                </span>
                            </div>
                    </td>
                </tr>
                <tr>
                <th scope="row">OpenAI Api Key <br/><small>(for AI images)</small></th>
                    <td>
                        <span class="productnft-tooltip" data-toggle="tooltip" title="OpenAI API key">
                                <input type="text" name="productnft_openai_api_key" id="productnft_openai_api_key" value="<?php echo esc_html(get_option('productnft_openai_api_key')); ?>">
                                <label for="productnft_openai_api_key">
                                    <a href="https://openai.com/blog/openai-api" target="_blank">get one here</a>
                                </label>
                        </span>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>

    <script type="text/javascript">
        jQuery(document).ready(function($) {
            function toggleApiKeyRequired() {
                var isChecked = $('#productnft_image_type').is(':checked');
                $('#productnft_openai_api_key').attr('required', isChecked);    
            }

            toggleApiKeyRequired();

            $('#productnft_image_type').change(function() {
                toggleApiKeyRequired();
            });
        });
    </script>
    
    <?php
}

add_action('woocommerce_thankyou', 'custom_woocommerce_thankyou_order_details', 10, 1);

function custom_woocommerce_thankyou_order_details($order_id) {
    if (!$order_id)
        return;

    wp_enqueue_style('productnft-styles', plugin_dir_url(__FILE__) . 'css/productnft-product-styles.css', [], '1.0.0');
    wp_enqueue_script('productnft-custom-script', plugin_dir_url(__FILE__) . 'js/productnft-button.js', ['jquery'], '1.0.0', true);
    
    
    $order = wc_get_order($order_id);
    if (!$order)
        return;

    $products = [];
    foreach ($order->get_items() as $item_id => $item) {
        $product = $item->get_product();

        $short_description = $product->get_short_description();
        $words = explode(' ', $short_description);
        if (count($words) > 15) {
            $short_description = implode(' ', array_slice($words, 0, 15));
        }

        $image_id = $product->get_image_id();
        $image_url = wp_get_attachment_image_url($image_id, 'woocommerce_single');

        $products[] = 
        [
            'name' => $product->get_name(),
            'description' => $short_description,
            'image_url' => $image_url,
        ];
    }
    
    $data = [
        'products' => $products,
        'api_key' => get_option('productnft_api_key'),
        'api_url' => 'https://woonft-api.yoshi.tech/api/',
        'image_type' => get_option('productnft_image_type'),
        'openai_api_key' => get_option('productnft_openai_api_key'),
    ];

    add_action('wp_footer', function() use ($data) {
        productnft_localize_script('productnft-custom-script', $data);
    });
}

add_action('wp_body_open', 'productnft_modals');
function productnft_modals() {
    include plugin_dir_path(__FILE__) . 'templates/modals.php';
}

add_action('admin_footer', 'productnft_init_tooltips');
function productnft_init_tooltips() {
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
    <?php
}
