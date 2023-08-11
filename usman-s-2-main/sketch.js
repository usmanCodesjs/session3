var splashimg
var gameState = "wait"
var playbutton, soundonbutton, soundoffbutton,obstacle
var bg1
var health = 300
var maxHealth = 400
var playerimg1
var score1 = 0

function preload() {
    splashimg = loadImage("assets/cyberChaser.gif")
    bgSound=loadSound("backgroundmusic.mp3")
    bg1 = loadImage("assets/gameBackground.jpg")

playeridle=loadImage("assets/player/eyeClosed.png")





}



function setup() {
    createCanvas(windowWidth, windowHeight)
    playbutton = createImg("play.png")
    playbutton.position(50, height/2)
    playbutton.size(150, 150)

    soundonbutton = createImg("sound.png")
    soundonbutton.position(width-200,height/2)
    soundonbutton.size(150, 150)
    soundonbutton.mouseClicked(mute)
    // soundonbutton.hide()


    soundoffbutton = createImg("mute.png")
    soundoffbutton.position(width-200,height/2)
    soundoffbutton.size(150,150)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)



    ground = createSprite(width / 1.5, height / 2)
    ground.addImage(bg1)
    ground.visible = false
    // ground.scale=2.6

    player = createSprite(width / 1.5, height / 2)
    player.addImage(playeridle)
    player.visible = false




}

function draw() {
    if (gameState === "wait") {
        if (!bgSound.isPlaying) {
            bgSound.play()
        }
        background(splashimg)
    }

    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        // background(level1bg)
        image(bg1, 0, 0, width * 4, height*2)
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()

        player.visible = true
        camera.x = player.x
        camera.y = player.y
        if (keyDown("RIGHT_ARROW")) {
            player.x += 2
        }

        if (keyDown("LEFT_ARROW")) {
            player.x -= 2
        }
        collectibles()

        if (keyDown("UP_ARROW")) {
            player.y -= 2
        }

        if (keyDown("DOWN_ARROW")) {
            player.y += 2
        }

    }
    drawSprites()

    if (gameState == "level1") {
        textSize(50)
        fill("yellow")
        stroke(255, 0, 0)
        strokeWeight(2)
        text("LEVEL 1", player.x - 100, player.y-300)
        healthlevel1()

    }

}


function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}

function healthlevel1(){
    stroke("gold");
    strokeWeight(7);
    noFill();
    rect(player.x+200, player.y-335, 200, 20);

    noStroke();
    fill("red");
    rect(player+200, 10, map(health, 0, maxHealth, 0, 200), 20);
}


function collectibles(){
    if(frameCount%200==0){
        rand=Math.round(random(height/4,height-100))
        obstacle=createSprite(width,rand)
        obstacle.velocityX=-2
    }
}
