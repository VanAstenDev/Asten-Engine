class Sprite {
    constructor(x, y, w, h) {
        this.pos = new Vector(x, y);
        this.w = w;
        this.h = h;

        this.active = 1;

        this.scripts = [];

        this.animated = 0;
        this.timer = 0;

        this.drawCollider = 0;

        this.scale = 1;

        this.events = [];
    }

    setTexture(image) {
        this.texture = image;
    }

    setTextureSheet(image, animSpeed) {
        this.animated = 1;
        this.texture = image;

        this.animationSpeed = animSpeed;

        this.totalFrames = this.texture.width / this.w;
        this.currentFrame = 0;
    }

    onEvent(identifier, func) {
        let event = {
            identifier: identifier,
            func: func
        }
        this.events.push(event);
    }

    render(context) { //render
        let ctx = context;
        ctx.beginPath();
        if (this.texture) {
            if (this.animated) {
                this.timer++;
                if (this.timer >= this.animationSpeed) {
                    this.currentFrame++;
                    this.timer = 0;
                    if (this.currentFrame >= this.totalFrames) {
                        this.currentFrame = 0;
                    }
                }

                let sx = this.currentFrame * this.w;
                ctx.drawImage(this.texture, sx, 0, this.w, this.h, this.pos.x - (this.w*this.scale)/2, this.pos.y - (this.h*this.scale)/2, this.w*this.scale, this.h*this.scale);
            } else {
                ctx.drawImage(this.texture, this.pos.x - this.w*this.scale / 2, this.pos.y - this.h*this.scale / 2, this.w*this.scale, this.h*this.scale);
            }
        }

        //draw collider
        if (this.collider && this.drawCollider) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.rect(this.collider.x, this.collider.y, this.collider.w, this.collider.h);
            ctx.stroke();
        }
    }

    addScript(script) { //add a script 
        this.scripts.push(script);
    }

    addCollider() {
        let c = new Collider(this.w*this.scale, this.h*this.scale);
        this.collider = c;
    }

    setScale(scale) {
        this.scale = scale;
        if (this.collider) {
            this.addCollider();
        }
    }

    loop() { //run all scripts
        //update collider
        if (this.collider) {
            this.collider.x = this.pos.x - this.w*this.scale/2;
            this.collider.y = this.pos.y - this.h*this.scale/2;
        }

        for (let i = 0; i < this.scripts.length; i++) {
            this.scripts[i].loop();
        }
    }
}