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
      view.snake.turn([-1,0]);
     });
     key('s', function(){
      view.snake.turn([1, 0]);
     });
     key('a', function(){
       view.snake.turn([0, 1]);
     });
     key('d', function(){
      view.snake.turn([0.-1]);
     });
    view.intervalID = setInterval(view.step.bind(view), 300);
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
    this.board.checkEatApple()
    
    // this.$display.html("<pre>" + this.board.render() + "</pre>");
    this.board.renderTail();
    this.snake.move();
    this.board.renderHead();
    // this.board.checkEatApple();
  };
  
  View.prototype.handleKeyEvent = function(event){
    var key = event.keyCode;
    switch(key){
    case 38:

      break;
    case 40:

      break;
    case 37:

      break;
    case 39:

      break;
    }
  };
  

  
})(this);