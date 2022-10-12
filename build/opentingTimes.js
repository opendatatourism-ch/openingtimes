"use strict";
function myFunction() {
    let elements = document.getElementsByName("osm");
    console.log(document.getElementsByTagName('osm'));
    elements.forEach(element => {
        (console.log(element.nodeValue));
    });
}
console.log('Now');
myFunction();
