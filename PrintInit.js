function set_print() {
    print('')
    
    var wrap = document.getElementsByClassName('glowscript-canvas-wrapper')[0]
    wrap.setAttribute("id", "scenewrap")
    
    var prt = $("#print")
    prt.appendTo(wrap);
    
    var wide=Number($("#scenewrap").css("width").slice(0,-2))-scene.width-10
    var high=scene.height
    
    print_options({width:wide, height:high})
}
