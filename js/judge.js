var system ={
win : false,
mac : false,
xll : false
};
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
var s=window.location.href;
if(s.indexOf("m.haomeiv") > 0 && (system.win||system.mac||system.xll))
{
	window.location.href='http://haomeiv.com/';
}
else if(s.indexOf("m.haomeiv") < 0 && !system.win && !system.mac && !system.xll)
{
	window.location.href='http://m.haomeiv.com/';
}