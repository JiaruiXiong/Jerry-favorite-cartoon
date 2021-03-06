var AM = new AssetManager();

function Animation(spriteSheet,startX,startY,frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale,reverse) {
    this.spriteSheet = spriteSheet;  // sprite sheet
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;    // width for frame
    this.frameDuration = frameDuration; 
    this.frameHeight = frameHeight;   // height for frame
    this.sheetWidth = sheetWidth;      
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.reverse = reverse;
}

// Animation.prototype.drawFrame = function (tick, ctx, x, y) {
//     this.elapsedTime += tick;
//     if (this.isDone()) {
//         if (this.loop) this.elapsedTime = 0;
//     }
//     var frame = this.currentFrame();
//     var xindex = 0;
//     var yindex = 0;
//     xindex = frame % this.sheetWidth;
//     yindex = Math.floor(frame / this.sheetWidth);

//     ctx.drawImage(this.spriteSheet,
//                  xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
//                  this.frameWidth, this.frameHeight,
//                  x, y,
//                  this.frameWidth * this.scale,
//                  this.frameHeight * this.scale);
// }

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    // console.log("haha"+tick);
    this.elapsedTime += tick;

    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    }
    //  else if (this.isDone()) {
    //     return; // addd !!!!!
    // }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * this.scale,
                  this.frameHeight * this.scale);
}


Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}


// 完成了。
// background class
function Background(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 1024, 619, 5, 0.10, 20, true, 1,false);
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Background.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Background.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 20)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}

// //基本完成，需要调整位置。
// // Snorlax class
// function Snorlax(game, spritesheet) {
//     this.animation = new Animation(spritesheet,0,0, 570, 311, 5, 0.05, 97, true, 0.4,false);
//     this.x = 500;
//     this.y = 340;
//     this.speed = 0;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// Snorlax.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// Snorlax.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 6 / 97)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 1024) this.x = -230;
// }

// Dragonite class
function Dragonite(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 400, 300, 5, 0.04, 240, true, 0.4,false);
    this.x = 738;
    this.y = 300;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Dragonite.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Dragonite.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 6 / 240)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1024) this.x = -230;
}


// Squirtle class 
function Squirtle(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 500, 376, 5, 0.1, 15, true, 0.3,false);
    this.x = 106;
    this.y = 512;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Squirtle.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Squirtle.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 15)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1024) this.x = -230;
}

// Bulbasaur class 
function Bulbasaur(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 500, 300,2, 1, 2, true, 0.3,false);
    this.x = 835;
    this.y = 550;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Bulbasaur.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Bulbasaur.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 6 / 2)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1024) this.x = -230;
}


// Gengar class 
function Gengar(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 500, 469,5, 0.09, 13, true, 0.18,false);
    this.x = 8;
    this.y = 540;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Gengar.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Gengar.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 13)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1024) this.x = -230;
}

// Charmander class 
function Charmander(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 350, 233 ,5, 0.09, 31, true, 0.38,false);
    this.x = 380;
    this.y = 540;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Charmander.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Charmander.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 13)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1024) this.x = -230;
}





// Moltres class 
function Moltres(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 193, 194 ,5, 0.02, 97, true, 1,false);
    this.x = -100;
    this.y = 200;
    this.speed = -100;
    this.game = game;
    this.ctx = game.ctx;
}

Moltres.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}


Moltres.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 6 / 15);
        this.x -= this.game.clockTick * this.speed;
        this.y += this.game.clockTick * this.speed;
        if (this.y < -200) {
            this.y = 200;
            this.x = -100;
        }
}

function Charizard(game) {
    this.animation = new Animation(AM.getAsset("./img/charizard.png"),0,0, 327, 208 ,5, 0.09, 12, true,0.26,false);
    this.x = -50;
    this.y = 10;
    this.speed = 88;
    this.game = game;
    this.ctx = game.ctx;
}

Charizard.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}


Charizard.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 6 / 15);
        this.x += this.game.clockTick * this.speed;
        if (this.x > 1024) {
            this.x = -50;
        }
}






// Snorlax class
function Snorlax(game) {
    this.animation = new Animation(AM.getAsset("./img/snorlax.png"),0,0, 570, 311, 5, 0.05, 92, false, 0.4,false);
    this.kickingAnimation = new Animation(AM.getAsset("./img/snorlaxkicking.png"),0,0, 483, 311, 5, 0.15, 15, false, 0.38,false);
    
    this.x = -150;
    this.y = 340;
    this.speed = 0;
    this.game = game;
    this.ctx = game.ctx;
    this.rotation = false;
    
    this.kicking = true;
}

Snorlax.prototype.draw = function () {

    if (this.kicking) {
        this.kickingAnimation.drawFrame(this.game.clockTick,this.ctx, this.x, this.y);
        
    }
    else {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);
}

Snorlax.prototype.update = function () {
    // console.log("Here is update");
    if (this.rotation) {
        if (this.animation.isDone()) {
            this.animation.elapsedTime = 0;
            this.rotation = false;
            this.kicking = true;
            this.x += 124.5;  // 基本合格
            // console.log("done rotation");

        }
    }
    if (this.kicking) {
        if (this.kickingAnimation.isDone()) {
            this.kickingAnimation.elapsedTime = 0;
            this.rotation = true;
            this.kicking  = false;
            this.x += 71.75; // 基本合格
           
        }
    }
    if (this.x > 1024) this.x = -150;
    // console.log("Before calling update");
    Entity.prototype.update.call(this);
}





// Bird class 
function Bird(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 192, 192 ,5, 0.045, 26, true, 0.58,false);
    this.x = 1024;
    this.y = 170;
    this.speed = -83
    this.game = game;
    this.ctx = game.ctx;
}

Bird.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Bird.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 5)
        this.x += this.game.clockTick * this.speed;
        this.y += this.game.clockTick * (this.speed *0.12) ;
    if (this.x < -80){
        this.x = 1024;
        this.y = 170;
    }
}


// eevee class 
function Eevee(game, spritesheet) {
    this.animation = new Animation(spritesheet,0,0, 244,151,4, 0.11, 4, true, 0.45,false);
    this.x = -50;
    this.y = 475;
    this.speed = 40.5;
    this.game = game;
    this.ctx = game.ctx;
}

Eevee.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Eevee.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 5 / 7)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 1072){
        this.x = -50;
    }
}



// function Totoro(game) {
//     this.runningAnimation = new Animation(AM.getAsset("./img/totororunning.png"),0,0, 327, 208 ,5, 0.09, 12, true,0.26,false);
//     this.x = -50;
//     this.y = 10;
//     this.speed = 88;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// Totoro.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }


// Totoro.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 6 / 15);
//         this.x += this.game.clockTick * this.speed;
//         if (this.x > 1024) {
//             this.x = -50;
//         }
// }


function Totoro(game) {
    this.runningAnimation = new Animation(AM.getAsset("./img/totororunning.png"),0,0, 131.5, 131.5, 5, 0.04, 72, true, 1,false);
    this.animation = new Animation(AM.getAsset("./img/totorowalking.png"), 0,0,262, 262, 5, 0.04, 24, true, 0.5,false);
    this.x = 1024;
    this.y = 380;
    this.speed = -40;
    this.game = game;
    this.ctx = game.ctx;

    this.walking = true;
    this.running = false;
    // console.log("Where is my totoro");
}


Totoro.prototype.update = function() {
    if (this.x < 700 && this.x >=240) {
        console.log(this.x);
        this.x += this.game.clockTick * this.speed * 2.1;
        this.walking = false;
        this.running = true;
    }
    else {
        this.x += this.game.clockTick * this.speed;
        this.walking = true;
        this.running = false;
    }
    // this.x += this.game.clockTick * this.speed;
    if (this.x < -40) this.x = 1024;
    // console.log("Where is my totoro");
    Entity.prototype.update.call(this);
};

Totoro.prototype.draw = function() {
    // console.log("Where is my totoro");
    if (this.running) {
        this.runningAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    if(this.walking){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }

    Entity.prototype.draw.call(this);
};













AM.queueDownload("./img/totororunning.png");
AM.queueDownload("./img/totorowalking.png");

AM.queueDownload("./img/bird.png");
AM.queueDownload("./img/charizard.png");
AM.queueDownload("./img/dragonite.png");
AM.queueDownload("./img/snorlax.png");
AM.queueDownload("./img/snorlaxkicking.png");
AM.queueDownload("./img/bulbasaur.png");
AM.queueDownload("./img/gengar.png");
AM.queueDownload("./img/charmander.png");
AM.queueDownload("./img/squirtle.png");
AM.queueDownload("./img/moltres.png");
AM.queueDownload("./img/background.png");


AM.queueDownload("./img/eeveehaha.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();




    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));
    gameEngine.addEntity(new Charizard(gameEngine));
    gameEngine.addEntity(new Dragonite(gameEngine,AM.getAsset("./img/dragonite.png")));
    gameEngine.addEntity(new Snorlax(gameEngine));

    gameEngine.addEntity(new Totoro(gameEngine));
    gameEngine.addEntity(new Eevee(gameEngine, AM.getAsset("./img/eeveehaha.png")));
    // console.log("Where is my totoro");
    
    gameEngine.addEntity(new Squirtle(gameEngine,AM.getAsset("./img/squirtle.png")));
    gameEngine.addEntity(new Bulbasaur(gameEngine, AM.getAsset("./img/bulbasaur.png")));
    gameEngine.addEntity(new Gengar(gameEngine, AM.getAsset("./img/gengar.png")));
    gameEngine.addEntity(new Charmander(gameEngine, AM.getAsset("./img/charmander.png")));
    gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/bird.png")));
    gameEngine.addEntity(new Moltres(gameEngine, AM.getAsset("./img/moltres.png")));

    



    console.log("All Done!");
});

