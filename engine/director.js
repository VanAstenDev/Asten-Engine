class Director {
    constructor() {
        this.events = [];
    }

    addEvent(identifier) {
        this.events.push(identifier);
    }

    removeEvent(identifier) {
        for (let i = this.events.length; i >= 0; i--) {
            if (this.events[i] == identifier) {
                this.events.splice(i, 1);
            }
        }
    }
}