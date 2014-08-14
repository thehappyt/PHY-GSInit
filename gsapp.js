;(function () {
    "use strict";
    
    function GSapp(options) {
        if (!(this instanceof GSapp)) return new GSapp(options);
        options = options || {}
        if (window.improvedCanvas) this.scene = improvedCanvas({ resizable:false })
        else this.scene = canvas({ resizable:false })
        this.appst = function(ttl, cptn) {       // SETUP APPLICATION STRUCTURE
            var high = Number(window.innerHeight) - 78              // 36 for status bar, 21 for title, 24 for menubar, 21 for iconbar
            var wide = Number(window.innerWidth) - 20               // 20 for good measure

            this.scene.width=high
            this.scene.height=high
            this.scene.title.text(ttl);
            this.scene.caption.text(cptn);
            this.scene.menubar = $("<div/>").css("white-space","pre").insertBefore(this.scene.wrapper)
            this.scene.iconbar = $("<div/>").css("white-space","pre").insertBefore(this.scene.wrapper)
            this.scene.wrapper.css({margin: '4px'})
            $(this.scene.__canvas_element).css({border: '1px solid #AAA'})
            $(this.scene.__overlay_element).css({border: '1px solid #AAA'})
            if(!this.scene.__activated) sphere({ canvas: this.scene, visible: false })
            
            print('', {end:''})
            print_options({width:Math.max(Math.min(wide - high,400),200), height:high+48-6, position:"right"})
            
            this.scene.menubar.addClass("gsmenubar")
            this.scene.iconbar.addClass("gsiconbar")
        }
        
        this.menuitem = function(mi) { if (mi instanceof jQuery && (mi.is("li") || mi.is("ul"))) this.scene.menubar.append(mi.gsmenubar()); }
        
        this.iconitem = function(ii) { if (ii instanceof jQuery && ii.is("button")) this.scene.iconbar.append(ii); }
        
        if (!options.title) options.title = '';
        if (!options.caption) options.caption = '';
        this.appst(options.title, options.caption);
        delete options.title;
        delete options.caption;
        for (var id in options) this.scene[id] = options[id];
        
    }
    GSapp.prototype.constructor = GSapp

    var global = window
    function Export( exports ) {
        for(var id in exports) {
            global[id] = exports[id]
        }
    }

    var exports = { GSapp: GSapp }
    Export(exports)
})()
