(function(root){
  var S = root.S = (root.S || {});
  
  // var SnakeUI = S.SnakeUI = function(){
 //
 //  }
  
  var View = S.View = function($doc, $display){
    this.$display = $display;
    this.$doc = $doc;
    this.snake = new S.Snake();
    this.board = new S.Board(this.snake);
  };

  View.prototype.start = function(){
    var view = this;
    // view.$doc.on("keydown", function(){console.log("keydown");});
    view.$doc.on("keydown", view.handleKeyEvent.bind(view));
    this.intervalID = setInterval(view.step.bind(view), 500);
  };
  
  View.prototype.collision = function(){
    //wall collision
    var head = this.snake.segments[0];
    if(head.x < 0 || head.x >= this.board.dimensions ){
      return true;
    }
    else if( head.y < 0 || head.y >= this.board.dimensions){
      return true;
    }
    //self collision
    return this.snake.selfCollision();    
  };
  
  View.prototype.step = function(){
    if(this.collision()){
      alert("Gameover!");
      clearInterval(this.intervalID);
    }
    this.$display.html("<pre>" + this.board.render() + "</pre>");
    this.snake.move();
    this.board.checkEatApple();
  };
  
  View.prototype.handleKeyEvent = function(event){
    var key = event.keyCode;
    switch(key){
    case 38:
      this.snake.turn("N");
      break;
    case 40:
      this.snake.turn("S");
      break;
    case 37:
      this.snake.turn("W");
      break;
    case 39:
      this.snake.turn("E");
      break;
    }
  };
  

  
})(this);