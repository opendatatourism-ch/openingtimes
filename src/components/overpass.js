class OpenstreetmapElement {
    name: string;
    opening_hours: string;
    constructor(){
        this.name = "TEST NAme";
        this.opening_hours = "Mo-Tu,Do-Fr 10:00-10:10; Samstag und Sonntag geschlossen";
    }

    is_open(s: string): void
    {
        let locale = navigator.language;
        let oh = new opening_hours(input_value, {}, { locale: locale });
        var is_open = oh.getState();
        this.is_open = is_open;
    }
}