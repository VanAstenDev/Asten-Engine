class Engine {
    constructor(width, height) {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");   
    }

    getContext() {
        return this.ctx;
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Script {
    constructor(func) {
        this.loop = func;
    }
}