
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var sscore;
var yeet = "Bananas eaten: ";

function preload(){
  
  //loading animations and images
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  //creating the monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;

  //creating the ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  //creating the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white")
  
  text (yeet + score, 10,10); //displaying bananas eaten
  
  //displaying survival time
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime: "+ survivalTime, 100,50);
  
  
  //reseting the ground if half crosses 0
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //stopping the monkey from falling down from gravity
  monkey.collide(ground);
  
  
  //causing the monkey to jump
  if(keyDown("space") && monkey.y >= 310){
   monkey.velocityY = -14; 
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(foodGroup.isTouching(monkey)){
   foodGroup.destroyEach(); 
    score = score +1;
  }
  
  food();
  
  oof();
  
  drawSprites()
}

function food(){
  if(frameCount % 70 === 0){
      
    //creating the banana with all its properties
      banana = createSprite(350,20,20,20);
      banana.x = Math.round (random(300,400));
      banana.y = Math.round (random(160,190));  
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -4;
      banana.lifetime = 330;
      //adding banana to group
      foodGroup.add(banana)
     }
}


function oof(){
  if(frameCount % 80 === 0){
   //creating obstacles with properites
    obstacle = createSprite(450,330,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime = 330;
    // adding obstacle to group
    obstacleGroup.add(obstacle);
  }
}




