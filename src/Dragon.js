var babylon = require('babylonjs');

const TEXTURE_PATH = 'textures/dragon.png';
export default class Dragon {
  constructor(options) {
    // First animated player
    this.sprite = new babylon.Sprite("player", new babylon.SpriteManager('dragonManager', TEXTURE_PATH, 2, 128, options.scene));
    this.sprite.playAnimation(12, 16, true, 100);
    this.sprite.position.z = 2;
    this.sprite.position.y = 2;
    this.sprite.size = 1;
    this.sprite.isPickable = true;

    var player = options.player;
    options.scene.registerBeforeRender(() => {
      var baseSpeed = 0.05;
      var maxSpeed = player.camera.speed + baseSpeed;

      var curSpeed = baseSpeed;

      //distance between dragon and player in XZ plane
      var distance = Math.sqrt(Math.pow(player.position.x-this.sprite.position.x, 2)+Math.pow(player.position.z-this.sprite.position.z, 2));

      if (distance <= 1){
        curSpeed = maxSpeed;
      }
      else if (distance <= 20) {
        curSpeed = (20-distance)/20 * player.camera.speed;
        if (player.crazy) {
          curSpeed *= 0.5;
        }
        else {
          curSpeed *= 1.5;
        }
      }

      this.sprite.position.z += curSpeed;
    });
  }
}
