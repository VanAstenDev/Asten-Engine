class InterfaceManager {
    constructor() {
        this.elements = [];
        this.maxElements = 50;
    }

    addElement(element) {
        if (this.elements.length < this.maxElements) {
            this.elements.push(element);
        } else {
            this.elements.splice(this.elements.length-1, 1);
            this.elements.push(element);
        }
    }

    render(context) {
        let ctx = context;
        for (let element of this.elements) {
            element.render(ctx);
        }
    }
}