interface OsmElement {
    type: string;
    id: number;
    tags: {
        name: string;
        opening_hours: string;
    };
}

class OpenstreetmapElement {
    nodes: NodeListOf<HTMLElement>;
    overpassturboUrl: string;
    overpassturboElements!: OsmElement[];

    constructor() {
        this.nodes = document.querySelectorAll<HTMLElement>("#openingTimes");
        this.getNodes(); // Console.log
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
                element.getAttribute("data-osmid") + " - " + element.getAttribute("data-icon")
            );
        });
    }

    getOverpassUrl(): string {
        console.log("Start OSM Elements");
        var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
        this.nodes.forEach((element) => {
            url += element.getAttribute("data-osmid") + ";";
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
            console.log(data);
        });
        this.renderObjects();
    }

    renderObjects() {
        let i = 0;
        console.log("Render Objects");
        this.nodes.forEach((element) => {
            console.log(i);
            console.log(element.getAttribute("data-osmid"));
            console.log(element);
            let osmidAttribut = element.getAttribute("data-osmid");
            let splitString = osmidAttribut?.split("(");
            if (splitString != null) {
                let osmtype = splitString[0];
                let osmid = Number(splitString[1].slice(0, -1));
                var object = this.getOsmElementbyTypeId(osmtype, osmid);
                console.log("Objekt");
                console.log(object);
                if(object != null){
                    const name = document.createElement("span");
                    name.textContent = object["tags"]["name"];
                    const id = object["type"] + "(" + object["id"] + ")";
                    element.appendChild(name);
                    element.setAttribute("data-opening_hours",object["tags"]["opening_hours"]);
                }
            }
            i++;
        });
    }

    getOsmElementIndexbyTypeId(type: string, id: number) {
        const index = this.overpassturboElements.findIndex(el => el.id === id && el.type === type);
        return index;
    }

    getOsmElementbyTypeId(type: string, id: number) {
        const elment = this.overpassturboElements.find(el => el.id === id && el.type === type);
        return elment;
    }
}

let openstreetmapElement = new OpenstreetmapElement();
