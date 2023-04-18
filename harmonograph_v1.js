var s = 1;                                         
var x = 0.0,  y = 0.0;
var t = 0.0, dt = 0.001;
var a1x, a1y, p1x, p1y, f1, td1;
var a2x, a2y, p2x, p2y, f2, td2;
var R = 400.0; 
var Ax = 0.0, Ay = R, Bx = R, By = 0.0;
var graph, gr;
var intId = window.setInterval(step, 1000 * dt);
var ns, setns = 100000;
var vis1 = true;

/* the plotting space is x=800 by y=800 but we need to move the plot which about (0,0)
   to the middle of this space.
   Note that the scaling is done by the amplitutde settings of the two pendulums
   globalAlpha is transparency
 */

function init() {
	graph = document.getElementById('graph');
	gr = graph.getContext('2d');
	gr.setTransform(1, 0, 0, 1, 400, 400);     
	gr.clearRect(-400, -400, graph.width, graph.height);
	gr.strokeStyle = "#2b3a5b";
	gr.lineWidth = 0.4;
	gr.globalAlpha = 0.8;
	t = 0.0; ns = setns;
	inputChange();
	swing();
}

function step() {
	gr.beginPath();
	gr.moveTo(x, y);
	for (var i = 0; i < s; ++i) {
		t += dt;
		swing();
		gr.lineTo(x, y);
	}
	gr.stroke();
	ns -= 1;
	if (ns <= 0) { window.clearInterval(intId); }
}

/* it is unlcear if this should be *PI+p, +PI+p or +PI*p  */ 

function swing() {
       var x1 = a1x * Math.exp (-t*td1) * Math.sin(2.0*f1*t*Math.PI+p1x);
       var x2 = a2x * Math.exp (-t*td2) * Math.sin(2.0*f2*t*Math.PI+p2x);
       x = x1 + x2;
       var y1 = a1y * Math.exp (-t*td1) * Math.sin(2.0*f1*t*Math.PI+p1y);
       var y2 = a2y * Math.exp (-t*td2) * Math.sin(2.0*f2*t*Math.PI+p2y);
       y = y1 + y2;


}

function startStop() {
	var stab = document.getElementById('startButton');
	if (intId == null) {
		intId = window.setInterval(step, 1000 * dt);
		stab.innerHTML = 'Stop';
	}
    else {
		window.clearInterval(intId);
		intId = null;
		stab.innerHTML = 'Start';
	}
}

function speed() {
	s = s*2;
	if (s > 128) { s = 1; };
	document.getElementById('spf').innerHTML = "&nbsp; " + s + "x"
 }

function showSettings() {
	if (vis1) { document.getElementById('settings').style.visibility = "hidden"; vis1 = false;}
	else { document.getElementById('settings').style.visibility = "visible"; vis1 = true;}
}

function read(id) {
	var input = document.getElementById(id);
	var value = input.value;
	var f = parseFloat(value);
	if (isNaN(f)) {
		input.className = 'error';
	} else {
		input.className = '';
	}
	return f;
}

function inputChange() {
	a1x = read('a1x');
	a1y = read('a1y');
	p1x = read('p1x') / 180.0 * Math.PI;
	p1y = read('p1y') / 180.0 * Math.PI;
	f1 = read('f1');
	td1 = read('td1');
	a2x = read('a2x');
	a2y = read('a2y');
	p2x = read('p2x') / 180.0 * Math.PI;
	p2y = read('p2y') / 180.0 * Math.PI;
	f2 = read('f2');
	td2 = read('td2');

}

