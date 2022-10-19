"use strict";
class OpenstreetmapElement {
    constructor() {
        this.nodes = document.querySelectorAll("#openingTimes");
        //this.getNodes(); // Console.log
        this.overpassturboUrl = this.getOverpassUrl();
        this.fetchOverpassJson();
    }
    getNodes() {
        console.log("Get Nodes");
        this.nodes.forEach((element) => {
            console.log(element.getAttribute("data-osmid") +
                " - " +
                element.getAttribute("data-icon"));
        });
    }
    getOverpassUrl() {
        var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
        this.nodes.forEach((element) => {
            url += element.getAttribute("data-osmid") + ";";
        });
        url += ");out tags;";
        this.overpassturboUrl = url;
        return url;
    }
    fetchOverpassJson() {
        fetch(this.overpassturboUrl)
            .then((response) => response.json())
            .then((data) => (this.overpassturboElements = data["elements"]))
            .then(() => this.renderObjects());
    }
    getOverpassJson() {
        console.log("Response Overpass");
        console.log(this.overpassturboElements);
        this.overpassturboElements.forEach((data) => {
            console.log(data["type"]);
            console.log(data["id"]);
            console.log(data["tags"]["name"]);
            console.log(data["tags"]["opening_hours"]);
            console.log(data);
        });
        this.renderObjects();
    }
    renderObjects() {
        let i = 0;
        console.log("Render Objects");
        this.nodes.forEach((element) => {
            let osmidAttribut = element.getAttribute("data-osmid");
            let splitString = osmidAttribut === null || osmidAttribut === void 0 ? void 0 : osmidAttribut.split("(");
            if (splitString != null) {
                let osmtype = splitString[0];
                let osmid = Number(splitString[1].slice(0, -1));
                var object = this.getOsmElementbyTypeId(osmtype, osmid);
                if (object != null) {
                    const name = document.createElement("span");
                    name.textContent = object["tags"]["name"];
                    const id = object["type"] + "(" + object["id"] + ")";
                    element.appendChild(name);
                    element.setAttribute("data-opening_hours", object["tags"]["opening_hours"]);
                    let is_open = this.getOpen(object["tags"]["opening_hours"]);
                    element.setAttribute("data-is_open", is_open);
                    this.setOpenIcon(element, is_open);
                }
            }
            i++;
        });
    }
    getOsmElementIndexbyTypeId(type, id) {
        const index = this.overpassturboElements.findIndex((el) => el.id === id && el.type === type);
        return index;
    }
    getOsmElementbyTypeId(type, id) {
        const elment = this.overpassturboElements.find((el) => el.id === id && el.type === type);
        return elment;
    }
    getOpen(value) {
        let locale = navigator.language;
        // @ts-ignore
        let oh = new opening_hours(value, {}, { locale: locale });
        var is_open = oh.getState();
        console.log(is_open);
        return is_open;
    }
    setOpenIcon(element, open) {
        const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let icon = "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z";
        let color = "rgb(187, 187, 1)";
        if (open == true) {
            icon =
                "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z";
            color = "green";
        }
        else {
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
        element.prepend(iconSvg);
    }
}
class Render {
    constructor() {
        console.log("Render.js");
    }
}
let render = new Render();
// @ts-ignore
let openstreetmapElement = new OpenstreetmapElement();
