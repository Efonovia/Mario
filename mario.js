let platformSrc = "platform.png";
let smallPlatformSrc = "platformSmallTall.png"
let backgroundSrc = "background.png";
let hillsSrc = "hills.png";
let spriteRunLeft = "spriteRunleft.png";
let spriteRunRight = "spriteRunRight.png";
let spriteStandRight = "spriteStandRight.png";
let spriteStandLeft = "spriteStandLeft.png";
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576; 
let goingDown = true;
const gravity = 0.5;

class Player {
    constructor() {
        this.speed = 10;
        this.position = {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width =  66;
        this.height = 150;
        this.image = createImage(spriteStandRight);
        this.frames = 0; 
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66,
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 341,
                width: 127.875,
            }
        }

        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 177;
    }

    draw() {
        c.drawImage(
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth, 
            400,
            this.position.x, 
            this.position.y, 
            this.width,
            this.height,
            );
    }

    update() {
        this.frames++;
        if(
            this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)
            ) {
            this.frames = 0
        } else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0;
        }
        
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity; 
            goingDown = false
        } else {
            // this.velocity.y = 0;
            goingDown = true;
        }
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y,
            
        }

        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }

    draw() {
        c.fillStyle = "blue";
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

class GenericObject {
  constructor({x, y, image}) {
      this.position = {
          x,
          y,
          image,
      }

      this.width = image.width;
      this.height = image.height;
      this.image = image;
  }

  draw() {
      c.fillStyle = "blue";
      c.drawImage(this.image, this.position.x, this.position.y);
  }

}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

function checkPlatformCollision(plat) {
    if(
        player.position.y + player.height <= plat.position.y
        && player.position.y + player.height + player.velocity.y >= plat.position.y 
        && player.position.x + player.width >= plat.position.x
        && player.position.x + player.width <= plat.position.x + plat.image.width + 100
    ) {
        player.velocity.y = 0;
        goingDown = true;
    }
}


let platformWidth = 577;
let lastKey;
let platformImage = createImage(platformSrc);
let smallPlatformImage = createImage(smallPlatformSrc);
    let player = new Player();
    console.log(player.width, player.position.x);
    let genericObjects = [
        new GenericObject({
            x: 0, 
            y: 0, 
            image: createImage(backgroundSrc)
        }),
        new GenericObject({
            x: 0, 
            y: 0, 
            image: createImage(hillsSrc)
        }),
    ]
    let scrollOffset = 0;
    let platform1;
    let platform2;
    let platform3;
    let platform4;
    let smallPlatform1;
    let platform5;
    let platform6;

function init() {
    platformImage = createImage(platformSrc);
    player = new Player();
    platform1 = new Platform({
                    x: -1, 
                    y: 470, 
                    image: platformImage,
                });
    platform2 = new Platform({
                    x: 577, 
                    y: 470, 
                    image: platformImage,
                });

    platform3 = new Platform({
                    x: (platformWidth * 3) - 300 , 
                    y: 470, 
                    image: platformImage,
                });

    platform4 = new Platform({
                    x: (platformWidth * 4) - 300,
                    y: 470, 
                    image: platformImage,
                });

    smallPlatform1 = new Platform({
                        x: (200),
                        y: 160,
                        image: smallPlatformImage
                    });

    platform5 = new Platform({
                        x: (platformWidth * 6) + 300,
                        y: 470,
                        image: platformImage
                    });
            
    platform6 = new Platform({
                        x: (platformWidth * 7) + 300,
                        y: 470,
                        image: platformImage
                    });

    genericObjects = [
    new GenericObject({
        x: 0, 
        y: 0, 
        image: createImage(backgroundSrc)
    }),
    new GenericObject({
        x: 0, 
        y: 0, 
        image: createImage(hillsSrc)
    }),
]
    scrollOffset = 0;
}
    const keys = {
        up: {
            pressed: false,
        },
        right: {
            pressed: false,
        },
        left: {
            pressed: false,
        },
        down: {
            pressed: false,
        }
    }


let x = 1;
function animate() {
    requestAnimationFrame(animate);
    x++
    console.log(x);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    genericObjects.forEach((genericObject) => {
        genericObject.draw();
    });
    platform1.draw();  //here
    platform2.draw();  //here
    platform3.draw();
    platform4.draw();
    smallPlatform1.draw();
    platform5.draw();
    platform6.draw();
    //   platform7.draw();
    //   platform8.draw();
    //   platform9.draw();
    //   platform10.draw();
    //   platform11.draw();
    //   platform12.draw();
    //   platform13.draw();
    //   platform14.draw();
    //   platform15.draw();
    //   platform16.draw();

  
    
    player.update();
    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if(
        (keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0) || (keys.right.pressed && scrollOffset > 16000)
        ) {
        player.velocity.x = -player.speed;
    } else{
        player.velocity.x = 0;

        if(keys.right.pressed) {
                scrollOffset += player.speed;
                platform1.position.x -= player.speed;  //here
                platform2.position.x -= player.speed;
                platform3.position.x -= player.speed;
                platform4.position.x -= player.speed;
                smallPlatform1.position.x -= player.speed;
                platform5.position.x -= player.speed;
                platform6.position.x -= player.speed;
        
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66;
            });
            
        } else if(keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed;
                platform1.position.x += player.speed;  //here
                platform2.position.x += player.speed;
                platform3.position.x += player.speed;
                platform4.position.x += player.speed;
                smallPlatform1.position.x += player.speed;
                platform5.position.x += player.speed;
                platform6.position.x += player.speed;
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x += player.speed * 0.66;
            });
        }
    }

    // if ((keys.right.pressed && scrollOffset > 1200)) {
    //     console.log("limit");
    //     player.velocity.x = -player.speed;
    //     // player.position.x = 1200;
    // }

    //PLATFORM COLLISION DETECTION here
        checkPlatformCollision(platform1);
        checkPlatformCollision(platform2);
        checkPlatformCollision(platform3);
        checkPlatformCollision(platform4);
        checkPlatformCollision(smallPlatform1);
        checkPlatformCollision(platform5);
        checkPlatformCollision(platform6);

    
        //SPRITE SWITCHING
    if(
        keys.right.pressed && lastKey === "right" && player.currentSprite !== player.sprites.run.right
        ) {
        player.frames = 1;
        player.currentSprite = player.sprites.run.right;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if(
        keys.left.pressed && lastKey === "left" && player.currentSprite !==  player.sprites.run.left
        ) {
        player.currentSprite = player.sprites.run.left;
        player.currentCropWidth = player.sprites.run.cropWidth;
        player.width = player.sprites.run.width;
    } else if(
        !keys.left.pressed && lastKey === "left" && player.currentSprite !==  player.sprites.stand.left
        ) {
        player.currentSprite = player.sprites.stand.left;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    } else if(
        !keys.right.pressed && lastKey === "right" && player.currentSprite !==  player.sprites.stand.right
        ) {
        player.currentSprite = player.sprites.stand.right;
        player.currentCropWidth = player.sprites.stand.cropWidth;
        player.width = player.sprites.stand.width;
    }
    // WIN
    console.log(scrollOffset);
    if(scrollOffset > 16000) {
        console.log("you win");
    }

    //LOSE
    if(player.position.y > canvas.height) {
        init();
    }
    
}

init();
animate();



window.addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:    //LEFT
            keys.left.pressed = true; 
            lastKey = "left";    
            break;
        case 68:    //RIGHT
            keys.right.pressed = true; 
            lastKey = "right";      
            break;
        case 87:    //UP
            keys.up.pressed = true; 
            if(goingDown) {
                player.velocity.y -= 15; 
            }        
            break; 
    }
});

window.addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:    //LEFT
            keys.left.pressed = false;          
            break;
        case 68:    //RIGHT
            keys.right.pressed = false; 
            break;
        case 87:    //UP
            keys.up.pressed = false;
            break; 
    }
});


