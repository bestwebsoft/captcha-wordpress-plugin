/*!
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/
 */
(function( $ ) {
	$(document).ready(function() {

		/**
		 * Handle the styling of the "Settings" tab on the plugin settings page
		 * @since 4.2.3
		 */
		var limitOption	= $( '#cptch_enable_time_limit' ),
			imageFormat	= $( '#cptch_operand_format_images' );

		/*
		* Hide "time limit thershold" field under unchecked "time limit" field
		*/
		if ( ! $( limitOption ).is( ':checked' ) ) {
			$( limitOption ).closest( 'tr' ).nextAll( '.cptch_time_limit' ).hide();
		}

		$( limitOption ).click( function() {
			$( limitOption ).closest( 'tr' ).nextAll( '.cptch_time_limit' ).toggle();
		});

		/*
		 * Hide all unused related forms on settings page
		 */
		$.each( $( "input[name*='[enable]']" ), function() {
			var formName	= '.' + $( this ).attr( 'id' ).replace( 'enable', 'related_form' ),
				formBlock	= $( formName );

			$( this ).is( ':checked' ) ? formBlock.show() : formBlock.hide();

			$( this ).click( function() {
				if ( $( this ).is( ':checked' ) ) {
					formBlock.show();
				} else {
					formBlock.hide();
				}
			});
		});

		function cptch_type() {
			if ( 'recognition' == $( 'input[name="cptch_type"]:checked' ).val() ) {
				$( '.cptch_for_math_actions' ).hide();
				$( '.cptch_for_recognition' ).show();
				imageFormat.attr( 'checked', 'checked' );
				cptchImageOptions();
			} else if ( 'invisible' == $( 'input[name="cptch_type"]:checked' ).val() ) {
				$( '.cptch_for_recognition, .cptch_for_math_actions' ).hide();
				imageFormat.removeAttr('checked' );
				cptchImageOptions();
			} else {
				$( '.cptch_for_recognition' ).hide();
				$( '.cptch_for_math_actions' ).show();
			}
		}
		cptch_type();
		$( 'input[name="cptch_type"]' ).click( function() { cptch_type(); } );

		/* Handle the displaying of notice message above lists of image packages */
		function cptchImageOptions() {
			var isChecked = imageFormat.is( ':checked' );
			if ( isChecked ) {
				$( '.cptch_images_options' ).show();
				$( '.cptch_enable_to_use_several_packages' ).closest( '.bws_pro_version_bloc' ).show();
			} else {
				$( '.cptch_images_options' ).hide();
				$( '.cptch_enable_to_use_several_packages' ).closest( '.bws_pro_version_bloc' ).hide();
			}
		}
		cptchImageOptions();
		imageFormat.click( function() { cptchImageOptions(); } );

		/* Open/hide packages pro tab */
		$( '#cptch_show_packages_pro_tab_open' ).click( function() {
			$( '#cptch_show_packages_pro_tab' ).toggle();
		});
	});
})(jQuery);
