
var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climberGroup;
var frog, frogImg;
var PLAY = 1
var score = 0;
var End=0;
var gamestate=1;

function preload()
{
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(400,600);
  ocean = createSprite(200,450);
  ocean.addImage(oceanImg);
  frog = createSprite(200,300,50,50);
  frog.scale = 0.1;
  frog.addAnimation("frog", frogImg);  
   //ocean.debug=true;
   //frog.debug=true;
  //create coin group and climber group
  coinGroup=new Group();
  climberGroup=new Group();
}

function draw()
{
  drawSprites();
  textSize(20);
  fill(255);
  text("score is" + score, 200,150);
  //background(0);
  
  if(ocean.y>400)
  {
    ocean.y=300;
  }
  spawnCoin();
  spawnClimber();
  
   text("Press space to start the game",100,180);
  if (keyDown('space'))
  {
  frog.velocityY=-1;
  frog.velocityX=0;
  gamestate=1;
  }

  if (gamestate==PLAY) 
  {
    if(frog.isTouching(climberGroup))
   {
   frog.velocityY=0;
   frog.velocityX=0;
   climber.velocitY=0;
   climber.velocitX=0;
   }
   if(frog.isTouching(coinGroup))
   {
   score=score+1;
   coin.destroy();
   }
   }
  if(frog.velocityY>=2)
  {
    gamestate=0;
  }
  if (gamestate==End)
  {
    ocean.velocitY=0;
    frog.x=200;
    frog.y=300;
    frog.scale=.6;
    text("game over",200,400);
    coinGroup.destroyEach();
    climberGroup.destroyEach();

  }

  
}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 80 === 0) {
    //make the x position of the coin and climber the same
   coin=createSprite(Math.round(200,300),40,10,10);
   coin.addImage(coinImg);
   coin.velocityY=1;
   coin.scale=.1
   coin.lifetime=200;
   coinGroup.add(coin)
     }
    }

function spawnClimber() {
  
  if (frameCount %200 === 0) {
    //make the x position of the coin and climber the same
   climber=createSprite(Math.round(200,300),40,10,10);
   climber.addImage(climberImg);
   climber.scale=.1
   climber.velocityY=2;
   climber.lifetime=200;
     climberGroup.add(climber);
  }
}

