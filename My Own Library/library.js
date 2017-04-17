"use strict";
var container = document.getElementsByClassName("container")[0];
var objectContainer = [];
var library;
(function (library) {
    var create = (function () {
        function create(object) {
            //setting x, y, id and style
            this.x = object.x;
            this.y = object.y;
            this.w = object.w;
            this.h = object.h;
            this.id = object.id;
            this.style = object.style;
            //creating the div
            container.innerHTML += "<div id = '" + this.id + "'></div>";
            var created = document.getElementById(this.id);
            //style object
            for (var i in object.style) {
                created.style[i] = object.style[i];
            }
            //setting position and text of objects
            created.style.position = "absolute";
            created.style.left = this.x + "px";
            created.style.top = this.y + "px";
            created.style.width = this.w + "px";
            created.style.height = this.h + "px";
            created.innerHTML = object.text;
            //store all te objects in an array
            objectContainer.push(this);
        }
        return create;
    }());
    library.create = create;
    function update() {
        for (var i = 0; i < objectContainer.length; i++) {
            var updating = document.getElementById(objectContainer[i].id);
            //change x and y positions
            updating.style.left = objectContainer[i].x + "px";
            updating.style.top = objectContainer[i].y + "px";
            updating.style.width = objectContainer[i].w + "px";
            updating.style.height = objectContainer[i].h + "px";
            //change the style
            for (var k in objectContainer[i].style) {
                updating.style[k] = objectContainer[i].style[k];
            }
        }
    }
    library.update = update;
})(library = exports.library || (exports.library = {}));
