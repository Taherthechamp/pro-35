//Create variables here
var dog,dog_happy,foodS,foodStock;
var x=20;
var button1,button2,fedTime,lastFed;
var foodObj;
function preload()
{
  dog=loadImage("images/dogImg.png")
  dog_happy=loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);
  dogSprite=createSprite(300,300,50,50)
  dogSprite.scale=0.2
  dogSprite.addImage(dog);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food()

     button1=createButton("Feed the dog")
button1.position(600,100)
button1.mousePressed(feedDog);
 button2=createButton("Add food")
button2.position(700,100)
button2.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87)
foodObj.display()
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})


fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
       text("Last Feed : "+lastFed%12 + " PM",350,30)
   }else if(lastFed==0){
       text("Last Feed : 12 AM",350,30)
   }else{
       text("Last Feed : "+lastFed + " AM",350,30)
   }


  drawSprites();
}
  //add styles here
textSize(20)
fill("white")
text("Note: Press UP_ARROW Key To Feed Drago Milk",30,150);
text("Food Remaining:"+foodS,30,100)
console/console.log(foodS);


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
  }

  function writeStock(x){
    if(x<=0){
      x=0;
      textSize(15)
      fill("white")
    }else{
      x=x-1;
    }

    database.ref('/').update({
      Food:x
    })
  }

  function feedDog(){
    dogSprite.addImage(dog_happy);
    if(foodObj.getFoodStock()<= 0){
       foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
      }
      else{
         foodObj.updateFoodStock(foodObj.getFoodStock()-1);
         }
    
    database.ref('/').update({
Food:foodObj.getFoodStock(),
 fedTime:hour()
    })
}

function addFoods(){
    foodS++;
    database.ref('/').update({
        Food:foodS
    })
}