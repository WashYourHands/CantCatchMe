import Game from "./Game.js";

window.addEventListener('DOMContentLoaded', function(){
  var canvas = document.getElementById('renderCanvas');
  var game = new Game({
    canvas: canvas
  });

  game.start();
  canvas.height = canvas.width*9/16;
});
