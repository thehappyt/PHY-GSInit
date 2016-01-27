;(function () { 
    "use strict";
    
    function app(options) {
        if (!(this instanceof app)) return new app(options);
        options = options || {}
        if (!options.title) options.title = '';
        if (!options.caption) options.caption = '';
        options.mbar = !!options.mbar;
        options.ibar = !!options.ibar;

        this.canvas = canvas({ resizable:false })
        this.appst = function(ttl, cptn, mbar, ibar) {                              // SETUP APPLICATION STRUCTURE
            var high = Number(window.innerHeight) - 57 - 24*(mbar) - 21*(ibar)      // 36 for status bar, 21 for title
            var wide = Number(window.innerWidth) - 20                               // 20 for good measure

            this.canvas.width=high
            this.canvas.height=high
            if (!this.canvas.__activated) sphere({ canvas: this.canvas, visible: false })
            this.canvas.title.text(ttl);
            this.canvas.caption.text(cptn);
            if (mbar) this.canvas.menubar = $("<div/>").css("white-space","pre").insertBefore(this.canvas.wrapper).addClass("gsmenubar");
            if (ibar) this.canvas.iconbar = $("<div/>").css("white-space","pre").insertBefore(this.canvas.wrapper).addClass("gsiconbar");
            this.canvas.wrapper.css({margin: '4px'})
            $(this.canvas.__canvas_element).css({border: '1px solid #AAA'})
            $(this.canvas.__overlay_element).css({border: '1px solid #AAA'})
            
            print('', {end:''})
            print_options({width:Math.max(Math.min(wide - high,400),200), height:high+48-6, pos:"right"})
        }
        
        if (options.mbar) {
            this.menuitem = function(mi) { if (mi instanceof jQuery && (mi.is("li") || mi.is("ul"))) this.canvas.menubar.append(mi.gsmenubar()); }
        }
        if (options.ibar) {
            // Syntax: (appobj).iconitem({title, iconclasses, text}, cb)
            this.iconitem = function(opt) {
                var b = $('<button>'), text=opt.text||false;
                if (opt.title) { opt.title = opt.title + ''; b.attr({ title: opt.title }); }
                //if (opt.text) { opt.text = opt.text + ''; b.text( opt.text ); } //(NOT WORKING YET  b.css("width", "50px"))
                b.button({ icons: { primary: "app-icon " + opt.icon }, text: text })
                b.click( function() { $(this).blur(); });
                this.canvas.iconbar.append(b);
                return b;
            }
        }

        var myStylesLocation = "https://raw.githack.com/thehappyt/PHY-GSInit/master/gsapp.css";
        $('<link rel="stylesheet" type="text/css" href="'+myStylesLocation+'" >') .appendTo("head");

        this.appst(options.title, options.caption, options.mbar, options.ibar);
        delete options.title;
        delete options.caption;
        delete options.mbar;
        delete options.ibar;
        for (var id in options) this.canvas[id] = options[id];
        
    }
    app.prototype.constructor = app

    Object.defineProperty(canvas.prototype, "out",     {configurable: false, enumerable: true,  writable: true,
        value: function()  { return this.forward.multiply(-1).norm();            } })
    Object.defineProperty(canvas.prototype, "right",   {configurable: false, enumerable: true,  writable: true,
        value: function()  { return norm(this.up.cross(this.out())); } })
    Object.defineProperty(canvas.prototype, "top",     {configurable: false, enumerable: true,  writable: true,
        value: function()  { return this.out().cross(this.right());  } })
    Object.defineProperty(canvas.prototype, "inPlane", {configurable: false, enumerable: true,  writable: true,
        value: function(pos) {
            if (!(pos instanceof vec)) throw new Error ("Argument 'pos' for inPlane(pos) function must be a vector.");
            return pos.sub((pos.sub(this.center)).proj(this.out()));
        }
    })

    var global = window
    function Export( exports ) {
        if (!global.gsast) global.gsast = {}
        for(var id in exports) {
            if (!global[id]) global[id] = exports[id]
            gsast[id] = exports[id]
        }
    }

    var exports = { app: app }
    Export(exports)
}) ();
