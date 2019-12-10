const engine = new Engine(innerWidth, innerHeight);
let ctx = engine.getContext();

let sprite = new Sprite(10, 10, 32, 32);

sprite.vel = new Vector(10, 10);

//create and add texture "circleSprite.png" to sprite "sprite"
let spriteTexture = new Image();
spriteTexture.src = './CircleSprite.png';
spriteTexture.onload = ()=>{
    sprite.setTexture(spriteTexture);
}

sprite.setTexture(spriteTexture);

sprite.addScript(new Script(() => {
    sprite.pos.x += sprite.vel.x;
    sprite.pos.y += sprite.vel.y;

    if (sprite.pos.x > engine.canvas.width || sprite.pos.x < 0) {
        sprite.vel.x = -sprite.vel.x;
    }
    if (sprite.pos.y > engine.canvas.height || sprite.pos.y < 0) {
        sprite.vel.y = -sprite.vel.y;
    }
}))

function loop() {
    //loop
    window.requestAnimationFrame(loop);
    //set black background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);
    //update and render sprite
    sprite.loop();
    sprite.render(ctx);
}

loop();