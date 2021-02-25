function Snake()
{
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.update = function()
    {
        
        if(this.total === this.tail.length)
        {
            
            for(let i = 0; i < this.tail.length - 1; i++)
            {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x += (this.xspeed * scl);
        this.y += (this.yspeed * scl); 
        
        if(this.x > width - scl)
        {
            this.x = 0;
        }
        if(this.x < 0)
        {
            this.x = width - scl ;
        }
        if(this.y > height - scl)
        {
            this.y = 0;
        }
        if(this.y < 0 )
        {
            this.y = height - scl;
        }
        // this.x = constrain(this.x, 0, width - scl);
        // this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function(color)
    {
        for(let i = 0; i < this.tail.length; i++)
        {
            fill(color);
            noStroke();
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(40, 153, 34);
        stroke(1);
        rect(this.x, this.y, scl, scl);
    }

    this.dir = function(x , y)
    {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos)
    {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if( d < 1)
        {
            this.total++;
            return true;
        }
        else
        {
            return false;
        }
    }

    this.death = function()
    {
        for(let i = 0; i < this.tail.length; i++)
        {
            let position = this.tail[i];
            let distance = dist(this.x, this.y, position.x, position.y);
            if(distance < 1)
            {
                return true;
            }
        }
        return false;
    }
}