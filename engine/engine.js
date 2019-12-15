class Engine {
    constructor(width, height) {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");

        this.director = new Director();
        this.interface = new InterfaceManager();

        //store all sprites
        this.sprites = [];

        //for events
        this.mousePos = new Vector(0, 0);
        this.mouseDown = false;
        this.currentKey = 0;

        this.canvas.addEventListener("mousemove", (e) => {
            let rect = engine.canvas.getBoundingClientRect();
            let mousePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
            engine.mousePos = mousePos;
        });

        this.canvas.addEventListener("mousedown", (e) => {
            this.mouseDown = true;
        })

        this.canvas.addEventListener("mouseup", (e) => {
            this.mouseDown = false;
        })

        this.keyMap = [];

        document.addEventListener("keydown", (e) => {
            engine.keyMap[e.keyCode] = (e.type == "keydown");
        })

        document.addEventListener("keyup", (e) => {
            engine.keyMap[e.keyCode] = (e.type == "keydown");
        })
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    addElement(element) {
        this.interface.addElement(element);
    }

    runEvent(identifier) {
        this.director.addEvent(identifier);
    }

    loop() {
        //check all events
        this.checkEvents();
        //set black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);
        //render sprites
        for (let s of this.sprites) {
            if (s.active) {
                s.loop();
                s.render(this.ctx);
            }
        }
        //render interface
        this.interface.render(this.ctx);
    }

    checkEvents() {
        //for all events
        for (let j = 0; j < this.director.events.length; j++) {
            //for all sprites
            for (let i = 0; i < this.sprites.length; i++) {
                //for all sprite events
                for (let k = 0; k < this.sprites[i].events.length; k++) {
                    if (this.sprites[i].events[k].identifier == this.director.events[j]) {
                        this.sprites[i].events[k].func();
                        this.director.removeEvent(this.director.events[j]);
                    }
                }
            }
        }
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

    lerp(start, end, delta) {
        if (end > start) {
            if (start + delta > end) {
                return end;
            } else {
                return start + delta;
            }
        } else {
            if (start - delta < end) {
                return end;
            } else {
                return start - delta;
            }
        }

        return end;
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