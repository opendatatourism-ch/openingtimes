function getOpen(data) {
  let locale = navigator.language;
  let oh = new opening_hours(data, {}, { locale: locale });
  var is_open = oh.getState();
  console.log(is_open);
  return is_open;
}

let nodes = document.querySelectorAll("#openingTimes");
console.log("TEST");
console.log(nodes);
nodes.forEach((element) => {
  let opening_hourse = element.getAttribute("data-opening_hours");
  console.log(opening_hourse);
  let is_open = getOpen(opening_hourse);
  element.setAttribute("data-is_open",is_open);
});

var me = document.currentScript;
console.log("CurrentScript");
console.log(me);