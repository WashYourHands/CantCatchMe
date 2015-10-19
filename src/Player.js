var babylon = require('babylonjs');

export default class Player {
  constructor(options) {
    // Need a free camera for collisions
    this.camera = new babylon.FreeCamera('FreeCamera', new babylon.Vector3(0, -8, -20), options.scene);
    this.camera.attachControl(options.canvas, true);

    //Then apply collisions and gravity to the active camera
    this.camera.checkCollisions = true;
    this.camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    this.camera.ellipsoid = new babylon.Vector3(1, 1, 1);
  }

  get position() {
    return this.camera.position;
  }

  get animations() {
    return this.camera.animations;
  }

  set animations(value) {
    this.camera.animations = value;
  }
}
