;(function () { 
    "use strict";

    function circle(args) {
        if (!(this instanceof circle)) return new circle(args);
        args = args || {};
        if (args.canvas !== undefined) {
            this.canvas = args.canvas;
            delete args.canvas;
        } else {
            this.canvas = canvas.selected;
        }
        if (this.canvas) {
            this.canvas.__activate();
        }
        
        var R = args.radius || 1; delete args.radius;
        args.normal = vec(1,0,0);
        args.color = args.color || vec(1,1,1);
        args.axis = args.axis || vec(1,0,0);
        args.up = args.up || vec(0,1,0);
        args.opacity = args.opacity || 1;
        args.shininess = args.shininess || 1;
        args.emissive = args.emissive || 0;
        
        function makeCircle() {
            var N = 50; //number of triangles for circle
            var dtheta = 2*pi/N;
            var sind = sin(dtheta), cosd = cos(dtheta);
            var y=0, z=-1;
            var newy, newz;
            
            var m = { pos: [], index: [] };
            m.pos.push( vec(0, 0, 0) );
            var k = 2*N;
            for (var i=1; i<1+2*N; i+=2) {
                m.pos.push( vec(0,y,z) );
                m.index.push( 0,i,(i+2)%k, 0,((i+2)%k)+1,i+1 );
                newy = y*cosd + z*sind;
                newz = z*cosd - y*sind;
                y = newy;
                z = newz;
            }
            
            return m;
        }
        
        var m = makeCircle(args);
        var v = [];
        v.push( vertex({    pos: R*m.pos[0],            normal: args.normal,
                                color: args.color,          opacity: args.opacity,
                                shininess: args.shininess,  emissive: args.emissive
            }) );
        for (var i=1; i<m.pos.length; i+=1) {
            v.push( vertex({    pos: R*m.pos[i],            normal: args.normal,
                                color: args.color,          opacity: args.opacity,
                                shininess: args.shininess,  emissive: args.emissive
            }) );
            v.push( vertex({    pos: R*m.pos[i],            normal: -args.normal,
                                color: args.color,          opacity: args.opacity,
                                shininess: args.shininess,  emissive: args.emissive
            }) );
        }
        var t = [];
        for (var i=0; i<m.index.length; i+=3) {
            t.push( triangle({ v0: v[m.index[i]], v1: v[m.index[i+1]], v2: v[m.index[i+2]] }) );
        }
        return compound( t, { axis: args.axis, up: args.up } );
    }
    
    var global = window
    function Export( exports ) {
        if (!global.gsast) global.gsast = {}
        for(var id in exports) {
            if (!global[id]) global[id] = exports[id]
            gsast[id] = exports[id]
        }
    }

    var exports = { circle: circle }
    Export(exports)
}) ();
