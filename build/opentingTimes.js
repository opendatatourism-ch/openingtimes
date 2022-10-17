"use strict";
function myFunction() {
    const elements = document.querySelectorAll("#osm");
    //let elements = (document.getElementsByName("osm") as HTMLCollectionOf<HTMLDivElement>);
    console.log(elements);
    elements.forEach(element => {
        (console.log(element.getAttribute("osmid")));
    });
}
/*const osm = document.getElementsByName(
    'osm'
) as NodeListOf<HTMLElement>;

const nodes = document.querySelectorAll<HTMLElement>("#osm");

console.log("Get Nodes");
nodes.forEach(element => {
    console.log(element.getAttribute("osmid"));
});
*/
//myFunction()
class Main {
    constructor() {
        this.nodes = document.querySelectorAll("#osm");
        this.getNodes();
    }
    getNodes() {
        console.log("Get Nodes");
        this.nodes.forEach(element => {
            console.log(element.getAttribute("osmid") + " - " + element.getAttribute("icon"));
        });
    }
}
let main = new Main();
class Render {
    constructor() {
        console.log("Render.js");
    }
}
let render = new Render();
