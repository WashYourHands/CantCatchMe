var babylon = require('babylonjs');

const TEXTURE_PATH = 'textures/grass.jpg';
const TEXTURE_SIZE = 5;
const PLANE_SIZE   = 1200;
const GROUND_DRAW_DIFF   = 250;

export default class Ground {
  constructor(options) {
    this.scene = options.scene;
    this.map = {};
    this.player  = options.player;
    this.createPlaneIfNotExists(0, 0);
    this.createPlaneIfNotExists(-1, 0);
    this.createPlaneIfNotExists(0, -1);
    this.createPlaneIfNotExists(-1, -1);
    this.prevX = 0;
    this.prevZ = 0;
  }
  checkPlayerPosition() {
    let playerPosition = this.player.camera.position;
    let xPlaneIndex = Math.floor(playerPosition.x/PLANE_SIZE);
    let zPlaneIndex = Math.floor(playerPosition.z/PLANE_SIZE);
    let xCenter = (xPlaneIndex+0.5) * PLANE_SIZE;
    let zCenter = (zPlaneIndex+0.5) * PLANE_SIZE;
    let forwardOnX = playerPosition.x - xCenter > GROUND_DRAW_DIFF;
    let forwardOnZ = playerPosition.z - zCenter > GROUND_DRAW_DIFF;
    let backwardOnX = xCenter - playerPosition.x> GROUND_DRAW_DIFF;
    let backwardOnZ = zCenter - playerPosition.z> GROUND_DRAW_DIFF;
    //по x
    if (forwardOnX) {
      this.createPlaneIfNotExists(xPlaneIndex+1, zPlaneIndex);
    }
    if (backwardOnX) {
      this.createPlaneIfNotExists(xPlaneIndex-1, zPlaneIndex);
    }
    //по z
    if (forwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex, zPlaneIndex+1);
    }
    if (backwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex, zPlaneIndex-1);
    }
    //диагонали
    if (forwardOnX && forwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex+1, zPlaneIndex+1);
    }
    if (forwardOnX && backwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex+1, zPlaneIndex-1);
    }
    if (backwardOnX && forwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex-1, zPlaneIndex+1);
    }
    if (backwardOnX && backwardOnZ) {
      this.createPlaneIfNotExists(xPlaneIndex-1, zPlaneIndex-1);
    }
    if(zPlaneIndex != this.prevZ || xPlaneIndex != this.prevX){
      console.log(zPlaneIndex, xPlaneIndex);
    }
    this.prevX = xPlaneIndex;
    this.prevZ = zPlaneIndex;

  }
  createPlaneIfNotExists(xPlaneIndex, zPlaneIndex) {
    if (this.map[xPlaneIndex+"_"+zPlaneIndex] != undefined) {
      return;
    }
    var mesh = babylon.Mesh.CreatePlane('ground', PLANE_SIZE, this.scene, true);
    //Creation of a repeated textured material
    var materialPlane = new babylon.StandardMaterial("texturePlane", this.scene);
    materialPlane.diffuseTexture = new babylon.Texture(TEXTURE_PATH, this.scene);
    materialPlane.diffuseTexture.uScale = PLANE_SIZE/TEXTURE_SIZE;
    materialPlane.diffuseTexture.vScale = PLANE_SIZE/TEXTURE_SIZE;
    materialPlane.backFaceCulling = false;//Always show the front and the back of an element
    mesh.material = materialPlane;
    mesh.position = new babylon.Vector3((xPlaneIndex+0.5)*PLANE_SIZE, 0, (zPlaneIndex+0.5)*PLANE_SIZE);
    mesh.rotation = new babylon.Vector3(Math.PI / 2, 0, 0);
    mesh.checkCollisions = true;
    this.map[xPlaneIndex+"_"+zPlaneIndex] = mesh;
  }
}
