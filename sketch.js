var play = 1;
var end = 0 ;
var gamestate = play;

var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var GameState = "play"

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(600, 600);
  
  //creating background
  background1 = createSprite(0,0,600,600);
  background1.addImage(backgroundImage);
  background1.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0 ;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
   
 
   RbGroup = new Group();
   BbGroup = new Group();
   PbGroup = new Group();
   GbGroup = new Group();
   ArrowGroup = new Group();
   
}

function draw() {
  

  // moving ground
    background1.velocityX = -3 
    
   
  
  if(gamestate === play)
  { if (background1.x < 0){
      background1.x = background1.width/2;
    }
     //moving bow
  bow.y = World.mouseY
   
  if (keyDown("space")) {
    var temp_arrow = createArrow();
    temp_arrow.addImage(arrowImage);
     temp_arrow.y = bow.y;
  }
   
    //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
   
    if(ArrowGroup.isTouching(RbGroup))
    {
      gamestate = end;
      RbGroup.destroyEach();
      ArrowGroup.destroyEach();
      score = score + 1;
    }
   
   if(ArrowGroup.isTouching(BbGroup))
    {
      gamestate = end;
      BbGroup.destroyEach();
      ArrowGroup.destroyEach();
      score = score + 1;
    }
   
   if(ArrowGroup.isTouching(GbGroup))
    {
      gamestate = end;
      GbGroup.destroyEach();
      ArrowGroup.destroyEach();
      score = score + 1;
    }
   
   if(ArrowGroup.isTouching(PbGroup))
    {
      gamestate = end;
      PbGroup.destroyEach();
      ArrowGroup.destroyEach();
      score = score + 1;
    }
   
   if(score === 5)
    {ArrowGroup.setVelocityXEach(0);
    RbGroup.setVelocityXEach(0);
    BbGroup.setVelocityXEach(0);
    GbGroup.setVelocityXEach(0);
    PbGroup.setVelocityXEach(0);
    background1.setVelocityXEach(0);
     
   
     gamestate =  end
    }
  }
 
  if(gamestate ===  end)
  {
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
    }
    
  
  drawSprites();
    text("Score: "+ score, 500,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  RbGroup.add(red);
  return red;
  }

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  BbGroup.add(blue);
  return blue;
  }

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  GbGroup.add(green);
  return green;   
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1;
  PbGroup.add (pink);
  return pink;
}

// Creating  arrows for bow
function createArrow() {
  arrow= createSprite(360, 100, 5, 10);
  arrow.addImage("arrow",arrowImage)
  arrow.velocityX = -6;
  arrow.scale = 0.3;
  ArrowGroup.add(arrow);
  return arrow;}

function reset(){
  gamestate = play;
  gameOver.visible = false;
  restart.visible = false;
  
   if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
}