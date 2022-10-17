interface IndexOsm{
    type: string;
    id: number;
}
interface OsmElement {
    type: string;
    id: number;
    tags: {
        name: string;
        opening_hours: string;
    };
}

class OsmElement {
    index: string;
    type: string;
    id: number;
    name: string;
    opening_hours: string;

    constructor(type: string, id: number, name: string, opening_hours: string){
        this.index = type+"("+id+")";
        this.type = type;
        this.id = id;
        this.name = name;
        this.opening_hours = opening_hours;
    }
}

class Main {
    nodes: NodeListOf<HTMLElement>;
    overpassturboUrl: string;
    overpassturboElements!: OsmElement[];

    constructor() {
        this.nodes = document.querySelectorAll<HTMLElement>("#osm");
        this.getNodes();
        this.overpassturboUrl = this.getOverpassUrl();
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

    getOverpassUrl(): string {
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
            console.log(data["index"]);
            console.log(data["type"]);
            console.log(data["id"]);
            console.log(data["tags"]["name"]);
            console.log(data["tags"]["opening_hours"]);
            console.log(data);
        });
    }

    renderObjects() {
        let i = 0;
        console.log("Render Objects");
        this.nodes.forEach((element) => {
            console.log(i);
            console.log(element.getAttribute("osmid"));
            let osmidAttribut = element.getAttribute("osmid");
            let splitString = osmidAttribut?.split("(");
            if (splitString != null) {
                let osmtype = splitString[0];
                let osmid = Number(splitString[1].slice(0, -1));
                /*var object = this.getOsmElementbyTypeId(osmtype, osmid);
                const name = document.createElement("span");
                name.textContent = object["tags"]["name"];
                const id = object["type"] + "(" + object["id"] + ")";
                const htmlElement = document.querySelector('[osmid*="' + id + '"]');
                if (htmlElement != null) {
                    htmlElement.appendChild(name);
                }*/
            }
            i++;
        });
    }

    getOsmElementbyTypeId(type: string, id: number) {
        let i = 0;
        let index = null;
        //let element:OsmElement;
        this.overpassturboElements.forEach((data) => {
            if (data["type"] == type && data["id"] == id) {
                //element = this.overpassturboElements[i];
                index = i;
            }
            i++;
        });
        if (index != null) {
            return index;
        }
    }

    /*is_Open(inputString: string){
      let locale = navigator.language;
      let oh = new opening_hours(inputString, null, null);
      var is_open = oh.getState();
    }*/
}

let main = new Main();
