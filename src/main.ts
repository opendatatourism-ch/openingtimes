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
    constructor() {
        this.nodes = document.querySelectorAll<HTMLElement>("#osm");
        this.getNodes();
    }

    getNodes(){
        console.log("Get Nodes");
        this.nodes.forEach(element => {
            console.log(element.getAttribute("osmid")+" - "+element.getAttribute("icon"));
        });
    }
    
}

let main = new Main();