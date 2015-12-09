/*==============================================================================
 *  Title      : RequireJS config file
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 09.12.2015
 *==============================================================================
 */
require.config({
    baseUrl : "js",
    urlArgs : "version=" + (new Date()).getTime(), //--- disable cache 
                                                   // for develop mode use: (new Date()).getTime() 
                                                   // for production use:   <number of version> of your application
    paths   : { 
               app : "modules",
            digger : "modules/digger"
            }
});

