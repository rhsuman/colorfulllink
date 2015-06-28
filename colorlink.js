var ie = document.all ? true : false;
var colorfulLinkLoaded = colorfulLinkLoaded ? colorfulLinkLoaded : false;
var defaultColor = "#0000ff";

function getSimilarColor(color, rInc, gInc, bInc){
    var r = parseInt(color.substr(0,2),16);
    var g = parseInt(color.substr(2,2),16);
    var b = parseInt(color.substr(4,2),16);
    var r2 = (r + rInc); if((r2>=256)||(r2<=0)){rInc = -rInc;}
    var g2 = (g + gInc); if((g2>=256)||(g2<=0)){gInc = -gInc;}
    var b2 = (b + bInc); if((b2>=256)||(b2<=0)){bInc = -bInc;}
    r += rInc;
    g += gInc;
    b += bInc;
    r = r.toString(16); r = r.length < 2 ? "0"+r : r;
    g = g.toString(16); g = g.length < 2 ? "0"+g : g;
    b = b.toString(16); b = b.length < 2 ? "0"+b : b;
    var color = r+g+b;
    return [color, rInc, gInc, bInc];
}
function setObjLinkColor(id, color, rInc, gInc, bInc){
    var obj = document.getElementById(id);
    obj.style.color = "#"+color;
    if(obj.className=="color"){
        var colorParams = getSimilarColor(color, rInc, gInc, bInc);
        var newColor = colorParams[0];
        rInc = colorParams[1];
        gInc = colorParams[2];
        bInc = colorParams[3];
        var func = "setObjLinkColor('"+id+"', '"+newColor+"', "+rInc+", "+gInc+", "+bInc+")";
        setTimeout(func, 25);
    }
}
function makeColorful(evt, obj){
    obj = obj ? obj : evt.target;
    obj.className = "color";
    var color = defaultColor.substr(1);
    var rInc = 11;
    var gInc = 15;
    var bInc = 19;
    setObjLinkColor(obj.id, color, rInc, gInc, bInc);
}
function returnColor(evt, obj){
    obj = obj ? obj : evt.target;
    obj.className = "common";
    var func = "unsetStyleColor('"+obj.id+"')";
    setTimeout(func,25);
}
function unsetStyleColor(id){
    var obj = document.getElementById(id);
    obj.style.color = obj.defaultColor;
}
function setLinkEvents(obj){
    if(ie){
        obj.onmouseover = function(){makeColorful(event, this);};
        obj.onmouseout  = function(){returnColor(event, this);};
    }
    else {
        obj.onmouseover = makeColorful;
        obj.onmouseout  = returnColor;
    }
}
function setLinkAttr(obj, i){
    obj.id = obj.id ? obj.id : "colorfulAnchor_"+i;
    obj.defaultColor = obj.style.color;
    if(!obj.title){obj.title = "Colorful link by: www.deshamarbd.com";}
}
function loadColorful(){
    var objs = document.getElementsByTagName("a");
    for(var i=0; i<objs.length; i++){
        var obj = objs[i];
        setLinkEvents(obj);
        setLinkAttr(obj, i);
    }
}
if(!colorfulLinkLoaded){
    var loadFunc_colorfulLink = window.onload;
    window.onload = function(){
        if(loadFunc_colorfulLink){loadFunc_colorfulLink();}
        loadColorful();
    }
    colorfulLinkLoaded = true;
}
