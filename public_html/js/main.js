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
        $thePage        : $(".page"),
        $theLoader      : $(".loader"),
        pageTemplateId  : "#pageTemplate",
        typewriterChildrenFilter : ".typed > *", // ">*"
        
        chainShow_effect   : "fade",
        chainShow_easing   : "easeOutQuad",
        chainShow_duration : 1000
    };
    
    //=== Design ===============================================================
    
    //--- Vars:
    var main_title        = document.title;
    var firstPageIsShowed = false;
    var introIsShowing    = false;
    
    //--- Loader:
    function showLoader() { config.$theLoader.css("display", ""); }
    function hideLoader() { config.$theLoader.css("display", "none"); }
    
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
    
    //--- Chain show:
    function chainShow($el) {
        if ($el.data("show")) {
            var $showObj = $("[data-show-id=" + $el.data("show") + "]");
            var effect   = $showObj.data("show-effect")   || config.chainShow_effect;
            var easing   = $showObj.data("show-easing")   || config.chainShow_easing;
            var duration = $showObj.data("show-duration") || config.chainShow_duration;
            //--- Abort old running effect:
            $showObj.stop();
            //--- Start the new effect:
            $showObj.effect(effect, {easing:easing}, duration, function(){
                chainShow($showObj);
            });
        }        
    }

    //--- Show page:
    function showPage($bufferEl) {
        
            //--- Wait till the end of "intro":
            if (introIsShowing) { setTimeout(function(){ showPage($bufferEl); }, 100); return; }
           
            //--- Get the page:
            var $page = config.$thePage;
            //--- The hint:
            var hintShow    = function() { $page.css({cursor:"pointer"}); };
            var hintHide    = function() { $page.css({cursor:""}); };
            var displayPage = function() {
                //--- Clear the page (from old data):
                $page.html("");
                //--- Show page:
                $page.toggle("fade", {direction:"in"}, 500, function() {
                    //----------------------------------------------------------
                    //--- Hide output:
                    $page.css("display", "none");
                    //--- Insert data:
                    $page.html($bufferEl.html()); // $page.html(this.template(this.model.attributes));
                    //--- Update main page title:
                    setPageTitle($page);
                    //--- Set "finish" action on "click":
                    $page.one("click.typewriter", function() { $.fn.typewriter("finish"); });
                    hintShow();
                    //--- Hide all elements with "data-show-id":
                    $("[data-show-id]").css("display","none");
                    
                    /*
                    //--- Show output:
                    $page.css("display", "");
                    //--- Start the chain:
                    var $chain = $("[data-show]");
                    chainShow($($chain[0]));
                    */
                   
                    //--- Start "typewriter":
                    $page.typewriter({interval:50, children:config.typewriterChildrenFilter}).one("end", function(){
                        $page.off("click.typewriter");
                        $page.off("endChild.typewriter");
                        hintHide();
                    }).on("endChild.typewriter", function(event, child){ 
                        //--- Start chain show:
                        chainShow($(child));
                    });
                    
                    //----------------------------------------------------------
                });                 
            };
            
            //--- Abort typewriter if it works:
            $page.typewriter("abort");
            //--- Abort page animation:
            $page.stop();
            //--- Display the page:
            if (!firstPageIsShowed) {
                displayPage();
                //--- Set the flag:
                firstPageIsShowed = true;
            } else {
            //--- Hide old page:
                $page.toggle("fade", {direction:"out"}, 500, function() {
                    displayPage();
                });
            }

    }

    //==========================================================================
    // Intro 
    //==========================================================================
    
    (function() {
        introIsShowing = true;
        //--- Intro body ---
        var $header = $("header").css("display", "none");
        var $footer = $("footer").css("display", "none");
        var $page   = $(".page").css("display", "none");
        $footer.effect("slide", {direction:"down"}, 500, function() {});
        $header.effect("slide", {direction:"up"}, 500, function() { introIsShowing = false; });
        //---
    })();    
    
    //==========================================================================
    
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
            this.listenTo(this.model, "change:body", this.render);
        },
        
        //--- Render the page --------------------------------------------------
        render: function() {
            
            //--- Nothing to do if "body" is empty:
            if (!this.model.get("body")) { /* alert('EMPTY BODY!'); */ return; }
            //--- Insert data:
            this.$el.html(this.template(this.model.attributes));           
            //--- Show the Page:
            showPage(this.$el);
            
        }
        //----------------------------------------------------------------------

    });
    
    var currentPageView = new pageView({ model: currentPage }); //, el: $(config.pageContainerId) });
    
    //--- Collections ----------------------------------------------------------
    
    var pageCollection = Backbone.Collection.extend({
            model: pageModel,
              url: config.pagesBaseUrl
    });
    
    var SitePages = new pageCollection();
    
    function getPage(id) {
        
        var page = SitePages.get(id);
        
        if (!page) { 
            showLoader();
            page = SitePages.add({name: id});
            page.once("change", function(){ hideLoader(); currentPage.set("body", this.get("body")); });
            page.fetch({
                success: function (model, response, options) { 
                },
                
                error: function (model, response, options) {
                    page.set("body", response.responseText);
                }
            });
        }
        
        currentPage.set(currentPage.idAttribute, page.get(page.idAttribute));
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