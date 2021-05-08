//Create variables here
var dog;
var dog1;
var dog2;
var happyDog;
var database;
var foodS = 0;
var foodStock;
var feedDog;
var addFood;
var foodObj;
var lastFed;
function preload()
{
	//load images here
  dog1  = loadImage("images/dogImg.png");
  dog2 =  loadImage("images/dogImg1.png");
  
}

function setup() {
  
	createCanvas(900, 900);
  dog  = createSprite(300,200,50,50);
  dog.addImage(dog1);
  dog.scale  = 0.3;

  foodObj = new Food();
  
  database = firebase.database();

  foodStockref  = database.ref("foodStock");
  foodStockref.on("value", readStock    );

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
  
}
function readStock(data){
  foodS = data.val();

}


function draw() {  
  background(46,139,87);
  foodObj.display();
  fill("black");
  textSize(15);
  //text("Press Left Arrow To Feed" , 50,50);
  //text("Food Remaining:" + foodS , 100, 100 );

  fedTime = database.ref("feedTime");
  fedTime.on("value" , function(data){
    lastFed = data.val();
  })

  /*if(keyDown(LEFT_ARROW)){
    writeStock(foodS);
    dog.addImage(dog2);
    dog.scale  = 0.3;
}*/

if(lastFed>=12){
    text("Last Feed : " + lastFed%12 + "PM" , 350,30);
}
else if(lastFed == 0){
  text("lastFed : 12AM" , 350,30);
}
else{
  text("Last Feed : " + lastFed + "AM" , 350,30);
}


  drawSprites();
  //add styles here

}

function feedDog(){
  dog.addImage(dog2);
  var food = foodObj.getFoodStock();
if(food<=0){
  foodObj.updateFoodStock(0);
}
else{
  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
}
 
  database.ref("/").update({
    foodStock : foodObj.getFoodStock(),
    feedTime : hour()

  });
}

function addFood(){
  foodS++
  console.log(foodS)
  database.ref("/").update({
    foodStock : foodS
  })
}



