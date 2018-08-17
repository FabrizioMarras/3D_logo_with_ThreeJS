// create an initialisation function containing all the THREE JS material:
function init() { // To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.

// **********************************
// VARIABLES - Initialise OBJECTs
// **********************************

  var scene = new THREE.Scene(); // create the scene.
  var gui = new dat.GUI(); // Initiate GUI - controllers on the browser window.
  var enableFog = false; // create a condition to be able to enable the fog.
    if (enableFog) { // fog is like a gradient between plane and background.
    scene.fog = new THREE.FogExp2(0x222222, 0.2)// adding some fog if needed - first value is the color, second is the intensity.
    }
  // 3D Objects
  var box= getBox(1, 1, 1); // the number gives the width height and depth of the object.
  var plane = getPlane (20); // the number give the size of the plane...bigger number, bigger plane.
  var pointLight = getPointLight(1); // calling the getPointLight function and giving an intensity of 1.
  var sphere = getSphere(0.05); // a small sphere - size = 0.05 to symbolise the light in our ascene

// **********************************
// CREATING PARAMETERS FOR EVERY VARIABLE
// **********************************

  box.position.y = box.geometry.parameters.height/2; // this is in order to position the box on top of the plane and not half way through. but in order to do not type values if the box size changes we get the size of the box. So we need to check the box parameters and place the box in a way that it is sitting on the plane. By using (box.geometry.parameters.height/2) everytime the box changes its height, the box will be still laying on top of the plane.

  plane.rotation.x = Math.PI/2; // ThreeJS uses radius and not degrees for the rotations. so for 90 degrees angle i need to use a bit of math to calculate it. MAth.PI should give me the value of Pi, and dividing it by 2 should give me the 90Degrees i am looking for.

// changing position of the pointLight.
  pointLight.position.x = 1.25;
  pointLight.position.y = 2.25;
  pointLight.position.z = 1.25;
// changing intensity of the pointLight.
  pointLight.intensity = 2;

// adding the controller to gui with the add method - add the object to control, the property to control, and the ranges/limits of the controller
  gui.add(pointLight, 'intensity', 0, 5);
  gui.add(pointLight.position, 'x', -5, 5);
  gui.add(pointLight.position, 'y', 0.1, 5);

  // **********************************
  // ADDING EVERY VARIABLES TO THE SCENE or to eachother - child/parent relationship
  // **********************************

  scene.add( box ); // adding the box to the scene. By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0). This would cause both the camera and the cube to be inside each other. To avoid this, we simply move the camera out a bitusing camera.position.z(x or y).
  scene.add( plane ); // everytime you create an object, you need to add it to  the scene.
  pointLight.add( sphere ); // adding the sphere to the point.Light.
  scene.add( pointLight );  // add the light to the scene.


// CAMERA
  var camera = new THREE.PerspectiveCamera(
    75, // Field of view - value in degrees.
    window.innerWidth / window.innerHeight, // Aspect Ratio - width of the elemt divided by its height in order to do not squish things.
    0.1, 1000 // NEAR and FAR clipping plane - What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered.
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;// the camera starting point is always the 0x 0y 0z. In order to be able to see an object positioned in the 0x 0y 0z position we need to move the camera on one of the axes...lets say for example the z axis.

// lookat is a method on the camera that represent the point where the camera is looking at. The point is represented by a vector (x,y,z)

  camera.lookAt(new THREE.Vector3(0, 0, 0)); // the object is centered in the middle of the screen.

// RENDERER
  var renderer = new THREE.WebGLRenderer();
  // ADD SHADOWS 01 - enabling the shadows in the RENDERER
  renderer.shadowMap.enabled = true;
  // In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. It's a good idea to use the width and height of the area we want to fill with our app:
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.setClearColor('rgb(120, 120, 120)');  // set the background color to rgb(120, 120, 120) in between eiphens.

  // add the renderer element to our HTML document. This is a <canvas> element the renderer uses to display the scene to us.
  document.getElementById('webgl').appendChild(renderer.domElement); // appending the renderer to the div.

// ORBIT CONTROL - to orbit around the object with the camera by dragging or clicking.
var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls); // call the function update which allow to continuously render the scene without the need to reload the page - adding also the controls to the update function will ensure the screen to update after each move.

}; // init function

// **********************************
// CREATING OBJECTS as FUNCTIONS
// **********************************

  // dedicated function that create the box Object - geometry, material and the mesh are created.
  function getBox(w, h, d) {
    // Adding our first geometry to the scene:
        var geometry = new THREE.BoxGeometry( w, h, d ); // BoxGeometry: an object that contains all the points (vertices) and fill (faces) of the cube.
        var material = new THREE.MeshPhongMaterial( {
            color: 'rgb(120, 120, 120)'
        } ); // material to color the Box Object - Three.js comes with several materials, to keep things simple for now we only provide a color. This works the same way that colors work in CSS or Photoshop (hex colors) - changing MeshBasicMaterial with MeshPhongMaterial, enable us to use light to bring shades to the object.
        var cube = new THREE.Mesh(
          geometry,
          material
        ); // The third thing we need is a Mesh. A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.

        // ADD SHADOWS 03 - allow the object to cast  SHADOWS
        cube.castShadow = true;

        return cube
  };

  // dedicated function that create PLANE Object - geometry, material and the mesh are created.
  function getPlane(size) {
    // Adding our first geometry to the scene:
        var geometry = new THREE.PlaneGeometry( size, size ); // PlaneGeometry: it works with width and depth values, so pass only one value and use it twice in the Plane geometry. and then we need to define the side parameter.
        var material = new THREE.MeshPhongMaterial( {
            color: 'rgb(120, 120, 120)',
            side: THREE.DoubleSide
        } ); // material to color the Box Object - Three.js comes with several materials, to keep things simple for now we only provide a color. This works the same way that colors work in CSS or Photoshop (hex colors)
        var mesh = new THREE.Mesh(
          geometry,
          material
        ); // The third thing we need is a Mesh. A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.

        // ADD SHADOWS 04 - allow the object to receive SHADOWS
        mesh.receiveShadow = true;


        return mesh
  };

  // dedicated function that create the sphere Object - geometry, material and the mesh are created - this is placed inside the pointLight object so we can visualise the light as it is a sphere..
  function getSphere(size) {
    // Adding our first geometry to the scene:
        var geometry = new THREE.SphereGeometry( size, 24, 24); // SphereGeometry: takes three argument, the size - radius - and the width and height segment values, which are a measurement of the resolution of the geometry - 24 is the default number.
        var material = new THREE.MeshBasicMaterial( {
            color: 'rgb(250, 250, 250)'
        } ); // material to color the Sphere Object - Three.js comes with several materials, to keep things simple for now we only provide a color. This works the same way that colors work in CSS or Photoshop (hex colors) - changing MeshBasicMaterial from MeshPhongMaterial, enable us to use the sphere as it is the source of light to bring shades to the object.
        var mesh = new THREE.Mesh(
          geometry,
          material
        ); // The third thing we need is a Mesh. A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
        return mesh
  };


  // LIGHTS

  function getPointLight(intensity) {
   var light = new THREE.PointLight(0xffffff, intensity);

   // ADD SHADOWS 02 - tell the light to cast SHADOWS
   light.castShadow = true;

   light.shadow.bias = 0.001; // check this parameter on a casa by case basis, it is useful to remove a glitch when using shadows, which makes the shadow disappear in a line close to the object receiving the shadow.

   light.shadow.mapSize.width = 2048; // standard value is 1024. this value increases the resolution of the shadows...the higher the better, but careful to not go too high for rendering issues.

   return light;

  }; // point light takes two argument - color whic we are using white, and the second is intensity which is going to be received from the function argument.


// **********************************
// CREATING FUNCTIONS for continuous RENDERING
// **********************************
function update(renderer, scene, camera, controls) {
  renderer.render( scene, camera ); // renderer

  controls.update(); // UPDATE METHOD applied to the controls in order to be able to control the camera with dragging.

  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);// calling back the animation function.
  }); // requestAnimationFrame is a method on the window object -  It's similar to the set interval in a sense that it periodically calls the given function, but it also performs sorts and performs optimizations, regarding when a frame gets painted, which makes it preferable to use this function over set interval function when working with animations.
};

// **********************************
// CREATING FUNCTION TO RUN ALL
// **********************************

// Call the initialisation function with all the THREE JS material in it.
init();
