var monkey, monkeyanimation;

var obstacle, obstacleImage, obstacleGroup;

var banana, bananaImage, bananaGroup;

var ground;

var score = 0;

var food = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;
function preload(){
  monkeyAnimation = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  bananaImage = loadImage("banana.png");
}

function setup(){
  createCanvas(400,400);
  
  ground = createSprite(200,380,400,10);
  ground.scale = 1;
  ground.shapeColor = "black";
  if(ground.x < 0){
    ground.x = 50;
  }
  
  monkey = createSprite(30,350,10,10);
  monkey.addAnimation("walk", monkeyAnimation);
  monkey.scale = 0.1;

  
  obstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw(){
  background("grey");
  stroke("red");
  text("SurvivalTime "+score,20,20);
  text("Food: "+food, 20,40);
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
  }
  score = Math.round(frameCount/60);
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    food = food +1;
    bananaGroup.destroyEach();
  }
  if(gameState === PLAY){
    spawnObstacles();
    spawnClouds();
    if(monkey.isTouching(obstaclesGroup)){
    gameState = END;
    }
  }
  if(gameState === END){
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(450,360,10,40);
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  if (frameCount % 150 === 0) {
    banana = createSprite(450,100,40,10);
      banana.y = Math.round(random(50,100));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -5;
    banana.lifetime = 200;
    
    banana.depth = banana.depth;
    monkey.depth = banana.depth + 1;
    
    bananaGroup.add(banana);
    }
}