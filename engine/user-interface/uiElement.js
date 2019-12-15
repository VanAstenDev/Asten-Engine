class UiElement {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.scale = 1;

        this.textElements = [];
    }

    addTexture(texture) {
        this.texture = texture;
    }

    addText(identifier, text, x, y, w, h, color, font) {
        let tel = {
            identifier: identifier,
            text: text,
            x: x,
            y: y,
            w: w,
            h: h,
            color: color,
            font: font
        }
        this.textElements.push(tel);
    }

    changeText(identifier, text) {
        for (let tel of this.textElements) {
            if (tel.identifier == identifier) {
                tel.text = text;
            }
        }
    }

    render(context) {
        let ctx = context;
        ctx.beginPath();
        if (this.texture) {
            ctx.drawImage(this.texture, this.x - this.w * this.scale / 2, this.y - this.h * this.scale / 2, this.w * this.scale, this.h * this.scale);
        }
        for (let i = 0; i < this.textElements.length; i++) {
            let tel = this.textElements[i];
            ctx.font = tel.h+"px "+tel.font;
            ctx.fillStyle = tel.color;
            ctx.fillText(tel.text, (this.x-(this.w * this.scale)/2) + tel.x, (this.y-(this.h * this.scale)/2) + tel.y, tel.w);
        }
    }
}