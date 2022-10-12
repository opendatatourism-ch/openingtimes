"use strict";
function myFunction() {
    const elements = document.querySelectorAll("#osm");
    //let elements = (document.getElementsByName("osm") as HTMLCollectionOf<HTMLDivElement>);
    console.log(elements);
    elements.forEach(element => {
        (console.log(element.getAttribute("osmid")));
    });
}
const osm = document.getElementsByName('osm');
const nodes = document.querySelectorAll("#osm");
console.log(nodes);
myFunction();
