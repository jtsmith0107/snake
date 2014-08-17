(function(root){
  var S = root.S = (root.S || {});
  
  // var SnakeUI = S.SnakeUI = function(){
 //
 //  }
  
  var View = S.View = function(ctx){
    this.ctx = ctx.getContext("2d");

    this.snake = new S.Snake();
    this.board = new S.Board(this.snake, this.ctx);
  };

  View.prototype.start = function(){
    var view = this;
    // view.$doc.on("keydown", function(){console.log("keydown");});
    // view.$doc.on("keydown", view.handleKeyEvent.bind(view));
    key('w', function(){
      view.snake.turn([0,-1]);
     });
     key('s', function(){
      view.snake.turn([0, 1]);
     });
     key('a', function(){
       view.snake.turn([-1, 0]);
     });
     key('d', function(){
      view.snake.turn([1, 0]);
     });
    view.intervalID = setInterval(view.step.bind(view), 70);
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

    this.board.checkEatApple()
    
    // this.$display.html("<pre>" + this.board.render() + "</pre>");
    this.board.renderTail();
    this.snake.move();
    this.board.renderHead();
    if(this.collision()){
      alert("Gameover!\n Your score was " + this.snake.segments.length);
      clearInterval(this.intervalID);
    }
    // this.board.checkEatApple();
  };
    
})(this);