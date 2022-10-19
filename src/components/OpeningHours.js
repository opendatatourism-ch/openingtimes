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
console.log(nodes.childNodes);
const list = nodes.childNodes;
list.forEach((element) => {
  let opening_hourse = elements.getAttribute("data-opening_hours");
  let is_open = getOpen(opening_hourse);
  element.setAttribute("data-is_open",is_open);
});
