/*!=============================================================================
 *  Title      : Main javascript file
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 09.12.2015
 *==============================================================================
 */

$(function(){
//    
// Document have been loaded.
// 
    //--------------------------------------------------------------------------
    //
    // Using the RequireJS and JavaScript modules
    // 
    require(['js/require.config'], function() {
        //
        // Configuration have been loaded. 
        // Now, safe to do other require calls that depend on that config.
        //
        require(["app/main"], function(main) {
            //
            // You can put your other dependent code here.
            // But better to place it in the "app/main".
            //
        });
    });
    
    //--------------------------------------------------------------------------
    //
    // Using plain JavaScript
    // 
    
    // Place your javscript code here if do not want to use JavaScript modules
    
});
