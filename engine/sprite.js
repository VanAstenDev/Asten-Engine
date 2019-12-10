class Sprite {
    constructor(x, y, w, h) {
        this.pos = new Vector(x, y);
        this.w = w;
        this.h = h;

        this.scripts = [];
    }

    setTexture(image) {
        this.texture = image;
    }

    render(context) { //render
        let ctx = context;
        if (this.texture != undefined) {
            ctx.drawImage(this.texture, this.pos.x - this.w / 2, this.pos.y - this.h / 2, this.w, this.h);
        }
    }

    addScript(script) { //add a script 
        this.scripts.push(script);
    }

    loop() { //run all scripts
        for (let i = 0; i < this.scripts.length; i++) {
            this.scripts[i].loop();
        }
    }
}