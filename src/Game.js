var babylon = require('babylonjs');
import Player from './Player.js';
import Ground from './Ground.js';
import Dragon from './Dragon.js';

export default class Game {
  constructor(options) {
    this.engine = new babylon.Engine(options.canvas, true);
    this.scene = new babylon.Scene(this.engine);

    // Create camera and light
    // TODO: is it used?
    new babylon.PointLight("Point", new babylon.Vector3(5, 10, 5), this.scene);

    this.player = new Player({
      scene: this.scene,
      canvas: options.canvas
    });

    this.ground = new Ground({
      scene: this.scene
    });

    this.dragon = new Dragon({
      scene: this.scene
    });

    // Set gravity for the scene (G force like, on Y-axis)
    this.scene.gravity = new babylon.Vector3(0, -0.9, 0);

    // Enable Collisions
    this.scene.collisionsEnabled = true;
  }

  start() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener('resize', () => this.onResize);
    window.addEventListener('onkeyup', () => this.onKeyUp);
  }

  onResize() {
    this.engine.resize();
  }

  onKeyUp(ev) {
    switch (event.keyCode) {
      case 32:
        this.player.animations = [];

        var a = new babylon.Animation("a", "position.y", 20, babylon.Animation.ANIMATIONTYPE_FLOAT, babylon.Animation.ANIMATIONLOOPMODE_CYCLE);
        // Animation keys
        var keys = [];
        var f = 0;
        var ii = 0;
        for (var i = 0; i <= 5; i++) {
          ii += i / 10;
          keys.push({frame: f, value: this.player.position.y + ii});
          f++;
        }
        var ii = 0;
        for (var i = 0; i <= 5; i++) {
          ii += i / 10;
          keys.push({frame: f, value: this.player.position.y + 1.5 - ii});
          f++;
        }
        a.setKeys(keys);
        var easingFunction = new babylon.CircleEase();
        easingFunction.setEasingMode(babylon.EasingFunction.EASINGMODE_EASEINOUT);
        a.setEasingFunction(easingFunction);
        this.player.animations.push(a);
        this.scene.beginAnimation(this.player, 0, 20, false);
        break;
    }
  }
}
