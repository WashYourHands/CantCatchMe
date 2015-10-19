import Game from "./Game.js";

window.addEventListener('DOMContentLoaded', function(){
  var game = new Game({
    canvas: document.getElementById('renderCanvas')
  });

  game.start();
});
