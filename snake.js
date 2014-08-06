(function(root){
  var S = root.S = (root.S || {});
  
  var Snake = S.Snake = function(){
    this.dir = [1,0];
    this.segments = [
    new Coord(0,0),
    new Coord(0,1),
    new Coord(0,2),
    new Coord(0,3),
    new Coord(0,4)
    ];
    this.justAteApple = false;
  };
  
  Snake.prototype.hasSegment = function(x,y){
    var hasSeg = false;
    this.segments.forEach(function(coord){
      if(coord.atPos(x,y)){
        hasSeg = true;
      }
    });
    return hasSeg;
  };
  // Snake.DIR = ["N", "E", "S", "W"];
  
  Snake.prototype.move = function(){
    var newHead;
    var snake = this;
    
    newHead = snake.segments[0].plus(snake.dir);
    // switch(snake.dir){
    //   case "N":
    //     newHead = snake.segments[0].plus(0,-1);
    //     break;
    //   case "E":
    //     newHead = snake.segments[0].plus(1,0);
    //     break;
    //   case "S":
    //     newHead = snake.segments[0].plus(0,1);
    //     break;
    //   case "W":
    //     newHead = snake.segments[0].plus(-1,0);
    //     break;
    //
    // }
    snake.segments.unshift(newHead);
    if (this.justAteApple) {
      this.justAteApple = false;
    } else {
      snake.segments.pop();
    }
  };
  
  Snake.prototype.selfCollision = function(){
    var head = this.segments[0];
    var collision = false;
    this.segments.slice(1).forEach(function(coord){
      if(coord.atPos(head.x,head.y)){
        collision = true;
      }
    });    
    return collision;
  };
  
  Snake.prototype.turn = function(newDir){
    var oppDir = false;
    for(var i = 0; i < newDir.length; i++){
      if(this.dir[i] === newDir[i] * -1){
        oppDir = true
      }
    }
    if(!oppDir){ // [0,1]
      this.dir = newDir;
    }
  };
  
  var Coord = S.Coord = function(x, y){
    this.x = x;
    this.y = y;
  };
  
  Coord.prototype.atPos = function(x,y){
    return this.x ===  x && this.y === y;
  };
  
  Coord.prototype.plus = function(dir){
    return new Coord(this.x + dir[0], this.y + dir[1]);
  };
  
  var Board = S.Board = function(snake, ctx){
    this.snake = snake;
    this.apples = [new Coord(3,4)];
    this.dimensions = 25; 
    this.grid = new Array(this.dimensions);
    this.tileLength = 20
    this.ctx = ctx
    ctx.fillStyle = 'red';
    var board = this;
    _.each(this.snake.segments, function(segment){
      ctx.fillRect(segment.x * board.tileLength, segment.y * board.tileLength, 
         board.tileLength, board.tileLength);
    });
    
  };
  
  Board.prototype.hasApple = function(x,y){
    var hasA = false;
    var board = this;
    board.apples.forEach(function(coord){
      if(coord.atPos(x,y)){
        hasA = board.apples.indexOf(coord);
      }
    });
    return hasA;
  };
  
  Board.prototype.checkEatApple = function(){
    var head = this.snake.segments[0];
    var apple = this.hasApple(head.x, head.y);
    if(apple){
      this.snake.justAteApple = true;
      var x = Math.floor(Math.random()*this.board.tileLength);
      var y = Math.floor(Math.random()*this.board.tileLength);
      var newApple = new Coord(x,y);

      this.apples << newApple
    }
  };
  
  Board.prototype.renderTail = function(){
    var head = this.snake.segments[0];
    var apple = this.hasApple(head.x, head.y);
    if (apple === false){  
      var tail = this.snake.segments.slice(-1)[0];
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect( tail.x * this.tileLength, tail.y * this.tileLength, 
         this.tileLength, this.tileLength);
      this.apples.splice(this.apples.indexOf(apple),1);
    }
  };
  
  Board.prototype.renderHead = function() {

    var board = this;
    this.apples.forEach(function(apple){
      console.log("x : " + apple.x + " y: " + apple.y);
      board.ctx.fillStyle = 'green';
      board.ctx.fillRect(apple.x * board.tileLength + 1, apple.y * board.tileLength + 1, 
         board.tileLength, board.tileLength);
    });
    var head = this.snake.segments[0];
    // console.log("x : " + head.x + " y: " + head.y);

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(head.x * this.tileLength, head.y * this.tileLength, 
       this.tileLength, this.tileLength);
       


       // this.grid[i] += ".";
    //
    // for(var i = 0; i < this.dimensions; i++){
    //   this.grid[i] = "";
    //   for(var j = 0; j< this.dimensions; j++){
    //     if(this.hasApple(j,i)){
    //
    //       this.grid[i] += "A";
    //     }
    //     else if(this.snake.hasSegment(j,i)){
    //
    //
    //       this.grid[i] += "X";
    //     }
    //     else {
    //
    //     }
    //   }
    // }
    // return this.grid.join("\n");
  };
  
})(this);