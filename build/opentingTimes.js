"use strict";
class Main {
    constructor() {
        this.nodes = document.querySelectorAll("#osm");
        this.getNodes();
        this.overpassturboUrl = this.getOsmElement();
        console.log("overpass URL");
        console.log(this.overpassturboUrl);
        console.log("Fetch Overpass - constructor");
        this.fetchOverpassJson();
    }
    getNodes() {
        console.log("Get Nodes");
        this.nodes.forEach(element => {
            console.log(element.getAttribute("osmid") + " - " + element.getAttribute("icon"));
        });
    }
    getOsmElement() {
        console.log("Start OSM Elements");
        var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
        this.nodes.forEach(element => {
            url += element.getAttribute("osmid") + ";";
        });
        url += ");out tags;";
        this.overpassturboUrl = url;
        return url;
    }
    fetchOverpassJson() {
        console.log("Fetch Overpass - Method");
        fetch(this.overpassturboUrl)
            .then((response) => response.json())
            .then((data) => this.overpassturboElements = data['elements'])
            .then(() => this.getOverpassJson());
    }
    getOverpassJson() {
        console.log("Response Overpass");
        console.log(this.overpassturboElements);
        this.overpassturboElements.forEach(data => {
            console.log(data['type']);
            console.log(data['id']);
            console.log(data['tags']['name']);
            console.log(data['tags']['opening_hours']);
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
