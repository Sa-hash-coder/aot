var eren,eren1
var bgImg;
var erenImg,erenJump,erenFall;
var bg;
var invisibleGround;
var gamestate=-2;
var bannerImg;
var start;
var startImg;
var erenMove
var mons1Move,monsterGroup;
var score=0;
var nextButton,next;
var livesGroup;
var story1;

function preload(){
 nextButton=loadImage("images/next.png")
 story2=loadImage("images/ajukta.jpg")
 story=loadImage("images/front.jpg");
 bannerImg=loadImage("images/banner img.jpg");
 bgImg=loadImage("images/bg 2.png")
 erenImg=loadAnimation("images/eren/erenStand.png");
 erenMove=loadAnimation("images/eren/eren running 2.png","images/eren/eren running.png");
 startImg=loadImage("images/start.png")
 mons1Move=loadAnimation("images/mons 2/mons 2 running 1.png","images/mons 2/mons 2 standing.png");
 erenJump=loadAnimation("images/eren/eren jumping 1.png","images/eren/eren jump 2.png","images/eren/eren jump3.png")
 erenFall=loadAnimation("images/eren/erenFalling.png")
 livesImg=loadImage("images/lives.png")
 flyMons=loadImage("images/fly mons.png")
}

  
function setup(){
    createCanvas(1000,600);
   if(gamestate===-2){
       story1=createSprite(500,300)
        story1.addImage("1",story);
       
    }
   
    vid = createVideo(
        ['sounds/starting.mp4'],
        vidLoad 
      );
    
      vid.size(width -200, 0);

    

   if(gamestate===0){
  
      
    bg=createSprite(500,300)
    bg.addImage("bg",bgImg);
    
    bg.visible=false;
    eren=createSprite(120,500);
    eren1=createSprite(120,500);
    eren1.visible=false;
    eren.visible=false;
    eren.addAnimation("eren Stand",erenImg);
    eren1.addAnimation("eren move",erenMove);
    eren1.addAnimation("eren jump",erenJump);
    
    

    eren1.scale=1.3;

    invisibleGround=createSprite(500,550,1000,10)
    invisibleGround.visible=false;

    start=createSprite(600,600)
   start.addImage("start",startImg);
  
    
   }
   monsterGroup=new Group();
   livesGroup=new Group();
   storyn=createSprite(500,300);
   storyn.addImage("2",story2);
   storyn.visible=false;

  next=createSprite(900,100);
   next.addImage("n",nextButton)
   next.debug=true;

   
}


function draw(){
if(gamestate===-2){
    if(keyDown("ENTER")){
       gamestate=-1
    }}
    if(gamestate===-1){
        vid.size(800, 600);
        vid.x=500;
        vidLoad();
    }
    
    // story 1 & story 2  gs -2
    // gs -1 play video
    
    if(mousePressedOver(next)){

        story1.visible=false;
        storyn.visible=true;
        storyn.scale=0.5;
    }

    if (gamestate===0){
      // story1.destroy();
       next.destroy();
        start.visible=true;
        storyn.visible=false;
        background(bannerImg);
      
      
       if(mousePressedOver(start)){
           gamestate=1;
       }
        
    }
    if (gamestate===1){
    
    bg.visible=true;
    eren.visible=true;
    start.visible=false;
    move();
    eren.collide(invisibleGround);
    lives();
   // textSize=30;
   //text("PRESS RIGHT ARROW TO PLAY",300,300)
   
  
}

if(gamestate===2){
    eren.visible=false;
    eren1.visible=true;
    eren1.changeAnimation("eren move",erenMove)
    bg.velocityX=-4;
    monster1();
    monster2();
    if(bg.x<=370){
        bg.x=500;
    }
    jump();
    move();

    lives();
    
    frameRate(10);
    eren1.collide(invisibleGround);
    if(eren1.isTouching(monsterGroup)){
       livesGroup[livesGroup.length-1].destroy();
    }
}
//console.log(eren1.y);
drawSprites();
text(mouseX+","+mouseY,mouseX,mouseY)

}

function vidLoad() {

    vid.loop();
    vid.volume(0.5);
  }


function jump(){
   
    if(keyDown("UP_ARROW") && eren1.y>300){
        //frameRate(1);
        eren1.velocityY=-6;
        eren1.changeAnimation("eren jump",erenJump);
    }
    eren1.velocityY=eren1.velocityY+0.8;
    // if(eren1.y=50){
     //   eren1.addAnimation("eren fall",erenFall);
      //   eren1.changeAnimation("eren fall",erenFall)
     //}

}
   

function move(){
    if(keyDown("RIGHT_ARROW")){
        gamestate=2;
    }
}

function monster1(){
    if(frameCount%60===0){
    monster=createSprite(1000,500);
    monster.velocityX=-8;
    monster.addAnimation("monster",mons1Move);
    monster.scale=1.9
    monster.debug=true;
    //monster.changeAnimation("monster",mons1Move);
     monsterGroup.lifetime=250;
     monsterGroup.add(monster);
    }
}

function monster2(){
     if(frameCount%70===0){
         mons2=createSprite(1000,random(50,400));
         mons2.addImage("mons",flyMons);
         mons2.scale=0.8;
         mons2.velocityX=-15;
        mons2.lifetime=250;
  //       monsterGroup.add(mons2)
     }

}

function lives(){
    for(var i=1;i<=3;i++){
    live=createSprite((100+20)*i,100)
    live.addImage("live",livesImg)
    live.scale=0.1;
    livesGroup.add(live);
    }
    
    
    
}

