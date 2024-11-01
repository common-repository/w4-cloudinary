<?php
   /*
   Plugin Name: W4 Cloudinary
   Plugin URI: http://w-4.com/wordpress/w4cloudinary
   description: Frontend output optimization of images inserted by the Cloudinary plugin
   Version: 0.5
   Author: W4 Team
   Author URI: http://w-4.com
   License: GPL2
   */

   $cloudinary_res_domain = 'res.cloudinary.com';
   $autosize_threshold_h = 600;
   $autosize_threshold_w = 600;
   $max_log = 10;
   $enable_log = get_option('w4cloudinary_log_enable');
   $w4c_quality = get_option('w4cloudinary_quality');
   
   if (!$w4c_quality) {
       $w4c_quality = 'auto:best';
   }

   function w4_cloudinary_log( $msg, $level = 0 ) {
      global $enable_log;
      global $max_log;
      if ($enable_log) {
         if ($max_log >= $level) {
            file_put_contents(__DIR__.'/../../../cloudinary.log', str_repeat(' ', $level) . $msg . "\n", FILE_APPEND);
         }
      }
   }

   function w4_cloudinary_transform_img( $content ) {
      $content = preg_replace_callback(
         '/(<img.*?)src="(.*?' . $cloudinary_res_domain . '.*?)"(.*?)>/',
         function ($matches) {
            global $autosize_threshold_w;
            global $autosize_threshold_h;
            global $w4c_quality;
            
            w4_cloudinary_log('checking ' . $matches[0]);
            
            $tag_content = $matches[0];
            // set data src instead of src - for future transformations
            $tag_content = preg_replace('/src=/', 'data-src=', $tag_content);
            // replace width transformation to auto
            if (preg_match('/h_\d+,w_(\d+)/', $tag_content)) {
               $tag_content = preg_replace('/h_\d+,w_(\d+)/', 'w_auto', $tag_content, -1, $width_found);
            } else if (preg_match('/h_\d+,w_(\d+)/', $tag_content)) {
               $tag_content = preg_replace('/w_(\d+),h_\d+/', 'w_auto', $tag_content, -1, $width_found);
            } else {
               $tag_content = preg_replace('/w_(\d+)/', 'w_auto', $tag_content, -1, $width_found);
            }
            
            w4_cloudinary_log('stage 1 output:', 1);
            w4_cloudinary_log($tag_content, 1);

            w4_cloudinary_log('width found: ' . $width_found, 1);

            // no width transformation found, add it
            if (!$width_found) {
               w4_cloudinary_log('no width found in cloudinary source url, autoadding...', 1);
               $tag_content = preg_replace('/\/upload\//', '/upload/w_auto/', $tag_content);
            }
            if (strpos($tag_content, 'class=') === false)
            {
               w4_cloudinary_log('no class attribute, autoadding...', 1);
               $tag_content = preg_replace('/<img/', '<img class="cld-responsive"', $tag_content);
            }
            else
            {
               w4_cloudinary_log('adding responsive class...', 1);
               $tag_content = preg_replace('/(class=[\'"])(.*?)([\'"])/', '\\1 cld-responsive \\2 \\3', $tag_content);
            }
            $tag_content = preg_replace('/width="(\d+)"/', 'width="\\1" data-w4c-width="\\1"', $tag_content);
            $tag_content = preg_replace('/height="(\d+)"/', 'height="\\1" data-w4c-height="\\1"', $tag_content);

            w4_cloudinary_log('stage 2 output:', 1);
            w4_cloudinary_log($tag_content, 1);

            if (preg_match('/width="(\d+)"/', $tag_content, $w_matches)) {
               if ($w_matches[1] > $autosize_threshold_w) {
                  w4_cloudinary_log('image width ' . $h_matches[1] . '>' . $autosize_threshold_w . ', removing...', 2);
                  $tag_content = preg_replace('/ width="(\d+)"/', '', $tag_content);
               }
            }
            if (preg_match('/height="(\d+)"/', $tag_content, $h_matches)) {
               if ($h_matches[1] > $autosize_threshold_h) {
                  w4_cloudinary_log('image height ' . $h_matches[1] . '>' . $autosize_threshold_h . ', removing...', 2);
                  $tag_content = preg_replace('/ height="(\d+)"/', '', $tag_content);
               }
            }

            if (preg_match('/,?q_[a-z:]+/', $tag_content)) {
                $tag_content = preg_replace('/(,)?q_[a-z:]+/', '(\\1)q_' . $w4c_quality, $tag_content, -1);
            } else {
                $tag_content = preg_replace('/w_auto/', 'w_auto,q_' . $w4c_quality, $tag_content, -1);
            }

            w4_cloudinary_log('final output:', 1);
            w4_cloudinary_log($tag_content, 1);
            w4_cloudinary_log('-------------------------', 1);

            return $tag_content;
         },
         $content
      );

      return $content;
   }

   add_action( 'wp_head', 'w4cloudinary_set_var' );
   function w4cloudinary_set_var() {
      echo '<script type="text/javascript">var w4cloudinary_cloud = "' . get_option('w4cloudinary_cloud_name') . '";</script>';
  }

   add_action( 'wp_enqueue_scripts' , 'w4_cloudinary_enqueue_scripts', 100 );
   
   function w4_cloudinary_enqueue_scripts() {
      wp_register_script(
         'w4-cloudinary-vendor-js',
         plugins_url(
            'js/cloudinary.js', 
            __FILE__
         )
      );
      wp_register_script(
         'w4-cloudinary-js',
         plugins_url(
            'js/w4cloudinary.js', 
            __FILE__
         )
      );
      wp_enqueue_script('w4-cloudinary-vendor-js', array( 'jquery' ));
      wp_enqueue_script('w4-cloudinary-js', array( 'w4-cloudinary-vendor-js' ));
   }

   function w4cloudinary_buffer_callback($buffer) {
      // modify buffer here, and then return the updated code
      $buffer =  w4_cloudinary_transform_img($buffer);
      #$buffer =  w4_cloudinary_transform_css($buffer);
      return $buffer;
    }
    
    function w4cloudinary_buffer_start() { ob_start("w4cloudinary_buffer_callback"); }
    
    function w4cloudinary_buffer_end() { ob_end_flush(); }
    
    add_action('wp_head', 'w4cloudinary_buffer_start');
    add_action('wp_footer', 'w4cloudinary_buffer_end');

    add_action('admin_menu', 'w4cloudinary_options_page');

    function w4cloudinary_options_page() {   
          //create new top-level menu
          add_menu_page('W4 Cloudinary Options', 'W4 Cloudinary', 'administrator', __FILE__, 'w4cloudinary_settings_page' , plugins_url('/images/icon.png', __FILE__) );
    
          //call register settings function
          add_action( 'admin_init', 'register_w4cloudinary_settings' );
    }

    function register_w4cloudinary_settings() {
      //register our settings
      register_setting( 'w4cloudinary_settings', 'w4cloudinary_cloud_name' );
      register_setting( 'w4cloudinary_settings', 'w4cloudinary_log_enable' );
      register_setting( 'w4cloudinary_settings', 'w4cloudinary_quality' );
    }

    function w4cloudinary_settings_page() {
      ?>
      <div class="wrap">
      <h1>W4 Cloudinary Settings</h1>
      
      <form method="post" action="options.php">
          <?php settings_fields( 'w4cloudinary_settings' ); ?>
          <?php do_settings_sections( 'w4cloudinary_settings' ); ?>
          <table class="form-table">
              <tr valign="top">
                <th scope="row">Cloudinary Cloud Name</th>
                <td><input type="text" name="w4cloudinary_cloud_name" value="<?php echo esc_attr( get_option('w4cloudinary_cloud_name') ); ?>" /></td>
              </tr>
              <tr valign="top">
                <th scope="row">Image quality</th>
                <td>
                    <select name="w4cloudinary_quality">
                        <option value="auto:best" <?php if (get_option('w4cloudinary_quality') == 'auto:best') { echo 'selected'; } ?>>Automatic - best</option>
                        <option value="auto:good" <?php if (get_option('w4cloudinary_quality') == 'auto:good') { echo 'selected'; } ?>>Automatic - good</option>
                        <option value="auto:eco" <?php if (get_option('w4cloudinary_quality') == 'auto:eco') { echo 'selected'; } ?>>Automatic - eco</option>
                        <option value="auto:low" <?php if (get_option('w4cloudinary_quality') == 'auto:low') { echo 'selected'; } ?>>Automatic - low</option>
                    </select>
                </td>
              </tr>
              <tr valign="top">
                <th scope="row">Enable logging </th>
                <td><input type="checkbox" name="w4cloudinary_log_enable" value="1" <?php if (get_option('w4cloudinary_log_enable') == 1) { echo 'checked="true"'; } ?> /></td>
              </tr>
          </table>
          <?php submit_button(); ?>
      </form>
      </div>
<?php }
?>