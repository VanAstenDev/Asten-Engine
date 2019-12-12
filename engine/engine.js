class Engine {
    constructor(width, height) {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        //for events
        this.mousePos = new Vector(0, 0);
        this.currentKey = 0;

        this.canvas.addEventListener("mousemove", (e) => {
            let rect = engine.canvas.getBoundingClientRect();
            let mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
            engine.mousePos = mousePos;
        });

        this.keyMap = [];

        document.addEventListener("keydown", (e)=>{
            engine.keyMap[e.keyCode] = (e.type == "keydown");
        })

        document.addEventListener("keyup", (e)=>{
            engine.keyMap[e.keyCode] = (e.type == "keydown");
        })
    }

    loop() {
        //set black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);
    }

    getKey(code) {
        return this.keyMap[code];
    }

    setMousePos(event) {
        if (this.mousePos) {
            this.mousePos.x = event.clientX;
            this.mousePos.y = event.clientY;
        }
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