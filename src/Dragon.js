var babylon = require('babylonjs');

const TEXTURE_PATH = 'textures/dragon.png';
export default class Dragon {
  constructor(options) {
    // First animated player
    this.sprite = new babylon.Sprite("player", new babylon.SpriteManager('dragonManager', TEXTURE_PATH, 2, 128, options.scene));
    this.sprite.playAnimation(12, 16, true, 100);
    this.sprite.position.z = -19;
    this.sprite.position.y = -8;
    this.sprite.size = 1;
    this.sprite.isPickable = true;

    options.scene.registerBeforeRender(() => {
      this.sprite.position.z += 0.1;
    });
  }
}
