/*==============================================================================
 *  Title      : Simple page router module (using backbonejs)
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 09.12.2015
 *==============================================================================
 */
define(function(require, exports, module) {
//=== CommonJS module (begin) ==================================================  
    
    function create( config ) {
        
        if (!config || typeof(config) !== 'object') config = {};
    
        //--- Models ---

        var pageModel = Backbone.Model.extend({
            idAttribute: config.attributeId,    
            initialize: function() {
            //    console.log("model created: " + this.get("name"));
            }
            //,
            //defaults: {
            //    name: "",
            //    body: ""
            //}
        });

        var currentPage = new pageModel();

            /*
            currentPage.on("change:name", function(){
                ...
            });
            currentPage.on("change:body", function(){
                ...
            });
            */

        //--- Views ---
        
        if (config.pageTemplateType === "mustache") {
            //--- Set Mustache.js-style templating for "Underscore":
            _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
        }

        var pageView = Backbone.View.extend({

            //template: _.template("<div><h3><%= name %></h3><p><%= body %></p></div>"),
            template: _.template( $( config.pageTemplateSelector ).html() ),

            initialize: function() {
                this.listenTo(this.model, "change:" + config.attributeBody, this.render);
            },

            //--- Render the page --------------------------------------------------
            render: function() {
                //--- Create html data:
                this.$el.html(this.template(this.model.attributes));           
                //--- onpageready (call a function to draw):
                if (typeof(config.onpageready) === 'function') config.onpageready(this);
            }
            //----------------------------------------------------------------------

        });

        var currentPageView = new pageView({ model: currentPage }); //, el: $("#the_page")

        //--- Collections ---

        var pageCollection = Backbone.Collection.extend({
                model: pageModel,
                  url: config.pageBaseUrl
        });

        var SitePages = new pageCollection();
        //  SitePages.fetch(); //<--- get all pages (demo)

        function getPage(id, disableCache) {
             
            if (!id) id = config.pageDefault;
            
            if (typeof(disableCache) == 'undefined') disableCache = config.disableCache;

            var page = disableCache ? null : SitePages.get(id);

            if (!page) {
                //--- onloadbegin:
                if (typeof(config.onloadbegin) === 'function') config.onloadbegin(this);
                //--- Add a new page:
                var page_params = {};
                    page_params[currentPage.idAttribute] = id;
                page = SitePages.add(page_params);
                page.once("change", function(){
                    //--- onloadend:
                    if (typeof(config.onloadend) === 'function') config.onloadend(this);
                    //--- Data set:
                    currentPage.set("isCached", false);
                    currentPage.set(currentPage.idAttribute, this.get(currentPage.idAttribute));
                    currentPage.set(config.attributeBody, this.get(config.attributeBody)); 
                    //--- Clear the collection if config.disableCache == true:
                    if (disableCache) SitePages.reset();
                });
                page.fetch({
                    success: function (model, response, options) { 
                    //    console.log('OK:', response , options );
                    },

                    error: function (model, response, options) {
                    //    console.log('ERRROR:', model.url(), model.urlRoot, response , options);
                        page.set(config.attributeBody, response.responseText);
                    },
                    cache : false
                });
            } else {
                //--- Data set:
                currentPage.set("isCached", true);
                currentPage.set(currentPage.idAttribute, page.get(currentPage.idAttribute));
                currentPage.set(config.attributeBody, page.get(config.attributeBody));
            }

        }

        //--- Router ---

        var router = Backbone.Router.extend({

            routes:{
                    "" : "pageRouter",
               ":page" : "pageRouter"
            },

            pageRouter: function (page) {
                getPage(page);          
            }

        });

        var Router = new router();
        Backbone.history.start();
  
    }
    
//------------------------------------------------------------------------------
// Class
//------------------------------------------------------------------------------

    /**
     * Constructor
     * 
     * @param   {object} options
     * @returns {object}
     */
    var __theClass = function ( options ) {
        
        var self = this;
        
        this.config = {
            
            //--- Properties:
            
            attributeId          : "name",
            attributeBody        : "body",
            
            pageDefault          : "main",
            pageBaseUrl          : "./page",
            
            pageSelector         : ".page",
            pageTemplateType     : "mustache",
            pageTemplateSelector : "<div>{{body}}</div>", //"<div><h3>{{name}}</h3><p>{{body}}</p></div>"
            
            disableCache         : false,
            
            //--- Events:
            
            onpageready : function(view) { 
                $(this.pageSelector).html(view.$el.html());
                self.activateLink(view.model.get(this.attributeId));
                //console.log("ready:" + view.model.get(this.attributeId)); 
            },
            onloadbegin : null,
            //        function() { 
            //    console.log("loading..."); 
            //},
            onloadend   : null
            //        function() { 
            //    console.log("finished"); 
            //}
            
        };
        
        $.extend( true, this.config, options );
        
        create( this.config );
        
        return this;
    };

    /** 
     * Show active page link
     * 
     * @param   {string}    ID of the page
     * @returns {undefined}
     */
    __theClass.prototype.activateLink = function (id) {
        if (id === null) id = "";
        var parent = $("a[href='#"+id+"']").parent('li');
            //--- Deactivate all navigation items:
            $("nav li").removeClass('active'); //parent.siblings().removeClass('active');
            //--- Activate the item:
            parent.addClass('active');
    };
    
    /**
     * Get the page
     * 
     * @param   {sttring} id            ID of the page
     * @param   {boolean} disableCache  Do not get the page from the collection (cache)
     * @returns {undefined}
     */
    __theClass.prototype.getPage = function (id, disableCache) {
        getPage(id, disableCache);
    };
    
    
//------------------------------------------------------------------------------
// Return
//------------------------------------------------------------------------------

    module.exports = {
        //--- Class factory:
        create: function( options ) { return new __theClass(options); },
        //--- The class:
        theclass: __theClass
    };
    
//=== CommonJS module (end) ====================================================
//
// The RequireJS alternative way to return the module value is:
// return ...;
//
});