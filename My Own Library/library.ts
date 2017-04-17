function update(){
		stopRecurring = true;
		currentMap.run.call(currentMap);
		library.update();

		requestAnimationFrame(function(){update.call(currentMap)});
}

let camera = document.getElementById("screen"); //link to the screen
let currentMapDIV; //linking to the current map container
let currentMap;
let stopRecurring = false;
let map = {
	set value(v : string) {
		this._value = v; //change value of map

		//check if the id aligns with one of the maps
		for(var i = 0; i < mapContainer.length; i++){
			if(mapContainer[i].id == this._value){ //identify which map

				currentMapDIV = document.getElementById(mapContainer[i].id); //set current map div to the new map
				currentMap = mapContainer[i]; //set currentMap to the new map

				for(var i = 0; i < mapContainer.length; i++){
					document.getElementById(mapContainer[i].id).style.display = "none"; //set all map to have no display
				}
				currentMapDIV.style.display = "inline"; //set only current map to have a display

				if(!stopRecurring) update(); //run the update function (only once so that the functions do not overlap)
			}
		}
	}
	,get value(){
		return this._value;
	}
}


let mapContainer = [];

let keyDown = [];

window.addEventListener("keydown", function(e) {
	keyDown[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
	keyDown[e.keyCode] = false;
});

namespace library{

	export class map_create{
		w:number;
		h:number;
		id:string;
		x:number;
		y:number;
		style;

		objectContainer =[];

		constructor(object){

			this.w = object.w;
			this.h = object.h;
			this.x = object.x;
			this.y = object.y;
			this.id = object.id;
			this.style = object.style;

			camera.innerHTML += "<div id = '" + this.id + "'></div>";

			let created = document.getElementById(this.id);
			for(var i in object.style){
				created.style[i] = object.style[i];
			}

			created.style.position = "absolute";
			created.style.width = this.w + "px";
			created.style.height = this.h + "px";
			created.style.left = this.x + "px";
			created.style.top = this.y + "px";

			mapContainer.push(this);
		}

		add_elements = (elements) => {
			let prev_container = currentMapDIV;
			let prev_map = currentMap;
			currentMapDIV = document.getElementById(this.id);
			currentMap = this;

			elements.call(this);
			currentMapDIV = prev_container;
			currentMap = prev_map;
		}

		run = (new_run) => {
			this.run = new_run;
		}
	}

	export class create{
		x:number;	
		y:number;
		w:number;
		h:number;
		id:string;
		style;

		constructor(object){

			//setting x, y, id and style
			this.x = object.x;
			this.y = object.y;
			this.w = object.w;
			this.h = object.h;

			this.id = object.id;
			this.style = object.style;

			//creating the div
			currentMapDIV.innerHTML += "<div id = '"+ this.id + "'></div>";

			let created = document.getElementById(this.id);

			//style object
			for(var i in object.style){
				created.style[i] = object.style[i];
			}

			//setting position and text of objects
			created.style.position = "absolute";
			created.style.left = this.x + "px";
			created.style.top = this.y + "px";
			created.style.width = this.w + "px";
			created.style.height = this.h + "px";
			created.innerHTML = object.content;

			//store all te objects in an array
			currentMap.objectContainer.push(this);
		}
	}

	export function update(){
		for(var i = 0; i < currentMap.objectContainer.length; i++){
			let updating = document.getElementById(currentMap.objectContainer[i].id);

			//change x and y positions
			updating.style.left = currentMap.objectContainer[i].x + "px";
			updating.style.top = currentMap.objectContainer[i].y + "px";
			updating.style.width = currentMap.objectContainer[i].w + "px";
			updating.style.height = currentMap.objectContainer[i].h + "px";

			//change the style
			for(var k in currentMap.objectContainer[i].style){
				updating.style[k] = currentMap.objectContainer[i].style[k];
			}
		}

		//change x and y positions
		currentMapDIV.style.left = currentMap.x + "px";
		currentMapDIV.style.top =currentMap.y + "px";
		
	}

	export function collide(obj1, obj2){

		let foo1 = obj1;
		let foo2 = obj2;

		for(var i=0; i<2; i++){
			if(foo1.x >= foo2.x && foo1.x <= foo2.x + foo2.w || //check if the width is colliding with the other width
			foo1.x + foo1.w >= foo2.x && foo1.x + foo1.w <= foo2.x + foo2.w){
				if(foo1.y >= foo2.y && foo1.y <= foo2.y + foo2.h || //check if the height is colliding with the other height
				foo1.y + foo1.h >= foo2.y && foo1.y + foo1.h <= foo2.y + foo2.h){
					return true;
				}
			}

			foo1 = obj2;
			foo2 = obj1;
		}

		return false;

	}

	export function keyPress(x:number){

		if(keyDown[x])return true;
		
		else return false;
	}

	export function trajectory(x:number, angle:number, intialV:number){ 

		let radToDeg = Math.PI/180;

		let result = (x * Math.tan(angle * radToDeg)) - ((9.80 * Math.pow(x , 2)) / 
			(2 * Math.pow(intialV, 2) * Math.pow(Math.cos(angle * radToDeg) , 2)));

		if(result > 0)return result;
		else return 0;
	}
}

