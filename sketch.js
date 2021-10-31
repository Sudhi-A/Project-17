
var monkey , monkey_running,monkey_collided
var banana,bananaImage,obstacle,obstacleImage
var foodGroup,stoneGroup
var score,ground
var SurvivalTime
var gameState=PLAY
var PLAY=1
var END=0

function preload(){
  
  
  monkey_running = loadAnimation           ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided=loadImage("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 foodGroup=new Group()
  stoneGroup=new Group()
}



function setup() {
createCanvas(670,400) 
  score=0
  SurvivalTime=0
monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  monkey.debug=true
  ground=createSprite(0,400,1500,10)
  ground.velocityX=-4
 
  
  
}


function draw() {
  background("green")
 
  if(ground.x<0){
    ground.x=ground.width/2
  }
if(keyDown("space")&&monkey.y>230) {
        monkey.velocityY = -7;
    }
    

  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground)
  if(World.frameCount%200===0){
    fruits()
  }
  if(World.frameCount%300===0){
    Stones()
  }
if(monkey.isTouching(foodGroup)){
  foodGroup.destroyEach()
  score=score+1

}
  if(monkey.isTouching(stoneGroup)){
    gameState=END
  }
  if(gameState===END){
    foodGroup.destroyEach()
    text("GAME OVER",200,200)
    ground.velocityX=0
    stoneGroup.destroyEach() 
    stoneGroup.velocityX=0
    monkey.changeAnimation(monkey_collided)
  }
 drawSprites();
  fill("white")
  text("Score: "+score,500,50)
  
  fill("black")
  var SurvivalTime=Math.round(getFrameRate()/1)
  text("Survival Time:"+SurvivalTime,350,50)
}

function fruits(){
 banana=createSprite(670,Math.round(random(170,230)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-4
  foodGroup.add(banana)
    
    
    
}
function Stones(){
 obstacle=createSprite(670,380,10,10)
  obstacle.addImage(obstaceImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  stoneGroup.add(obstacle)
}