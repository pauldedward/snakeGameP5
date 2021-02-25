
var food, bigFood;
var frame,s;
var eat, die, cling, drink;
var can, gap, col;
var w = 800;
var h = 600;
var scl = 20;
var axis = 1;
var points = 0;
var cols = Math.floor(w / scl);
var rows = Math.floor(h / scl);


function setup()
{
    col = color(214, 9, 12);
    eat = loadSound("../audio/eat.mp3");
    die = loadSound("../audio/gameover.mp3");
    cling = loadSound("../audio/cling.mp3");
    drink = loadSound("../audio/drink.mp3");
    can = createCanvas(w,h);
    can.parent("canvas");
    frameRate(10);
    s = new Snake();
    pickLocation();

    gap = setInterval(function()
    {
        frame = 0;
        bigFood = createVector(floor(random(cols)),floor(random(rows)));
        bigFood.mult(scl);
        if(cling.isPlaying())
        {
            cling.stop();
        }
        cling.play();   
    },10000);

}

function draw()
{
    background(247, 114, 57);
    s.update();
    s.show(60);

    if(s.death())
    {
        if(die.isPlaying())
        {
            die.stop();
        }
        die.play();
        clearInterval(gap);
        s.show(col);
        openModal();
        noLoop();
    }
    
    if(s.eat(food))
    {
        if(eat.isPlaying())
        {
            eat.stop();
        }
        eat.play();
        pickLocation();
        score.innerHTML = ++points;
    }
   
    fill(255, 0 ,100);
    stroke(1);
    rect(food.x,food.y, scl, scl);
    if(bigFood)
    {
        frame++;
        fill(242, 219, 12);
        rect(bigFood.x,bigFood.y, scl, scl);

        if(s.eat(bigFood))
        {
            if(drink.isPlaying())
            {
                drink.stop();
            }
            drink.play();
            bigFood = null;
            points = points + 10;
            score.innerHTML = points;
        } 
    }
    if(bigFood && frame > 40)
    {
        bigFood = null; 
    }
  
    
}

function pickLocation()
{
    food = createVector(floor(random(cols)),floor(random(rows)));
    food.mult(scl);
}

function keyPressed()
{
    if (keyCode === UP_ARROW && axis === 1)
    {
        s.dir(0, -1);
        axis = 0; 
    } else if (keyCode === DOWN_ARROW && axis === 1)
    {
        s.dir(0, 1);
        axis = 0; 
    } else if (keyCode === RIGHT_ARROW && axis === 0)
    {
        s.dir(1, 0);
        axis = 1; 
    } else if (keyCode === LEFT_ARROW && axis === 0)
    {
        s.dir(-1, 0);
        axis = 1; 
    }
}

function resetGame()
{
    points = 0;
    axis = 1;
    score.innerHTML = "0";
    s = new Snake();
    pickLocation();

    gap = setInterval(function()
    {
        frame = 0;
        bigFood = createVector(floor(random(cols)),floor(random(rows)));
        bigFood.mult(scl);
        if(cling.isPlaying())
        {
            cling.stop();
        }
        cling.play();   
    },10000);

    loop();
}