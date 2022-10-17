interface OsmElement {
  type: string;
  id: number;
  tags: {
    name: string;
    opening_hours: string;
  };
}

class Main {
  nodes: NodeListOf<HTMLElement>;
  overpassturboUrl: string;
  overpassturboElements!: OsmElement[];

  constructor() {
    this.nodes = document.querySelectorAll<HTMLElement>("#osm");
    this.getNodes();
    this.overpassturboUrl = this.getOsmElement();
    console.log("overpass URL");
    console.log(this.overpassturboUrl);
    console.log("Fetch Overpass - constructor");
    this.fetchOverpassJson();
  }

  getNodes() {
    console.log("Get Nodes");
    this.nodes.forEach((element) => {
      console.log(
        element.getAttribute("osmid") + " - " + element.getAttribute("icon")
      );
    });
  }

  getOsmElement(): string {
    console.log("Start OSM Elements");
    var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
    this.nodes.forEach((element) => {
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
      .then((data) => (this.overpassturboElements = data["elements"]))
      .then(() => this.getOverpassJson());
  }

  getOverpassJson() {
    console.log("Response Overpass");
    console.log(this.overpassturboElements);
    this.overpassturboElements.forEach((data) => {
      console.log(data["type"]);
      console.log(data["id"]);
      console.log(data["tags"]["name"]);
      console.log(data["tags"]["opening_hours"]);
    });
  }
}

let main = new Main();
