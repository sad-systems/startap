/*==============================================================================
 *  Title      : Main application module
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 09.12.2015
 *==============================================================================
 */
define(function(require, exports, module) {
//=== CommonJS module (begin) ==================================================    

    //--- Include other modules:
    var pageRouter = require('app/simple-backbone-router');
        pageRouter.create({
            pageDefault          : "page1",
            pageBaseUrl          : "./page"
            //pageTemplateType     : "mustache",
            //pageTemplateSelector : "#pageTemplateMustache"
        });
        
    //console.log("OK: Main app module is loaded!");
    
//=== CommonJS module (end) ====================================================
//
// The RequireJS alternative way to return the module value is:
// return ...;
//
});