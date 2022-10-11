var elements = document.getElementById("osm");
console.log(elements.getAttribute("osmid"));
var osmid = elements.getAttribute("osmid");

var url =
  "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%0A%28%0A%20%20"+osmid+"%3B%0A%29%3B%0Aout%20tags%3B";
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(getOpen(data["elements"][0]["tags"]["opening_hours"])));

function getOpen(input_value){
    let locale = navigator.language;
    let oh = new opening_hours(input_value, {}, { locale: locale });
    var is_open = oh.getState();
    return is_open;
}

// Input string (English and German mixed).
let input_value = "Mo-Tu,Do-Fr 10:00-10:10; Samstag und Sonntag geschlossen";

// Language for the warnings (get it from the browser settings).
let locale = navigator.language;

// Create opening_hours object.
let oh = new opening_hours(input_value, {}, { locale: locale });

// Prettify the value in different languages.
let prettified_value_de = oh.prettifyValue({ conf: { locale: "de" } });
let prettified_value_en = oh.prettifyValue({ conf: { locale: "en" } });

// Console outputs.
console.log("Input value (de en mixed): " + input_value);
console.log("Prettified value (de):     " + prettified_value_de);
console.log("Prettified value (en):     " + prettified_value_en);
console.log("Warnings:" + JSON.stringify(oh.getWarnings(), null, "  "));

var is_open = oh.getState();
console.log("Ist offen? " + is_open);

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

let svg = document.createElement('svg');
//svg.
