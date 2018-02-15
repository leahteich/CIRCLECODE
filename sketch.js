var h; //xcoord
var k; //ycoord
var n; 
var key; // for keyPressed function
var a = 0; //polygon a
var inc; //increments for grid
var s; // output cartesian
var n; // output y-int
var f; // output x-int

var xspacing = 2;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var pause1 = false; 

function setup() {
	noFill();
	createCanvas(600,800);
	 slider = createSlider(0, 20, 0,.25);
	 slider.position(10, 10);
	 slider.style('600', '80px');
	 frameRate(100);

  	 dx = (TWO_PI / period) * xspacing;
     yvalues = new Array(floor(600/xspacing));

	 button = createButton('Save Canvas');
	 button.position(10,70);
	 button.mousePressed(imgSave);

	 buttontxt = createButton('Save Text'); //DOES NOT WORK TRY TO FIX!!
	 buttontxt.position(10,90);
	 buttontxt.mousePressed(txtSave);

	 areaP = createP("AREA:");
	 circumP = createP("CIRCUMFERENCE:");
	 radiusP = createP("RADIUS: ");
	 cartesianP = createP("CARTESIAN: ");
	 parametricP = createP("PARAMETRIC: ");
	 xIntP = createP("X-INTERCEPTS: ");
	 yIntP = createP("Y-INTERCEPTS: ");
	 centerP = createP("CENTER: ");
	 

	 centerP.position(600+10,0);
	 radiusP.position(600+10,30);
	 circumP.position(600+10,60);
	 areaP.position(600+10,90)
	 cartesianP.position(600+10,120);
	 parametricP.position(600+10,150);
	 xIntP.position(600+10,180);
	 yIntP.position(600+10,210);
}

function imgSave() {
	saveCanvas('circleProject','jpg')
}

function txtSave() {
	var txt = nf(centerP+radiusP+circumP+areaP+cartesianP+parametricP+xIntP+yIntP);
	var list = split(txt,' ');
	saveStrings(list,'textoutput.txt');
}

function grid() {
	var r = slider.value();
 	noFill();

 push();
	strokeWeight(1);
	stroke(100);
	for (var j = 0; j <= 600; j = j + 600/40) { //xlinesloop
		line(j,0,j,600);
	}
	for (var m = 0; m <= 600; m = m + 600/40) { //ylinesloop
		line(0,m,600,m);
	}
  pop();
  push();
 	strokeWeight(2);
 	rect(1,1,598,598); //black outline

	line(600/2,0,600/2,600);
	line(0,600/2,600,600/2);


	for (var xInc = 0; xInc <= 600; xInc = xInc + 1/8 * 600) {
		line(xInc,600/2+2,xInc,600/2-2);

	} 

	for (var yInc = 0; yInc <= 600; yInc = yInc + 1/8 * 600) {
		line(600/2+2,yInc,600/2-2,yInc);
	} 
   pop();

	push();

		textSize(10);
		stroke(0);

		for (inc = 5; inc <= 21; inc += 5) { //gridline increments by 5
			text(inc,600/2 + 15 * inc-6, 600/2);
			text(inc*-1,600/2 + 600/40 * inc*-1-8, 600/2);
			text(inc *-1,600/2+2,600/2 + 600/40 * inc);
			text(inc, 600/2+2+2, 600/2 + 600/40 * inc*-1+4);
		}

		text("0",600/2-8,600/2-2);
		text("0",600/2+2,600/2+9);

	pop();

}

function screenX(gridX) {
	return 600/2 + 600/40 * gridX;
}
function screenY(gridY) {
	return 600/2 - 600/40 * gridY;
}
function gridX(screenX) {
	return (screenX-600/2)/(600/40);
}
function gridY(screenY) {
	return (600/2-screenY)/(600/40);
}

function snapGrid() {
	if (h%1 != 0) { //snap to grid - need here or everything breaks for some reason
		if (h%1 > 1/2) {
			h = h + (1 - h%1);
		}
		else {
			h -= h%1;
		}
	}
	if (k%1 != 0) {
		if (k%1 > 1/2) {
			k = k + (1 - k%1);
		}
		else {
			k -= k%1;
		}
	}
}

function mouseClicked() {
	h = gridX(mouseX);
	k = gridY(mouseY);

	snapGrid();
	setEquations();



}

function drawCircle() {

	var r = slider.value();
	var y = nf(k + sqrt((r-h)*(r+h)),1,2); //two possible cases per intercept
	var otherY = nf(k - sqrt((r-h)*(r+h)),1,2);
	var x = nf(h + sqrt((r-k)*(r+k)),1,2);
	var otherX = nf(h - sqrt((r-k)*(r+k)),1,2);

	snapGrid();

push();
	noFill();
	stroke(0, 0, 56);
	strokeWeight(2);
 	polygon(screenX(h), screenY(k), r*15,80); //plot circle
pop();


	centerP.html("CENTER: ("+h+", "+k+")");

	fill(255,0,0);
	ellipse(screenX(h),screenY(k),9,9); //center of circle

push();
	fill(0,0,255);
	ellipse(screenX(0),screenY(y),8,8); //plotting points where (0,y)
	ellipse(screenX(0),screenY(otherY),8,8);
	ellipse(screenX(x),screenY(0),8,8); //(x,0)
	ellipse(screenX(otherX),screenY(0),8,8);
pop();

push();
	fill(255,0,0);
	strokeWeight(2);
	stroke(255,255,0);
 	text("("+0+", "+nf(y,1,2)+")", screenX(0)-20+35, screenY(y)-20+15,60,30);	
	text("("+0+", "+nf(otherY,1,2)+")", screenX(0)-20+35, screenY(otherY)+15-30+10,60,30)
	text("("+nf(x,1,2)+", "+0+")",screenX(x)+6,screenY(0),60,30);
	text("("+nf(otherX,1,2)+", "+0+")",screenX(otherX)-60+66,screenY(0),60,30);

pop();
push();
	fill(0);
	textStyle(BOLD);
	textSize(14);
	text(slider.value(),150,24);

pop();

push();
	fill(0);
	textSize(15);
	textStyle(BOLD);
	strokeWeight(4);
	stroke(0);
 	text("("+h+", "+k+")", screenX(h)+7, screenY(k),100,50);
pop();

push();
	fill(0)
	textSize(15);
	textStyle(BOLD);
	strokeWeight(3);
	stroke(255);
 	text("("+h+", "+k+")", screenX(h)+7, screenY(k),100,50);
pop();
}


function setEquations() {
	var h = gridX(mouseX), k = gridY(mouseY), r = slider.value();


	if (h%1 != 0) {
		if (h%1 > 1/2) {
			h = h + (1 - h%1); //snap - doesn't work entirely a little off with equations try to fix
		}
		else {
			h -= h%1;
		}
	}
	if (k%1 != 0) {
		if (k%1 > 1/2) {
			k = k + (1 - k%1);
		}
		else {
			k -= k%1;
		}
	} 

	var y = nf(k + sqrt((r-h)*(r+h)),1,2); //two possible cases per intercept
	var otherY = nf(k - sqrt((r-h)*(r+h)),1,2);
	var x = nf(h + sqrt((r-k)*(r+k)),1,2);
	var otherX = nf(h - sqrt((r-k)*(r+k)),1,2);
 if (h > 20 || k < -20) {
	alert("Please click on the graph!");

	}

else {
	if (h < 0) { //getting rid of double (-) sign in console.log
		var newK = k * -1; //gets rid of negative sign 
		var newH = h * -1; 

		if (k < 0) { //(-h,-k)
			 s = "CARTESIAN: (x+"+newH+")^2 + (y+"+newK+")^2 = "+nf(slider.value()*slider.value(),1,2);
		}
		else { //(-h,+k)
			 s = "CARTESIAN: (x+"+newH+")^2 + (y-"+k+")^2 = "+nf(slider.value()*slider.value(),1,2);
		}
	}

	else { 
		var newK = k * -1;
		var newH = h * -1;

		if (k < 0) { //(+h,-k)
		 s = "CARTESIAN: (x-"+h+")^2 + (y+"+newK+")^2 = "+nf(slider.value()*slider.value(),1,2);
		}

		else { //(+h,+k)
		 s = "CARTESIAN: (x-"+h+")^2 + (y-"+k+")^2 = "+nf(slider.value()*slider.value(),1,2);	
		}
	}

	if (h == 0 && k == 0) {
		s = "CARTESIAN: x^2 + y^2 = " + nf(slider.value()*slider.value(),1,2);
	}


	cartesianP.html(s);

	//x= h + r cos(t), y=k + r sin(t) 
	noFill(0);
	parametricP.html("PARAMETRIC: x = "+h+"+"+slider.value()+"cos(t), y = "+k+"+"+slider.value()+"sin(t)");
 
	if (y == "NaN.00") { //gets rid of NaN, replaces with -- 
		y = "--";
	}
	if (otherY == "NaN.00") { 
		otherY = "--";
	}
	if (x == "NaN.00") { 
		x = "--";
	}
	if (otherX == "NaN.00") { 
		otherX = "--";
	}

	if (x == otherX) {
		otherX = "--"; //tangent points
	}

	if (y == otherY) {
		otherY = "--"; 
	}

	if (y > 20) { //eliminates intercepts that are larger than 20 or less than -20
		//for example user making a really big circle and center near edge
		if (otherY < -20) {
			n = "Y-INTERCEPTS: -- and --";

		}
		else {
			n = "Y-INTERCEPTS: -- and "+otherY;
		}
	}
	else {
		if (otherY < -20) {
			n = "Y-INTERCEPTS:"+y+" and --";
		}
		else {
			n = "Y-INTERCEPTS: "+y+" and "+otherY;
		}
	}

	if (x > 20) {
		if (otherX < -20) {
			f ="X-INTERCEPTS: -- and --";

		}
		else {
			f = "X-INTERCEPTS: -- and "+otherX;
		}
	}
	else {
		if (otherX < -20) {
			f = "X-INTERCEPTS: "+x+" and --";
		}
		else {
			f = "X-INTERCEPTS: "+x+" and "+otherX;
		}
	}

 	areaP.html("AREA: "+ nf(PI*slider.value()*slider.value(),0,2));

	circumP.html("CIRCUMFERENCE: " + nf(PI*2*slider.value(),0,2));

	radiusP.html("RADIUS: " + nf(slider.value(),0,2));

	xIntP.html(f);
	yIntP.html(n);

	}
}


function draw() {
if (pause1 == true) return; //pauses sketch
background(251);
  grid();

  push();
	  strokeWeight(1);
	  stroke(96, 118, 155);
	  fill(198, 220, 255);
	  translate(screenX(h), screenY(k));
	  rotate(frameCount/75);
	  polygon(0, 0,1/2*slider.value()*30,n);
  pop();
  drawCircle();
  rightTriangle();

push();
  fill(255);
  rect(0,600,600,300);
pop();
  calcWave();
  renderWave();

}

function keyPressed() { //number of sides in the polygon
	var pause = false; //default is animation

	if (key == '2') 
		n = 2;
	else if (key == '3')
		n = 3;
	else if (key =='4')
		n = 4;
	else if (key =='5')
		n = 5;
	else if (key =='6')
		n = 6;
	else if (key =='7')
		n = 7;
	else if (key =='8')
		n = 8;
	else if (key =='9')
		n = 9;
	else if (key =='0')
		n = 1;
//////////////////////////////
	if (key==' ') {
		pause1 = !pause1; //changes pause boolean
		return false; //gets rid of weird scroll on chrome when spacebar used
	}
}

function rightTriangle() {

a+=.015;
push();
	textSize(20);
	textStyle(BOLD);
	fill(0)
	text(int((a * 57.2958 % 360 - 360) * -1),15,50);//degrees  

pop();

push();
	stroke(0, 0, 119);
	strokeWeight(1);
	fill(0,0,255);
	triangle(screenX(h), screenY(k), screenX(h) + cos(a) * slider.value()*30*1/2, screenY(k)+sin(a)*slider.value()*30*1/2,screenX(h) + cos(a) * slider.value()*30*1/2,screenY(k));
	//draws right triangle inside circle calculated using trig functions
pop();

push(); 
	fill(255,0,0);
	strokeWeight(1);
	ellipse(screenX(h), screenY(k),8,8);
	ellipse(screenX(h) + cos(a) * slider.value()*30*1/2, screenY(k)+sin(a)*slider.value()*30*1/2,8,8)
	ellipse(screenX(h) + cos(a) * slider.value()*30*1/2,screenY(k),8,8);
pop();
push();
	if (gridX(screenX(h) + cos(a) * slider.value()*15) != gridX(screenX(h))) { //eliminates extra point when r = 0
		textStyle(BOLD);
		strokeWeight(3)
		fill(255);
		stroke(255);
		text("("+nf(gridX(screenX(h) + cos(a) * slider.value()*15),2,2)+", " + nf(gridY(screenY(k)+sin(a)*slider.value()*15),2,2)+")",screenX(h) + cos(a) * slider.value()*15+5, screenY(k)+sin(a)*slider.value()*15+5);

	}
pop();

push();
	if (gridX(screenX(h) + cos(a) * slider.value()*15) != gridX(screenX(h))) { //eliminates extra point when r = 0
		textStyle(BOLD);
		fill(45, 0, 91);
		stroke(255,255,0);
		text("("+nf(gridX(screenX(h) + cos(a) * slider.value()*15),2,2)+", " + nf(gridY(screenY(k)+sin(a)*slider.value()*15),2,2)+")",screenX(h) + cos(a) * slider.value()*15+5, screenY(k)+sin(a)*slider.value()*15+5);

	}
pop();
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function calcWave() {
  theta += 0.02; 

  var x = theta;
  for (var i = 0; i < (yvalues.length); i++) {
    yvalues[i] = sin(x)*-75;
    x+=dx;
  }
}

function renderWave() {
  fill(255);
  r = slider.value();
  for (var x = 0; x < yvalues.length; x++) {
  	fill(1, 37, 99);
  	strokeWeight(0)
    ellipse(x*xspacing, (height/2+yvalues[x])+300, 3,3);

  }
}
