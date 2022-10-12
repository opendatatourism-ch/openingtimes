var elements = document.getElementById("osm");
console.log(elements.getAttribute("osmid"));
var osmid = elements.getAttribute("osmid");

var url =
  "https://overpass.osm.ch/api/interpreter?data=%5Bout%3Ajson%5D%3B%0A%28%0A%20%20" +
  osmid +
  "%3B%0A%29%3B%0Aout%20tags%3B";
fetch(url)
  .then((response) => response.json())
  .then((data) => render(data))
  .then((value) => getOpen(value))
  .then((value) => renderLinkIcon());

function getOpen(data) {
  let locale = navigator.language;
  let oh = new opening_hours(data, {}, { locale: locale });

  var is_open = oh.getState();
  return Promise.resolve(is_open);
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

let svg = document.createElement("svg");
//let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  style="fill: green;"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>';
let div = document.createElement("div");
div.textContent = "Services";

if (is_open == true) {
  let icon =
    "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z";
  let color = "green";
} else {
  let icon =
    "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z";
  let color = "red";
}

function renderLinkIcon(is_open) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );

  let icon = "";
  let color = "";

  if (is_open == true) {
    icon =
      "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z";
    color = "green";
  } else {
    icon =
      "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z";
    color = "red";
  }

  iconSvg.setAttribute("width", "24");
  iconSvg.setAttribute("height", "24");
  iconSvg.setAttribute("fill", color);
  iconSvg.setAttribute("viewBox", "0 0 24 24");

  iconPath.setAttribute("d", icon);

  iconSvg.appendChild(iconPath);
  var elements = document.getElementById("osm");
  elements.prepend(iconSvg);
  return elements.prepend(iconSvg);
}

//renderLinkIcon(elements);

//elements.appendChild(svg);

function render(data){
  console.log(data["elements"][0]["tags"]["name"]);
  const name = document.createElement('span');
  name.textContent = data["elements"][0]["tags"]["name"];
  var elements = document.getElementById("osm");
  elements.appendChild(name);
  return Promise.resolve(data["elements"][0]["tags"]["opening_hours"]);
}