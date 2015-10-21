var babylon = require('babylonjs');

const MAX_HEALTH = 100;
const MAX_MANA = 100;
const BAR_SIZE = 1;
const BAR_Y_SCALING = 0.05;
const X_BAR = -0.5;
const Z_BAR = 1.5;
const Y_BAR = -0.5;
export default class Player {
  constructor(options) {
    // Need a free camera for collisions
    this.camera = new babylon.FreeCamera('FreeCamera', new babylon.Vector3(0, 2, 0), options.scene);
    this.camera.attachControl(options.canvas, true);

    //Then apply collisions and gravity to the active camera
    this.camera.checkCollisions = true;
    this.camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    this.camera.ellipsoid = new babylon.Vector3(1, 1, 1);

    this.status = {mana: MAX_MANA, health: MAX_HEALTH};

    this.healthBar = this.generateHealthBar(options.scene, this.camera);
    this.manaBar = this.generateManaBar(options.scene, this.camera);

    options.scene.registerBeforeRender(() => {
      this.health -= 0.01;
    });
  }

  generateHealthBar (scene, camera) {
    var healthBar = babylon.Mesh.CreatePlane("health_bar", BAR_SIZE, scene, false);
    healthBar.material = new babylon.StandardMaterial("health_bar", scene);
    healthBar.material.emissiveColor = new babylon.Color3(1, 0, 0);
    healthBar.material.diffuseColor = new babylon.Color3(1, 0, 0);
    healthBar.material.hasAlpha = false;
    healthBar.scaling.y = BAR_Y_SCALING;
    healthBar.position.x = X_BAR;
    healthBar.position.z = Z_BAR;
    healthBar.position.y = Y_BAR;
    healthBar.parent = camera;
    return healthBar;
  }

  generateManaBar (scene, camera) {
    var manaBar = babylon.Mesh.CreatePlane("mana_bar", BAR_SIZE, scene, false);
    manaBar.material = new babylon.StandardMaterial("mana_bar", scene);
    manaBar.material.emissiveColor = new babylon.Color3(0, 0, 1);
    manaBar.material.diffuseColor = new babylon.Color3(0, 0, 1);
    manaBar.material.hasAlpha = false;
    manaBar.scaling.y = BAR_Y_SCALING;
    manaBar.position.x = X_BAR;
    manaBar.position.z = Z_BAR;
    manaBar.position.y = Y_BAR+(BAR_SIZE*BAR_Y_SCALING)+0.01; // нижняя координата+высота+промежуток
    manaBar.parent = camera;
    return manaBar;
  }

  resizeBar(bar, percent){
    bar.scaling.x = percent;
    bar.position.x = X_BAR-(1-percent)/2;
  }

  get health() {
    return this.status.health;
  }

  set health(value) {
    if (value > MAX_HEALTH) {
      value = MAX_HEALTH;
    }
    if (value < 0) {
      value = 0;
    }
    this.status.health = value;
    this.resizeBar(this.healthBar, value/MAX_HEALTH);
  }

  get mana() {
    return this.status.mana;
  }

  set mana(value) {
    if (value > MAX_MANA) {
      value = MAX_MANA;
    }
    if (value < 0) {
      value = 0;
    }
    this.status.mana = value;
    this.resizeBar(this.manaBar, value/MAX_MANA);
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
