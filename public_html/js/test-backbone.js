/*==============================================================================
 *  Title      : Test javascript file
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 01.04.2015
 *==============================================================================
 */

$(function(){
//=== Main begin ===============================================================

    console.log('test.js is loaded! OK');
    
    
    //--- Design ---
    
    function activatePageTab(id) {
        if (id === null) { id = ""; }
        var parent = $("a[href='#"+id+"']").parent('li');
            parent.addClass('active');
            parent.siblings().removeClass('active');
    }
    
    //--- Models ---
    
    var pageModel = Backbone.Model.extend({
        idAttribute: "name",    
        initialize: function() {
        //    console.log("model created: " + this.get("name"));
        },
        defaults: {
            name: "",
            body: ""
        }
    });
    
    var currentPage = new pageModel();
    
        /*
        currentPage.on("change:name", function(){
            $("#page_title").html(this.get("name"));
            $("#page_body").html("Loading...");
        });
        currentPage.on("change:body", function(){
            $("#page_body").html(this.get("body"));
        });
        */
    //--- Views ---
    
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g }; // set Mustache.js-style templating for "Underscore"
    
    var pageView = Backbone.View.extend({
        
        //template: _.template("<div><h3><%= name %></h3><p><%= body %></p></div>"),
        template: _.template($("#pageTemplateMustache").html()),
        
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        
        render: function() {
            this.$el.html(this.template(this.model.attributes));
        }

    });
    
    var currentPageView = new pageView({ model: currentPage, el: $("#the_page") });
    
    //--- Collections ---
    
    var pageCollection = Backbone.Collection.extend({
            model: pageModel,
              url: '../page'
    });
    
    var SitePages = new pageCollection();
    //  SitePages.fetch();
    
    function getPage(id) {
        
        var page = SitePages.get(id);
        
        if (!page) { 
            //console.log('get new page: '+id);
            page = SitePages.add({name: id});
            page.once("change", function(){ currentPage.set("body", this.get("body")); });
            page.fetch({
                success: function (model, response, options) { 
                //    console.log('OK:', response , options );
                },
                
                error: function (model, response, options) {
                //    console.log('ERRROR:', model.url(), model.urlRoot, response , options);
                    page.set("body", response.responseText);
                }
            });
        }
        
        currentPage.set(currentPage.idAttribute, page.get(page.idAttribute));
        currentPage.set("body", page.get("body"));
    }
    
    
    //--- Router ---
    
    var router = Backbone.Router.extend({
        
        routes:{
                "" : "pageRouter",
           ":page" : "pageRouter"
        },
        
        defaultPage: "main",
        
        pageRouter: function (page) {
          if (!page) { page = this.defaultPage; }
          activatePageTab(page);
          getPage(page);          
        }
        
    });
    
    var Router = new router();
    Backbone.history.start();
    
    //
    //Router.on("route:mainFunc", function() { alert('main trigged'); });    
    //Router.on("route:testFunc", function() { alert('test trigged'); });   
    //
    

    
    

    
//=== Main end =================================================================    
});