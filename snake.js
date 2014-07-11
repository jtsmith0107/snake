(function(root){
  var S = root.S = (root.S || {});
  
  var Snake = S.Snake = function(){
    this.dir = "E";
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
    switch(snake.dir){
      case "N": 
        newHead = snake.segments[0].plus(0,-1);
        break;
      case "E": 
        newHead = snake.segments[0].plus(1,0);
        break;
      case "S": 
        newHead = snake.segments[0].plus(0,1);
        break;
      case "W": 
        newHead = snake.segments[0].plus(-1,0);
        break;
        
    }
    
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
    this.dir = newDir;
  };
  
  var Coord = S.Coord = function(x, y){
    this.x = x;
    this.y = y;
  };
  
  Coord.prototype.atPos = function(x,y){
    return this.x ===  x && this.y === y;
  };
  
  Coord.prototype.plus = function(dx, dy){
    return new Coord(this.x + dx, this.y + dy);
  };
  
  var Board = S.Board = function(snake){
    this.snake = snake;
    this.apples = [new Coord(1,2)];
    this.dimensions = 10; 
    this.grid = new Array(this.dimensions);
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
    debugger;
    if (apple !== false){
      this.snake.justAteApple = true;
      this.apples.splice(this.apples.indexOf(apple),1);
    }
  };
  
  Board.prototype.render = function() {
    for(var i = 0; i < this.dimensions; i++){
      this.grid[i] = "";
      for(var j = 0; j< this.dimensions; j++){
        if(this.hasApple(j,i)){
          this.grid[i] += "A";
        }
        else if(this.snake.hasSegment(j,i)){
          this.grid[i] += "X";
        }
        else {
          this.grid[i] += ".";
        }
      }
    }
    return this.grid.join("\n");
  };
  
})(this);