/*==============================================================================
 *  Title      : Main javascript file
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.04.2015
 *==============================================================================
 */

$(function(){
//=== Main begin ===============================================================
    
    //--- Settings -------------------------------------------------------------
    
    var config = {
        defaultPage     : "main",
        pagesBaseUrl    : "./page",
        pageContainerId : "#thePage",
        pageTemplateId  : "#pageTemplate",
        typewriterChildrenFilter : ".typed > *" // ">*"
    };
    
    //--- Design ---------------------------------------------------------------
    
    var main_title = document.title;
    
    //--- Set the page title:
    function setPageTitle(title) {
        var new_title = main_title;
        if (typeof(title) === "object") {
            title = title.find("h2").first().text();
        }
        if (title && typeof(title) === "string") {
            new_title += ' | ' + title;
        }
        document.title = new_title;
    }
    
    //--- Select navigation tab:
    function activatePageTab(id) {
        if (id === null) { id = ""; }
        var parent = $("a[href='#"+id+"']").parent('li');
            parent.addClass('active');
            parent.siblings().removeClass('active');
    }
    
    //--- Models ---------------------------------------------------------------
    
    var pageModel = Backbone.Model.extend({
        idAttribute: "name",    
        initialize: function() {},
        defaults: {
            name: "",
            body: ""
        }
    });
    
    var currentPage = new pageModel();

    //--- Views ----------------------------------------------------------------
    
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g }; // set Mustache.js-style templating for "Underscore"
    
    var pageView = Backbone.View.extend({
        
        template: _.template($(config.pageTemplateId).html()),
        
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        
        render: function() {
            var self = this;
            var hintShow = function() { self.$el.css({cursor:"pointer"}); };
            var hintHide = function() { self.$el.css({cursor:""}); };
            //--- Abort typewriter if it works:
            this.$el.typewriter("abort");
            //--- Hide output:
            this.$el.css("display", "none");
            //--- Insert data:
            this.$el.html(this.template(this.model.attributes));
            //--- Update main page title:
            setPageTitle(this.$el);
            //--- Set "finish" action on "click":
            this.$el.one("click.typewriter", function() { $.fn.typewriter("finish"); });
            hintShow();
            //--- Start "typewriter":
            this.$el.typewriter({interval:50, children:config.typewriterChildrenFilter}).one("end", function(){
                self.$el.off("click.typewriter");
                hintHide();
            });
        }

    });
    
    var currentPageView = new pageView({ model: currentPage, el: $(config.pageContainerId) });
    
    //--- Collections ----------------------------------------------------------
    
    var pageCollection = Backbone.Collection.extend({
            model: pageModel,
              url: config.pagesBaseUrl
    });
    
    var SitePages = new pageCollection();
    
    function getPage(id) {
        
        var page = SitePages.get(id);
        
        if (!page) { 
            page = SitePages.add({name: id});
            page.once("change", function(){ currentPage.set("body", this.get("body")); });
            page.fetch({
                success: function (model, response, options) { 
                },
                
                error: function (model, response, options) {
                    page.set("body", response.responseText);
                }
            });
        }
        
        //currentPage.set(currentPage.idAttribute, page.get(page.idAttribute));
        currentPage.set("body", page.get("body"));
    }
    
    //--- Router ---------------------------------------------------------------
    
    var router = Backbone.Router.extend({
        
        routes:{
                "" : "pageRouter",
           ":page" : "pageRouter"
        },
        
        defaultPage: config.defaultPage,
        
        pageRouter: function (page) {
          if (!page) { page = this.defaultPage; }
          activatePageTab(page);
          getPage(page);          
        }
        
    });
    
    var Router = new router();
    Backbone.history.start();
    
//=== Main end =================================================================    
});