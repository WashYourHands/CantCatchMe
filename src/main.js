import Hello from "./hello.js";
var BABYLON = require('babylonjs');

new Hello().say();

window.addEventListener('DOMContentLoaded', function(){
  var canvas = document.getElementById('renderCanvas');
  var engine = new BABYLON.Engine(canvas, true);
  var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    // Create camera and light
    var light = new BABYLON.PointLight("Point", new BABYLON.Vector3(5, 10, 5), scene);
    // Need a free camera for collisions
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
    camera.attachControl(canvas, true);

    //Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 20.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -10, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    //Simple crate
    var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    box.position = new BABYLON.Vector3(5, -9, -10);

    //Set gravity for the scene (G force like, on Y-axis)
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    // Enable Collisions
    scene.collisionsEnabled = true;

    //Then apply collisions and gravity to the active camera
    camera.checkCollisions = true;
    camera.applyGravity = true;

    //Set the ellipsoid around the camera (e.g. your player's size)
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    //finally, say which mesh will be collisionable
    ground.checkCollisions = true;
    box.checkCollisions = true;

    //Create a manager for the player's sprite animation
    var spriteManagerDragon = new BABYLON.SpriteManager("dragonManager", "textures/dragon.png", 2, 128, scene);
    // First animated player
    var dragon = new BABYLON.Sprite("player", spriteManagerDragon);
    dragon.playAnimation(12, 16, true, 100);
    dragon.position.z = -19;
    dragon.position.y = -8;
    dragon.size = 1;
    dragon.isPickable = true;

    window.addEventListener("keyup", onKeyUp, false);
    var sceneJump = scene;
    function onKeyUp(event) {
      switch (event.keyCode) {
        case 32:
          camera.animations = [];
          var a = new BABYLON.Animation("a", "position.y", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
          // Animation keys
          var keys = [];
          var f = 0;
          var ii = 0;
          for(var i=0; i<=5; i++){
            ii+=i/10;
            keys.push({ frame:f , value: camera.position.y+ii});
            f++;
          }
          var ii=0;
          for(var i=0; i<=5; i++){
            ii+=i/10;
            keys.push({ frame:f , value: camera.position.y+1.5-ii});
            f++;
          }
          a.setKeys(keys);
          var easingFunction = new BABYLON.CircleEase();
          easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
          a.setEasingFunction(easingFunction);
          camera.animations.push(a);
          sceneJump.beginAnimation(camera, 0, 20, false);
          break;
      }
    }

    scene.registerBeforeRender(function(){
      dragon.position.z += 0.1;
    });

    return scene;
  }
  var scene = createScene();
  engine.runRenderLoop(function(){
      scene.render();
  });
  window.addEventListener('resize', function(){
      engine.resize();
  });
});