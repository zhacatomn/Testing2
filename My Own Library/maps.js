var stage1 = new library.map_create({
    w: 3000,
    h: 600,
    x: 0,
    y: 0,
    id: "stage1",
    style: {
        "backgroundImage": "url('http://i.imgur.com/9GrCyut.png')"
    }
});
stage1.add_elements(function () {
    this.box1 = new library.create({
        x: 750,
        y: 100,
        w: 200,
        h: 75,
        id: "box1",
        text: "This is some text =)",
        style: {
            "backgroundColor": "lightgreen",
            "border": "1px solid black",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "font-family": "Roboto Condensed"
        }
    });
    this.box2 = new library.create({
        x: 0,
        y: 550,
        w: 50,
        h: 50,
        id: "box2",
        text: " ",
        style: {
            "backgroundColor": "lightblue",
            "border": "1px solid black",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "borderRadius": "100%",
            "z-index": "3"
        }
    });
    this.box3 = new library.create({
        x: 2000,
        y: 100,
        w: 250,
        h: 100,
        id: "box3",
        text: "a box in the middle of nowhere =)",
        style: {
            "backgroundColor": "#CA8787",
            "border": "1px solid black",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "font-family": "Agency FB",
            "color": "white"
        }
    });
    this.speed = 5;
    this.movX = -1;
    this.intial_y = this.box2.y;
    this.counter = 0;
    this.foo = 0;
});
var stage2 = new library.map_create({
    x: 0,
    y: 0,
    w: 3000,
    h: 600,
    id: "stage2",
    style: {
        "backgroundColor": "lightblue"
    }
});
stage2.add_elements(function () {
    this.box4 = new library.create({
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        text: "lol",
        id: "box4",
        style: {
            "font-size": "20px",
            "backgroundColor": "green",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "font-family": "Roboto Thin"
        }
    });
    this.speed = 5;
});
