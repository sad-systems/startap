/*!=============================================================================
 *  Title      : Typewriter Jquery plug-in
 *  Author     : Digger (c) SAD-Systems <http://sad-systems.ru>
 *  Created on : 25.10.2015
 *==============================================================================
 */
    
(function( $ ){
    
  var active = true;  
  var cancel; // correct finish
  var abort;  // abandon (kill)
    
  $.fn.typewriter = function( options ) {
  //-------------------------------------
    cancel = false;
    abort  = false;
 
    if (options == "finish") {
        cancel = true;
        return this;
    }
    if (options == "activate") {
        active = true;
        return this;
    }
    if (options == "deactivate") {
        active = false;
        return this;
    }
    if (options == "abort") {
        abort = true;
        return this;
    }
  
    var settings = $.extend( {
        autospeed: true,
        interval : "10", //ms
        pointer  : "█",
        children : null
    }, options);
    
    var typeIt = function(el) {
        var $target = $(el);
        var html = $target.html();
        var text = $target.text();
        //--- Automatic interval:
        if (settings.autospeed) {
            if (text.length > 50) { 
                settings.interval = 5; 
            } else {
                settings.interval = 50; 
            }
        }
        //--- Insert pointer:
        $target.html("<em>" + settings.pointer + "</em>");
        var $pointer = $target.find("em");
        //--- Auto display:
        if ($target.css("display") === 'none') { $target.css("display", ""); };

        var position = 0;
        var timeout_id;
        
        //--- functions:
        var finish = function () {
                position = text.length;
                clearTimeout(timeout_id);
                $target.html(html);
                $target.trigger("end");           
        };        
        var typer = function() {
            if (abort)   { return ; }
            if (cancel)  { finish(); return ; }
            if (!active) { finish(); return ; }
            if (position < text.length) {
                $pointer.before(text.charAt(position));
                position++;
                timeout_id = setTimeout(function() { typer(); }, settings.interval);
            } else {
                finish();
            }
        };

        //--- Run:
        typer();        
    };
    
    return this.each(function() {
        
        $this = $(this);
        if (settings.children !== null) {
            //--- Create a chain from children elements:
            //var $children = $this.children(settings.children);
            var $children = $this.find(settings.children);
                $children.each(function(){ $(this).css("display", "none"); });
                if ($this.css("display") === 'none') { $this.css("display", ""); };
                //--- Set a chain of children:
                for (var i=0; i<$children.length; i++) {
                    if (i == $children.length-1) {
                        $($children[i]).one('end', function( event ){ 
                            event.stopPropagation(); 
                            $this.trigger("end"); 
                        });
                    } else {
                        $children[i]._next = $children[i+1];
                        $($children[i]).one('end', function( event ){ 
                            event.stopPropagation(); 
                            typeIt(this._next); 
                            delete this._next; 
                        });
                    }
                }
                //--- Run the chain:
                typeIt($children[0]);
        } else {
            //--- Run single:
            typeIt(this);
        }
        
    });   
    
  //-------------------------------------
  };
  
})( jQuery );    
  
//$('.jumbotron').on('click', function(){ $.fn.typewriter("deactivate"); });  
//$('.jumbotron').typewriter({interval:50, children:">*"}).on("end", function(){ $('.test_text').typewriter({children:"a"}); });
//$('.jumbotron').typewriter({interval:200});
//$('.test_text').typewriter();

