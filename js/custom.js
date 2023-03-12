$(document).ready(function(){

	//Initialize Canvas to draw on
	var paper = new Raphael(document.getElementById('canvas_container'), 800, 500);
	//Offset to get to center of the circle
	var right_offset = 400;
	var top_offset = 250;
	//Radius of first circle to be drawn
	var base_radius = 20;
	var final_radius = 0;

	//Define function used to draw blank wheel of life
	function drawBlankWheel() {
		//Draw a series of circle in the center
		var dot = paper.circle(right_offset, top_offset, 1); //Center
		//5 circles, radius incrementing by 20
		for(var i = 0; i < 11; i++){
			final_radius = base_radius*i;
			paper.circle(right_offset, top_offset, final_radius);

		}
		//Divide circle into 8 section
		for(var i = 0; i < 9; i++){
			var x = Math.cos(i*Math.PI/4)*final_radius;
			var y = Math.sin(i*Math.PI/4)*final_radius;
			paper.path("M"+right_offset+" "+top_offset+" l " + x + ", " + y);
		}

		//Add Circle Labels
		var life_areas = $('.life_area');
		var life_area;
		for(var i = -2; i < 6; i++){
			var x = Math.cos(i*Math.PI/4 + Math.PI/8)*final_radius;
			var y = Math.sin(i*Math.PI/4 + Math.PI/8)*final_radius;
			
			life_area = $(life_areas[i+2]).text();
			paper.print(10, 50, "print", paper.getFont("Museo"), 30).attr({fill: "#fff"});
			if(i < 2){ //User first letter of the word as text anchor
				paper.text(right_offset + x*1.1, top_offset + y*1.1, life_area).attr({'text-anchor': 'start', 'fill': '#3D5C9D', 'font-size' : '15'});
			} else { //Else anchor on the end of the word
				paper.text(right_offset + x*1.1, top_offset + y*1.1, life_area).attr({'text-anchor': 'end', 'fill': '#3D5C9D', 'font-size' : '15'});
			}
		}
	}

	function updateWheel() {
		paper.clear();
		drawBlankWheel();
		var pathStrHave = "";
		var pathStrWant = "";
		$.each($('select.have'), function(key,value){
			key = key-2;
			var x = Math.cos(key*Math.PI/4 + Math.PI/8)*$(value).val()*base_radius;
			var y = Math.sin(key*Math.PI/4 + Math.PI/8)*$(value).val()*base_radius;
			x = right_offset+x;
			y = top_offset+y;
			paper.circle(x, y, 2).attr({fill: '#ddd', stroke: '#ddd', 'stroke-width': 1}); //Center
			if (key == -2){ //First data point, move there
				pathStrHave += "M "+x+" ,"+y; //Upper case L = absolute value
			} else { //All other data points, simply draw line ot next point
				pathStrHave += " L "+x+" ,"+y;
			}
			
		});
		$.each($('select.want'), function(key,value){
			key = key-2;
			var x = Math.cos(key*Math.PI/4 + Math.PI/8)*$(value).val()*base_radius;
			var y = Math.sin(key*Math.PI/4 + Math.PI/8)*$(value).val()*base_radius;
			x = right_offset+x;
			y = top_offset+y;
			paper.circle(x, y, 2).attr({fill: '#ddd',  stroke: '#ddd', 'stroke-width': 1}); //Center
			if (key == -2){ //First data point, move there
				pathStrWant += "M "+x+" ,"+y; //Upper case L = absolute value
			} else { //All other data points, simply draw line ot next point
				pathStrWant += " L "+x+" ,"+y;
			}
			
		});
		pathStrHave += " z";
		pathStrWant += " z";
		console.log(pathStrHave);
		console.log(pathStrWant);
		paper.path(pathStrHave).attr({fill: '#f6b26b', opacity: .6, stroke: '#e69138', 'stroke-width': 2});
		paper.path(pathStrWant).attr({fill: '#93c47d', opacity: .6, stroke: '#6aa84f', 'stroke-width': 2});
	}
	//Draw the wheel for the first time
	drawBlankWheel();
	//Generate Wheel Click Listener
	$('#generate_wheel').click(function(){
		updateWheel();
		return false;
	});

	$('select').change(function() {
		updateWheel();
	});
})