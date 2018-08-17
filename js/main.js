// in THREE.js 3 things must be created: scene, camera, renderer

function init() {

// **********************************
// VARIABLES - Initialise OBJECTs
// **********************************
// CREATE 01 - Scene
  var scene = new THREE.Scene(); // create the scene.


// 3D Objects
// 3D Logo

  // MTL LOADER
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('../_assets/');
  mtlLoader.setPath('../_assets/');
  mtlLoader.load('FM_3DLogo.mtl', function(materials) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../_assets/');
    objLoader.load('FM_3DLogo.obj', function(object) {
      object.position.y += 500; // brings up the imported 3D object.
      scene.add(object); // add the 3D obj file to the scene.
    }); // OBJ Loader
  }); // MTL Loader

// Lights
  var pointLight01 = getPointLight01(1); // calling the getPointLight function and giving an intensity of 1.

  var pointLight02 = getPointLight02(1); // calling the getPointLight function and giving an intensity of 1.

// **********************************
// LIGHTS
// **********************************
// POINTLIGHT 01.
  pointLight01.position.x = 1500;
  pointLight01.position.y = -1500;
  pointLight01.position.z = -800;
  pointLight01.intensity = 3;
// POINTLIGHT 01.
  pointLight02.position.x = -1500;
  pointLight02.position.y = 1500;
  pointLight02.position.z = 800;
  pointLight02.intensity = 3;


// adding the lights to the scene
  scene.add( pointLight01 );  // add the light to the scene.
  scene.add( pointLight02 );  // add the light to the scene.

// CREATE 02 - CAMERA
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  // camera.position.x = 1;
  camera.position.y = 250;
  camera.position.z = 1500;
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // the object is centered in the middle of the screen.

// CREATE 03 - the RENDERER
  var renderer = new THREE.WebGLRenderer();
  // ADD SHADOWS 01 - enabling the shadows in the RENDERER
  renderer.shadowMap.enabled = true;
  renderer.setSize( window.innerWidth, window.innerHeight );// set the size of the 3D environment.
  renderer.setClearColor(0x222222);  // set the background color.

  document.getElementById('webgl').appendChild(renderer.domElement); // add the renderer element to our HTML document.

// ORBIT CONTROL - to orbit around the object with the camera by dragging or clicking.
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls); // continuously render the scene
}; // init function - make everything happen

// **********************************
// CREATING OBJECTS as FUNCTIONS
// **********************************

  // LIGHTS

  function getPointLight01(intensity) {
   var light = new THREE.PointLight(0xffffff, intensity);
   // ADD SHADOWS 02 - tell the light to cast SHADOWS
   light.castShadow = true;
   light.shadow.bias = 0.001; // check this parameter on a casa by case basis, it is useful to remove a glitch when using shadows, which makes the shadow disappear in a line close to the object receiving the shadow.
   light.shadow.mapSize.width = 2048;
   light.shadow.mapSize.height = 2048; // standard value is 1024. this value increases the resolution of the shadows...the higher the better, but careful to not go too high for rendering issues.
   return light;
  }; // point light takes two argument - color whic we are using white, and the second is intensity which is going to be received from the function argument.

  function getPointLight02(intensity) {
   var light = new THREE.PointLight(0xffffff, intensity);
   // ADD SHADOWS 02 - tell the light to cast SHADOWS
   light.castShadow = true;
   light.shadow.bias = 0.01; // check this parameter on a casa by case basis, it is useful to remove a glitch when using shadows, which makes the shadow disappear in a line close to the object receiving the shadow.
   light.shadow.mapSize.width = 2048;
   light.shadow.mapSize.height = 2048; // standard value is 1024. this value increases the resolution of the shadows...the higher the better, but careful to not go too high for rendering issues.
   return light;
  }; // point light takes two argument - color whic we are using white, and the second is intensity which is going to be received from the function argument.


// **********************************
// CREATING FUNCTIONS for continuous RENDERING
// **********************************
  function update(renderer, scene, camera, controls) {
    renderer.render( scene, camera ); // renderer

    controls.update(); // UPDATE METHOD applied to the controls in order to be able to control the camera with dragging.
    controls.autoRotate = true; // rotate automatically the camera around the object.
    requestAnimationFrame(function() {

      update(renderer, scene, camera, controls);// calling back the animation function.
    }); // requestAnimationFrame is a method on the window object -  It's similar to the set interval in a sense that it periodically calls the given function, but it also performs sorts and performs optimizations, regarding when a frame gets painted, which makes it preferable to use this function over set interval function when working with animations.
  };

// **********************************
// Callingthe INIT FUNCTION TO RUN ALL
// **********************************
// Call the initialisation function with all the THREE JS material in it.
init();
