function myFunction(): void {
    const elements = document.querySelectorAll<HTMLElement>("#osm");
    //let elements = (document.getElementsByName("osm") as HTMLCollectionOf<HTMLDivElement>);
    console.log(elements);
    elements.forEach(element => {
        (console.log(element.getAttribute("osmid")));
    });
}

const osm = document.getElementsByName(
    'osm'
) as NodeListOf<HTMLElement>;

const nodes = document.querySelectorAll<HTMLElement>("#osm");

console.log(nodes);

myFunction()