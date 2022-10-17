function myFunction(): void {
    const elements = document.querySelectorAll<HTMLElement>("#osm");
    //let elements = (document.getElementsByName("osm") as HTMLCollectionOf<HTMLDivElement>);
    console.log(elements);
    elements.forEach(element => {
        (console.log(element.getAttribute("osmid")));
    });
}

/*const osm = document.getElementsByName(
    'osm'
) as NodeListOf<HTMLElement>;

const nodes = document.querySelectorAll<HTMLElement>("#osm");

console.log("Get Nodes");
nodes.forEach(element => {
    console.log(element.getAttribute("osmid"));
});
*/


//myFunction()

class Main {
    nodes: NodeListOf<HTMLElement>;
    overpassturbo!: string;

    constructor() {
        this.nodes = document.querySelectorAll<HTMLElement>("#osm");
        this.getNodes();
        this.getOsmElement();
    }

    getNodes(){
        console.log("Get Nodes");
        this.nodes.forEach(element => {
            console.log(element.getAttribute("osmid")+" - "+element.getAttribute("icon"));
        });
    }

    getOsmElement(){
        var url = "https://overpass.osm.ch/api/interpreter?data=[out:json];(";
        this.nodes.forEach(element => {
            url += element.getAttribute("osmid")+";"; 
        });
        url += ");out tags;";
        this.overpassturbo = url;
        console.log(url);
        console.log(this.overpassturbo);
    }
}

let main = new Main();