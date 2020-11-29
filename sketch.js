var dog, dogImg, happydog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happydog = loadImage("dogImg1.png");

  
}

function setup() {
	createCanvas(500,500);
  
  database = firebase.database();
  dog = createSprite(230,250, 50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46,139,87);
  if(keyWentDown("UP_ARROW")){
    writeStock(foodS);
    dog.addImage(happydog);
    dog.scale = 0.2;
  }
  drawSprites();
  
  fill('white');
  text("Food Stock : " + foodS, 400, 20);
  text("Note : Press the UP_ARROW key to feed the dog milk!", 130, 470);

}

function readStock(data){
   foodS = data.val();
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
   database.ref('/').update({
     food : x
   })
}

