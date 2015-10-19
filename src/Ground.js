var babylon = require('babylonjs');

export default class Ground {
  constructor(options) {
    this.mesh = babylon.Mesh.CreatePlane('ground', 20.0, options.scene);
    this.mesh.material = new babylon.StandardMaterial('groundMat', options.scene);
    this.mesh.material.diffuseColor = new babylon.Color3(1, 1, 1);
    this.mesh.material.backFaceCulling = false;
    this.mesh.position = new babylon.Vector3(5, -10, -15);
    this.mesh.rotation = new babylon.Vector3(Math.PI / 2, 0, 0);

    //finally, say which mesh will be collisionable
    this.mesh.checkCollisions = true;
  }
}
