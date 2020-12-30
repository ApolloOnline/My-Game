var backgroundImg, characterImg, obstaclesGroup, coinImg, coinGroup, coin
var PLAY = 1
var END = 2
var gameState = PLAY
var score=0

function preload(){
  backgroundImg=loadImage("images/background.jpg")

  characterImg=loadAnimation("images/c1.png", "images/c2.png", "images/c3.png", "images/c4.png", "images/c5.png")

  obstacle1=loadImage("images/circleObstacle.png")

  obstacle2=loadImage("images/squareObstacle.png")

  gameOverImg = loadImage("images/gameOver.png")
  
  restartImg = loadImage("images/restart.png")

  coinImg=loadAnimation("images/coin0.png", "images/coin1.png","images/coin2.png","images/coin3.png","images/coin4.png","images/coin5.png","images/coin6.png",)
}

function setup(){
  createCanvas(1670, 930)

   character = createSprite(845, 475, 20, 20)
  character.addAnimation("character", characterImg)
  character.scale = 0.50

  character.setCollider("rectangle",20,20, 150, 200)

   obstaclesGroup = new Group()

    coinGroup = new Group()

   gameOver = createSprite(800,300);
   gameOver.addImage(gameOverImg);
   
   gameOver.visible = false;
   
   
   restart = createSprite(800,400);
   restart.addImage(restartImg);
   
  restart.visible = false;

   gameOver.scale = 2;
   restart.scale = 1;

   wall1 = createSprite(5, 10, 5, 1900) 

}

function draw(){
  background(backgroundImg)

  textSize(30)
  text("score:" + score, 100, 100) 


if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;

  //spawn obstacles on the ground
  spawnObstacles();
  spawnCoins();
  
  if (keyDown(UP_ARROW)){
    character.y=character.y-5
  }
  if (keyDown(DOWN_ARROW)){
    character.y=character.y+5
  }
  if (keyDown(LEFT_ARROW)){
    character.x=character.x-5
  }
  if (keyDown(RIGHT_ARROW)){
    character.x=character.x+5
  }

  if(obstaclesGroup.isTouching(wall1)){
    obstacle.velocityX = 6

  }

  if (coinGroup.isTouching(character)){
    score=score+1
    coinGroup.destroyEach()
  }

if(obstaclesGroup.isTouching(character)){
      //trex.velocityY = -12;
      gameState = END;
    
  }


}

else if (gameState === END){
  gameOver.visible = true;
  restart.visible = true;

  character.velocityY = 0
  character.velocityX = 0

  obstaclesGroup.setLifetimeEach(-1);
character.destroy()
coinGroup.destroyEach()
obstaclesGroup.destroyEach()
  if(mousePressedOver(restart)) {
    reset();
}
}

  drawSprites()
}

function reset(){
  gameState = PLAY
  score=0
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
}
  
function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    
    obstacle.x=Math.round(random(100,1790 ))
    obstacle.y=Math.round(random(100,930 ))

    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale=0.25
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale=0.5
              break;
      default: break;

    }

    
    
   
    
    obstaclesGroup.add(obstacle)
    

  }
}

function spawnCoins() {
  if(frameCount % 100 === 0) {
     coin = createSprite(600,165,10,40);
    //obstacle.debug = true;
    
    coin.x=Math.round(random(100,1790 ))
    coin.y=Math.round(random(100,930 ))

    
    //generate random obstacles
    coin.addAnimation("coin", coinImg);
      coin.scale=0.25
      coinGroup.add(coin)
    }
  }
