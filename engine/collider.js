class Collider {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.x = 0;
        this.y = 0;
    }

    test(x, y) {
        if (x >= this.x && x <= this.x+this.w) {
            if (y >= this.y && y <= this.y+this.h) {
                return true;
            }
        }
    }
}