import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as $ from "jquery";
import "./app.css"
import { CSG } from 'three-csg-ts';

//import calFunctions
import { calFunctions } from "./calc";
window.$ = $;
const inputs = document.querySelectorAll("input")
const colorinput = document.getElementById("color")

inputs[0].value = 2700
inputs[1].value = 325
inputs[2].value = 20
inputs[3].value = 0
inputs[4].value = 30
inputs[5].value = 20
inputs[6].value = 6
inputs[7].value = 1000
inputs[8].value = 250
inputs[9].value = 40
inputs[10].value = 25

const selects = document.querySelectorAll("select")
selects[0].value = "timberjois"
selects[1].value = "includealltreads"
selects[2].value = "2607556M"


colorinput.addEventListener("input", function () {
  var inputcolor = colorinput.value;
  sessionStorage.setItem("color", inputcolor)
  sessionStorage.removeItem("texture")

}, false);

const colors = [
  {
    texture: "/textures/Wood_1.bmp",
    size: [2, 2, 2],
    shininess: 60,
  },
  {
    texture: "/textures/wood_.jpg",
    size: [5, 5, 5],
    shininess: 30,
  },
  {
    texture: "/textures/denim_.jpg",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/E22.jpg",
    size: [7, 7, 7],
    shininess: 50,
  },
  {
    texture: "/textures/stone_0104_c.jpg",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/2607557M.png",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/Gloss-White.png",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/Matt-White.jpg",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/Gloss-Black.jpg",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/Matt-Black.png",
    size: [3, 3, 3],
    shininess: 0,
  },
  {
    texture: "/textures/Monument.png",
    size: [3, 3, 3],
    shininess: 0,
  },
];

var canvas = document.querySelector(".webgl");
// var width = canvas.width = 1000

const backgourndColor = 0xa0a0a0;

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0);

var modelGroup = new THREE.Group();
scene.add(modelGroup);
modelGroup.position.set(-18,-8,0)

const hemiLight = new THREE.HemisphereLight(0x363636,0x444444);
 hemiLight.position.set(0,100,0);
  scene.add(hemiLight);

const hemiLight1 = new THREE.HemisphereLight(0x363636,0x444444);
hemiLight1.position.set(100,0,0);
 scene.add(hemiLight1);

const light = new THREE.SpotLight( 0xffffff );
light.castShadow = true; // default false
light.position.set(40,70,80);
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 1000; // default
light.shadow.mapSize.height = 1000; // default
light.shadow.camera.near = 1; // default
light.shadow.camera.far = 1000; // default
light.shadow.focus = 1; // default

// // ground
// const ground = new THREE.Mesh(
//   new THREE.PlaneGeometry(60, 45),
//   new THREE.MeshPhongMaterial({ color:0x000000, depthWrite:true })                 //0x8a8a8a
// );
// ground.rotation.x = -Math.PI /2;
// ground.position.x=0
// ground.position.y = -2;
// ground.receiveShadow = true;
// scene.add(ground);

var sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
});
// var axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);
var camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(-45, 40, 85);
scene.add(camera);

const controller = new OrbitControls(camera, canvas);
controller.minDistance =0;
controller.maxDistance = 600;
controller.update();

var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(1500,1000);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const clock = new THREE.Clock();

const animate = () => {
  controller.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate)

};
animate();
const link = document.createElement("a");
 link.style.display = "none";
 document.body.appendChild(link);

//#region Variable Declaration

//Stringer
var stairBeamDepth = 150 / 100.0;
//Steps
var stairStepDepth = 100 / 100.0;

//Stair Step1
var stairStep1Width = 100 / 100.0;
var stairStep1FrontHt = 150 / 100.0;

//Stair Step2
var stairStep2Depth = 560 / 100.0;
var stairStep2Ht = 8 / 100.0;
var stairStep2Width = 160 / 100.0;

//RecessPlate
var recessPlateWidth = 350 / 100.0;
var recessPlateDepth = 300 / 100.0;
var recessPlateToStairBeam = 50 / 100.0;
var recessPlateHt = 10 / 100.0;

//Base
var woodenFloorThk = 15 / 100.0;
var floorConcreteHt = 100 / 100.0;
var floorDepth = 1260 / 100.0;
var floorConcreteSlotHt = 0 / 100.0;
var recessPlateToConcreteGap = 50 / 100.0;
var floorConcreteSlotWidth = 450 / 100.0;
var floorStartLength = 500 / 100.0;

//Wall
var wallHt = 3402.745 / 100.0;
var wallDepth = 100 / 100.0;
 
//MountingPlate
var MountingPlatewidth=20/100.0;
var MountingPlate1Ht=130/100.0;
var MountingPlate2Ht=210/100.0;

addSupport();
Steps();
function Steps() {
  for (let i = 0; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "includealltreads") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, (i * calFunctions.risePerStepCalculated() / 100.0));
      addStepPart2(i);
      addStepPart3(i);
    }
  }
  for (let i = 1; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "removebottomtread") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, i * calFunctions.risePerStepCalculated() / 100.0);
      addStepPart2(i);
      addStepPart3(i);
    }
  }
  for (let i = 2; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "removebottom2tread") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, i * calFunctions.risePerStepCalculated() / 100.0);
      addStepPart2(i);
      addStepPart3(i);
    }
  }
  for (let i = 3; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "removebottom3tread") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, i * calFunctions.risePerStepCalculated() / 100.0);
      addStepPart2(i);
      addStepPart3(i);
    }
  }
  for (let i = 4; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "removebottom4tread") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, i * calFunctions.risePerStepCalculated() / 100.0);
      addStepPart2(i);
      addStepPart3(i);
    }
  }
  for (let i = 5; i < calFunctions.treadCountCalculated(); i++) {
    if (selects[1].value == "removebottom5tread") {
      addStepPart1(i * calFunctions.treadGoingCalculated() / 100.0, i * calFunctions.risePerStepCalculated() / 100.0);
      addStepPart2(i);
      addStepPart3(i);
    }
  }
}
MountingPlate1();
MountingPlate2();
addPlate();
addPlateTop();
addTop();
addTopbox();
addLowerSubFloor();
addTopConcreteSlab();
addRecessPlate();
addGroundSubFloor();
addGroundFloorStart();
addGroundFloorEnd();
addConcreteFloor();
// addWall();

function addWall() {
  var zOffset = (stairBeamDepth - floorDepth) / 2.0 - wallDepth;

  var extrudeSettings = {
    steps: 1,
    depth: wallDepth,
    bevelEnabled: false,
  };

  var xValOffset = -1 * (recessPlateToStairBeam + recessPlateToConcreteGap);
  var yVal = -recessPlateHt;

  var points = [
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt -(inputs[4].value/100)
    ),
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt -(inputs[4].value/100) + wallHt
    ),
    new THREE.Vector3(
      stairWholeW,
      yVal + floorConcreteSlotHt - (inputs[4].value/100) + wallHt
    ),
    new THREE.Vector3(
      stairWholeW,
      yVal + floorConcreteSlotHt -(inputs[4].value/100)
    ),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var mat = new THREE.MeshPhongMaterial({ color: 0x363636 });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.receiveShadow = true;

  scene.add(mesh);
}
function addGroundFloorEnd() {
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };

  var xValOffset = -1 * (recessPlateToStairBeam + recessPlateToConcreteGap);
  var xVal = xValOffset;
  var yVal = -recessPlateHt;

  var points = [
    new THREE.Vector3(
      xVal + floorConcreteSlotWidth,
      yVal + floorConcreteSlotHt
    ),
    new THREE.Vector3(stairWholeW, yVal + floorConcreteSlotHt),
    new THREE.Vector3(stairWholeW, yVal + floorConcreteSlotHt+woodenFloorThk),
    new THREE.Vector3(
      xVal + floorConcreteSlotWidth,
      yVal + floorConcreteSlotHt+woodenFloorThk
    ),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat = new THREE.MeshPhongMaterial({map: frameTexture, shininess: 10});    //color: 0x43464b
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.receiveShadow = true;

  modelGroup.add(mesh);
}
function addGroundFloorStart() {
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };

  var xValOffset = -1 * (recessPlateToStairBeam + recessPlateToConcreteGap);
  var xVal = xValOffset;
  var yVal = -recessPlateHt;

  var points = [
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt
    ),
    new THREE.Vector3(xVal, yVal + floorConcreteSlotHt),
    new THREE.Vector3(xVal, yVal + floorConcreteSlotHt+woodenFloorThk),
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt+woodenFloorThk
    ),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat = new THREE.MeshPhongMaterial({map: frameTexture, shininess: 10  });               // color: 0x43464b
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.receiveShadow = true;

  modelGroup.add(mesh);
}
function addGroundSubFloor() {
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };

  var xValOffset = -1 * (recessPlateToStairBeam + recessPlateToConcreteGap);
  var xVal = xValOffset;
  var yVal = -recessPlateHt

  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + floorConcreteSlotWidth, yVal),
    new THREE.Vector3(
      xVal + floorConcreteSlotWidth,
      yVal +floorConcreteSlotHt
    ),
    new THREE.Vector3(stairWholeW, yVal +floorConcreteSlotHt),
    new THREE.Vector3(
      stairWholeW,
      yVal +floorConcreteSlotHt-(+inputs[4].value/100)
    ),
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt-(+inputs[4].value/100)
    ),
    new THREE.Vector3(
      xValOffset - floorStartLength,
      yVal + floorConcreteSlotHt
    ),
    new THREE.Vector3(xVal, yVal + floorConcreteSlotHt),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var mat = new THREE.MeshPhongMaterial({ color: 0x43464b });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.receiveShadow = true;

  modelGroup.add(mesh);
}
function addConcreteFloor() {
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };

  var xVal =-1*10.5;
  var yVal = -0.13-(+inputs[4].value/100);

  var points = [
    new THREE.Vector3(xVal + floorConcreteSlotWidth,yVal + floorConcreteSlotHt),
    new THREE.Vector3(stairWholeW, yVal + floorConcreteSlotHt),
    new THREE.Vector3(stairWholeW, yVal + floorConcreteSlotHt-(+inputs[4].value/100)),
    new THREE.Vector3(xVal + floorConcreteSlotWidth,yVal + floorConcreteSlotHt-(+inputs[4].value/100)),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.receiveShadow = true;

  modelGroup.add(mesh);
}
function addRecessPlate() {
  var zOffset = (stairBeamDepth - recessPlateDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: recessPlateDepth,
    bevelEnabled: false,
  };

  var xValOffset = -1 * recessPlateToStairBeam;

  var xVal = xValOffset;
  var yVal = -recessPlateHt;

  if (inputs[14].checked == true) {
    floorConcreteSlotHt = 30 / 100.0;
  }
  else {
    floorConcreteSlotHt = 0 / 100.0;
  }
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + recessPlateWidth, yVal),
    new THREE.Vector3(xVal + recessPlateWidth, yVal + recessPlateHt),
    new THREE.Vector3(xVal, yVal + recessPlateHt),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var mat = new THREE.MeshPhongMaterial({ color: 0x0f0f0f });
  var recessplate = new THREE.Mesh(geom, mat);

  recessplate.translateZ(zOffset);
  recessplate.castShadow = true;
  recessplate.updateMatrix();

  var boltHoleRadius = 0.06;
  var boltHoleHeight = 0.11
  var boltHoleGeometry = new THREE.CylinderGeometry(boltHoleRadius, boltHoleRadius, boltHoleHeight, 32);
  var boltHolepositions = [];

  boltHolepositions.push({ x: xVal+0.23, y: yVal+0.05, z: zOffset + 0.3 });
  boltHolepositions.push({ x: xVal+0.23, y: yVal+0.05, z: zOffset + 1.5 });
  boltHolepositions.push({ x: xVal+0.23, y: yVal+0.05, z: zOffset + 2.7 });
  boltHolepositions.push({ x: xVal+3.4, y: yVal+0.05, z: zOffset + 0.3 });
  boltHolepositions.push({ x: xVal+3.4, y: yVal+0.05, z: zOffset + 1.5 });
  boltHolepositions.push({ x: xVal+3.4, y: yVal+0.05, z: zOffset + 2.7 });

  var boltHoleMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  for (var i = 0; i < boltHolepositions.length; i++) {
    var boltHoleMesh = new THREE.Mesh(boltHoleGeometry, boltHoleMaterial);
    var boltHolePosition = boltHolepositions[i];
    boltHoleMesh.position.set(boltHolePosition.x, boltHolePosition.y, boltHolePosition.z);
    boltHoleMesh.updateMatrix();
    recessplate = CSG.subtract(recessplate, boltHoleMesh);
  }
modelGroup.add(recessplate);
}
function addStepPart3(index) {
  var zOffset = (stairBeamDepth - (+inputs[7].value / 100.0)) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: (+inputs[7].value / 100.0),
    bevelEnabled: false,
  };

  var xValOffset = ((+inputs[10].value / 100.0 )- stairStep1Width) / 2.0;
  var xVal = index * calFunctions.treadGoingCalculated() / 100.0 - xValOffset-1.18;
  var yVal = index * calFunctions.risePerStepCalculated() / 100.0 + stairStep1FrontHt + stairStep2Ht;
  var points = [
    new THREE.Vector3(xVal, yVal+0.1),
    new THREE.Vector3(xVal + (+inputs[10].value / 100.0 ) + (calFunctions.treadGoingCalculated() / 100.0) - 0.10, yVal+0.1),
    new THREE.Vector3(xVal +(+inputs[10].value / 100.0 ) + (calFunctions.treadGoingCalculated() / 100.0) - 0.10, yVal + (+inputs[9].value / 100.0)+0.1),
    new THREE.Vector3(xVal, yVal + (+inputs[9].value / 100.0)+0.1),
  ];
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[3].texture);

  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.01, 0.01);

  var mat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  // mesh.castShadow =true;

  modelGroup.add(mesh);
  
}
function addStepPart2(index) {
var zOffset = (stairBeamDepth - stairStep2Depth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: stairStep2Depth,
    bevelEnabled: false,
  };

  var xValOffset = (stairStep2Width - stairStep1Width) / 2.0;
  var xVal = index * calFunctions.treadGoingCalculated() / 100.0 - xValOffset;
  var yVal = index * calFunctions.risePerStepCalculated() / 100.0 + stairStep1FrontHt+0.08;

  var points = [
    new THREE.Vector3(xVal, yVal+0.12),
    new THREE.Vector3(xVal + stairStep2Width, yVal+0.12),
    new THREE.Vector3(xVal + stairStep2Width, yVal + stairStep2Ht+0.12),
    new THREE.Vector3(xVal, yVal + stairStep2Ht+0.12),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );
  var color = sessionStorage.getItem("color")
  var texture = sessionStorage.getItem("texture")
  var frameTexture = new THREE.TextureLoader().load(texture);

  var frameTexture = new THREE.TextureLoader().load(colors[6].texture);
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);
  }
  var mat;
  if (selects[2].value == "colors") {
    if (texture) {
      frameTexture = new THREE.TextureLoader().load(texture);
      frameTexture.wrapS = THREE.RepeatWrapping;
      frameTexture.wrapT = THREE.RepeatWrapping;
      frameTexture.repeat.set(0.05, 0.05);
      mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
    } else {
      mat = new THREE.MeshPhongMaterial({ color: color });
    }
  } else {
    frameTexture.wrapS = THREE.RepeatWrapping;
    frameTexture.wrapT = THREE.RepeatWrapping;
    frameTexture.repeat.set(0.05, 0.05);
    mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  }

  var plate = new THREE.Mesh(geom, mat);
  plate.translateZ(zOffset);
  plate.updateMatrix();
  

var boltHoleRadius = 0.06; 
  var boltHoleHeight = 0.11
  var boltHoleGeometry = new THREE.CylinderGeometry(boltHoleRadius, boltHoleRadius, boltHoleHeight, 9);
  var boltHolepositions = [];

  var boltHoleX = xVal + (0.1) * (stairStep2Width / 2);
  var boltHoleY = yVal + stairStep2Ht / 2;

  boltHolepositions.push({ x: boltHoleX + 0.1, y: boltHoleY + 0.12, z: zOffset + 0.3 });
  boltHolepositions.push({ x: boltHoleX + 1.3, y: boltHoleY + 0.12, z: zOffset + 0.3 });
  boltHolepositions.push({ x: boltHoleX + 0.1, y: boltHoleY + 0.12, z: zOffset + 1.6 });
  boltHolepositions.push({ x: boltHoleX + 1.3, y: boltHoleY + 0.12, z: zOffset + 1.6 });
  boltHolepositions.push({ x: boltHoleX + 0.1, y: boltHoleY + 0.12, z: zOffset + 4 });
  boltHolepositions.push({ x: boltHoleX + 1.3, y: boltHoleY + 0.12, z: zOffset + 4 });
  boltHolepositions.push({ x: boltHoleX + 0.1, y: boltHoleY + 0.12, z: zOffset + 5.4 });
  boltHolepositions.push({ x: boltHoleX + 1.3, y: boltHoleY + 0.12, z: zOffset + 5.4 });

  var boltHoleMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  for (var i = 0; i < boltHolepositions.length; i++) {
    var boltHoleMesh = new THREE.Mesh(boltHoleGeometry, boltHoleMaterial);
    var boltHolePosition = boltHolepositions[i];
    boltHoleMesh.position.set(boltHolePosition.x, boltHolePosition.y, boltHolePosition.z);
    boltHoleMesh.updateMatrix();
    plate = CSG.subtract(plate, boltHoleMesh);
  }

  var boxShape = new THREE.Shape();
boxShape.moveTo(-0.4, -0.055);
boxShape.lineTo(-0.4, 0.055);
boxShape.lineTo(0.4, 0.055);
boxShape.lineTo(0.4, -0.055);
boxShape.lineTo(-0.4, -0.055);

var extrudeSettings = {
  depth:0.8, 
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.1,
  bevelOffset: 0,
  bevelSegments: 10, 
};

var boxholegeometry = new THREE.ExtrudeGeometry(boxShape, extrudeSettings);
var boxholematerial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
var boxholemesh = new THREE.Mesh(boxholegeometry, boxholematerial);
boxholemesh.position.set(xVal + 0.8, yVal + 0.16, zOffset + 2.4);
boxholemesh.updateMatrix();
plate = CSG.subtract(plate, boxholemesh);
  modelGroup.add(plate);
} 
function addStepPart1(xVal, yVal) {
  var zOffset = (stairBeamDepth - stairStepDepth) /2.0;

  var width = 1;
  var frontHt = 1.6;
  var backHt = 0.70;

  var extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 10,
  };

  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + width, yVal + backHt),
    new THREE.Vector3(xVal + width, yVal + frontHt),
    new THREE.Vector3(xVal, yVal + frontHt),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );
  var color = sessionStorage.getItem("color")
  var texture = sessionStorage.getItem("texture")
  var frameTexture = new THREE.TextureLoader().load(texture);

  var frameTexture = new THREE.TextureLoader().load(colors[6].texture);
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);

  }
  var mat;
  if (selects[2].value == "colors") {
    if (texture) {
      frameTexture = new THREE.TextureLoader().load(texture);
      frameTexture.wrapS = THREE.RepeatWrapping;
      frameTexture.wrapT = THREE.RepeatWrapping;
      frameTexture.repeat.set(0.05, 0.05);
      mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
    } else {
      mat = new THREE.MeshPhongMaterial({ color: color });
    }
  } else {
    frameTexture.wrapS = THREE.RepeatWrapping;
    frameTexture.wrapT = THREE.RepeatWrapping;
    frameTexture.repeat.set(0.05, 0.05);
    mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  }

  var mesh = new THREE.Mesh(geom, mat);
  mesh.translateZ(zOffset);
  mesh.updateMatrix();


var zOffset1 = (stairBeamDepth - stairStepDepth) /1.95;
  var width1=0.99

  var extrudeSettings = {
    steps: 1,
    depth: 0.98,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 10,
  };

  var points1 = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + width1, yVal + backHt),
    new THREE.Vector3(xVal + width1, yVal + frontHt),
    new THREE.Vector3(xVal, yVal + frontHt),
  ];

  var geom1 = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points1),
    extrudeSettings
  );
  var frameTexture = new THREE.TextureLoader().load(colors[6].texture);
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);

  }
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat1 = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });

  var mesh1 = new THREE.Mesh(geom1, mat1);
  mesh1.translateZ(zOffset1);
  mesh1.updateMatrix();
  const subRes2 = CSG.subtract(mesh,mesh1);
modelGroup.add(subRes2);
  var geo = new THREE.EdgesGeometry( mesh.geometry );
var mat = new THREE.LineBasicMaterial( { color:  0x111111} );
var wireframe = new THREE.LineSegments( geo, mat );
subRes2.add( wireframe );

}
var stairWholeW = 0;
var stairAngleDeg;
function addSupport() {
  stairAngleDeg = calFunctions.stairAngleCalculated();
  var stairBeamWidth = 1.5;
  var totalStairHt;
  var points; 
  if (inputs[12].checked == true)
  {
    totalStairHt=((((calFunctions.risePerStepCalculated() / 100.0 * 100) * calFunctions.treadCountCalculated()) + calFunctions.topRiserFaceCalculated()) / 100.0)-(+inputs[6].value/100)-0.60;
  }
  else{
    totalStairHt=((((calFunctions.risePerStepCalculated() / 100.0 * 100) * calFunctions.treadCountCalculated()) + calFunctions.topRiserFaceCalculated()) / 100.0)+0.85-(+inputs[6].value/100);

  }
  if(inputs[1].value<325)
  {
    totalStairHt=((((calFunctions.risePerStepCalculated() / 100.0 * 100) * calFunctions.treadCountCalculated()) + calFunctions.topRiserFaceCalculated()) / 100.0)-(+inputs[6].value/100);
  }
  if(inputs[1].value<325 &&inputs[11].checked == true)
  {
    totalStairHt=((((calFunctions.risePerStepCalculated() / 100.0 * 100) * calFunctions.treadCountCalculated()) + calFunctions.topRiserFaceCalculated()) / 100.0)-(+inputs[6].value/100)-1.35;
  }
  if(inputs[1].value<325 &&inputs[11].checked == true&&inputs[8].value>250)
  {
    totalStairHt=((((calFunctions.risePerStepCalculated() / 100.0 * 100) * calFunctions.treadCountCalculated()) + calFunctions.topRiserFaceCalculated()) / 100.0)-(+inputs[6].value/100)-1.10;
  }
  // Bottom section
  var ra = stairBeamWidth * Math.sin(THREE.Math.degToRad(90 - stairAngleDeg));
  var rb = stairBeamWidth * Math.cos(THREE.Math.degToRad(90 - stairAngleDeg));
  var lb = ra / Math.tan(THREE.Math.degToRad(stairAngleDeg));
  var baseWidth = rb + lb;

  var stairWholeWidth =
    totalStairHt / Math.tan(THREE.Math.degToRad(stairAngleDeg));
  stairWholeW = stairWholeWidth;

  // Top Section
  var tRa = baseWidth * Math.tan(THREE.Math.degToRad(stairAngleDeg));
  var h2 = totalStairHt - tRa; //Point 3  

  var extrudeSettings = {
    steps: 1,
    depth: 1.5,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 10,
  };

  
  if(inputs[1].value<325)
  {
 points = [
    new THREE.Vector3(0,0),
    new THREE.Vector3(baseWidth, 0),
    new THREE.Vector3(stairWholeWidth+1.10, h2+1.10),
    new THREE.Vector3(stairWholeWidth+1.10, totalStairHt+1.10),
  ];
}
else{
  points = [
    new THREE.Vector3(0,0),
    new THREE.Vector3(baseWidth, 0),
    new THREE.Vector3(stairWholeWidth, h2),
    new THREE.Vector3(stairWholeWidth, totalStairHt),
  ];
}
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );
  var color = sessionStorage.getItem("color")
  var texture = sessionStorage.getItem("texture")
  var frameTexture = new THREE.TextureLoader().load(texture);

  if (selects[2].value == "2727714G") {
    frameTexture = new THREE.TextureLoader().load(colors[6].texture);

  }
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);

  }
  var mat;
  if (selects[2].value == "colors") {
    if (texture) {
      frameTexture = new THREE.TextureLoader().load(texture);
      frameTexture.wrapS = THREE.RepeatWrapping;
      frameTexture.wrapT = THREE.RepeatWrapping;
      frameTexture.repeat.set(0.05, 0.05);
      mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
    } else {
      mat = new THREE.MeshPhongMaterial({ color: color });
    }
  } else {
    frameTexture.wrapS = THREE.RepeatWrapping;
    frameTexture.wrapT = THREE.RepeatWrapping;
    frameTexture.repeat.set(0.05, 0.05);
    mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  }

  var mesh = new THREE.Mesh(geom, mat);
  modelGroup.add(mesh);
  var geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
var mat = new THREE.LineBasicMaterial( { color: 0x111111} );
var wireframe = new THREE.LineSegments( geo, mat );
mesh.add( wireframe );
}
function MountingPlate1() {

  var MountPlatedepth = 350 / 100.0;
  var zOffset = (stairBeamDepth - MountPlatedepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth:MountPlatedepth,
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()+(+inputs[6].value / 100.0) + (+inputs[5].value / 100.0)-0.80;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()+(+inputs[9].value / 100.0)+1.30 ;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal+MountingPlatewidth , yVal),
     new THREE.Vector3(xVal+MountingPlatewidth , yVal-MountingPlate1Ht),
     new THREE.Vector3(xVal, yVal-MountingPlate1Ht),
  ];
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );
   
  var frameTexture = new THREE.TextureLoader().load(colors[6].texture);
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);

  }
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  var mountingplate = new THREE.Mesh(geom, mat);
  mountingplate.translateZ(zOffset);
  mountingplate.updateMatrix();

var boltHoleRadius = 0.06; 
var boltHoleHeight = 0.3
var boltHoleGeometry = new THREE.CylinderGeometry(boltHoleRadius, boltHoleRadius, boltHoleHeight, 32);
var boltHolepositions = [];

boltHolepositions.push({ x: xVal+0.1, y: yVal-0.2, z: zOffset + 0.3 });
boltHolepositions.push({ x: xVal+0.1, y: yVal-0.2, z: zOffset + 1.8 });
boltHolepositions.push({ x: xVal+0.1, y: yVal-0.2, z: zOffset + 3.3 });
boltHolepositions.push({ x: xVal+0.1, y: yVal-1, z: zOffset + 0.3 });
boltHolepositions.push({ x: xVal+0.1, y: yVal-1, z: zOffset + 1.8 });
boltHolepositions.push({ x: xVal+0.1, y: yVal-1, z: zOffset + 3.3 });


var boltHoleMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });


for (var i = 0; i < boltHolepositions.length; i++) {
  var boltHoleMesh = new THREE.Mesh(boltHoleGeometry, boltHoleMaterial);
  var boltHolePosition = boltHolepositions[i];
  boltHoleMesh.position.set(boltHolePosition.x, boltHolePosition.y, boltHolePosition.z);
  boltHoleMesh.rotation.set(0, 0, Math.PI/2);
  boltHoleMesh.updateMatrix();
  mountingplate = CSG.subtract(mountingplate, boltHoleMesh);
}


modelGroup.add(mountingplate);
}
function MountingPlate2() {
  var MountPlatedepth = 200 / 100.0;
  var zOffset = (stairBeamDepth - MountPlatedepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth:MountPlatedepth,
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()+(+inputs[6].value / 100.0) + (+inputs[5].value / 100.0)-0.80;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()+(+inputs[9].value / 100.0) ;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal+MountingPlatewidth , yVal),
     new THREE.Vector3(xVal+MountingPlatewidth , yVal-MountingPlate2Ht),
     new THREE.Vector3(xVal, yVal-MountingPlate2Ht),
  ];
  if(inputs[1].value<325)
  {
    points = [
      new THREE.Vector3(xVal, yVal),
      new THREE.Vector3(xVal+MountingPlatewidth , yVal),
       new THREE.Vector3(xVal+MountingPlatewidth, yVal-(+inputs[1].value / 100.0/2)),
       new THREE.Vector3(xVal, yVal-(+inputs[1].value / 100.0/2)),
    ];
  }
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var frameTexture = new THREE.TextureLoader().load(colors[6].texture);
  if (selects[2].value == "2603167M") {
    frameTexture = new THREE.TextureLoader().load(colors[7].texture);

  } if (selects[2].value == "27219319") {
    frameTexture = new THREE.TextureLoader().load(colors[8].texture);
  }
  if (selects[2].value == "2607556M") {
    frameTexture = new THREE.TextureLoader().load(colors[9].texture);

  }
  if (selects[2].value == "2607257S") {
    frameTexture = new THREE.TextureLoader().load(colors[10].texture);

  }
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  var mesh = new THREE.Mesh(geom, mat);
  mesh.translateZ(zOffset);
  modelGroup.add(mesh);
}
function addPlate() {
  var zOffset = (stairBeamDepth - (+inputs[7].value / 100.0)) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: (+inputs[7].value / 100.0),
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() - 0.70;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated() - 0.17;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + (+inputs[5].value / 100.0), yVal),
    new THREE.Vector3(xVal + (+inputs[5].value / 100.0), yVal  + (+inputs[9].value / 100.0) + 1.55),
    new THREE.Vector3(xVal, yVal + (+inputs[9].value / 100.0) + 1.55),
  ];
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);

  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;

  var mat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;

  modelGroup.add(mesh);
}
function addPlateTop() {
  var zOffset = (stairBeamDepth - (+inputs[7].value / 100.0)) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: (+inputs[7].value / 100.0),
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() - 0.7;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()  + (+inputs[9].value / 100.0) + 1.56;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + 1, yVal),
    new THREE.Vector3(xVal + 1, yVal + (+inputs[2].value / 100.0 * -1)),
    new THREE.Vector3(xVal, yVal + (+inputs[2].value / 100.0 * -1)),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);

  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;

  var mat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;

  modelGroup.add(mesh);
}
function addTop() {
  var TopWidth = 500 / 100.0;
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };
  console.log(inputs[6].value / 100)
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[6].value / 100.0) + (+inputs[5].value / 100.0) - 0.60;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[1].value / 100.0 * -1) + (+inputs[9].value / 100.0) + (+inputs[2].value / 100.0 * -1) + 1.55;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + TopWidth, yVal),
    new THREE.Vector3(xVal + TopWidth, yVal-0.20),
    new THREE.Vector3(xVal, yVal-0.20),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);

  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  var color = 0xffffff

  var mat = new THREE.MeshPhongMaterial({ color: color });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;

modelGroup.add(mesh);
}
function addTopbox() {
  var TopBoxWidth = 250/ 100.0;
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;
  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[6].value / 100.0) + (+inputs[5].value / 100.0) - 0.60;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()  + (+inputs[9].value / 100.0) + (+inputs[2].value / 100.0 * -1) + 1.55;
  var points = [
    new THREE.Vector3(xVal, yVal + (+inputs[3].value / 100.0 * -1)),
    new THREE.Vector3(xVal + TopBoxWidth, yVal + (+inputs[3].value / 100.0 * -1)),
    new THREE.Vector3(xVal + TopBoxWidth, yVal + (+inputs[1].value / 100.0 * -1)),
    new THREE.Vector3(xVal, yVal + (+inputs[1].value / 100.0 * -1)),

  ];
  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );
  var frameTexture = new THREE.TextureLoader().load(colors[3].texture);
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);
  var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50, color: 0xb87333 });
  if (selects[0].value == "concreteslab") {
    frameTexture = new THREE.TextureLoader().load(colors[4].texture);
    frameTexture.wrapS = THREE.RepeatWrapping;
    frameTexture.wrapT = THREE.RepeatWrapping;
    frameTexture.repeat.set(0.05, 0.05);
    var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  }
  if (selects[0].value == "metaljoist") {
    frameTexture = new THREE.TextureLoader().load(colors[5].texture);
    frameTexture.wrapS = THREE.RepeatWrapping;
    frameTexture.wrapT = THREE.RepeatWrapping;
    frameTexture.repeat.set(0.05, 0.05);
    var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50 });
  }

  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;

  modelGroup.add(mesh);
}
function addLowerSubFloor() {
  var LowerSubFloorWidth = 500 / 100.0;
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[6].value / 100.0) + (+inputs[5].value / 100.0) - 0.60;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()  + (+inputs[9].value / 100.0) + (+inputs[2].value / 100.0 * -1) + 1.55;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + LowerSubFloorWidth, yVal),
    new THREE.Vector3(xVal + LowerSubFloorWidth, yVal + (+inputs[3].value / 100.0 * -1)),
    new THREE.Vector3(xVal, yVal + (+inputs[3].value / 100.0 * -1)),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  var frameTexture = new THREE.TextureLoader().load(colors[3].texture);
  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 50, color: 0xb87333 });
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;
if(inputs[3].value==0)
{
  scene.remove(mesh);
}
else{
  modelGroup.add(mesh);
}
}
function addTopConcreteSlab() {
  var TopConcreteSlabWidth = 500 / 100.0;
  var zOffset = (stairBeamDepth - floorDepth) / 2.0;

  var extrudeSettings = {
    steps: 1,
    depth: floorDepth,
    bevelEnabled: false,
  };
  var xVal = calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated() + 0.30;
  var yVal = calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()  + (+inputs[9].value / 100.0) + 1.56;
  var points = [
    new THREE.Vector3(xVal, yVal),
    new THREE.Vector3(xVal + TopConcreteSlabWidth, yVal),
    new THREE.Vector3(xVal + TopConcreteSlabWidth, yVal + (+inputs[2].value / 100.0 * -1)),
    new THREE.Vector3(xVal, yVal + (+inputs[2].value / 100.0 * -1)),
  ];

  var geom = new THREE.ExtrudeBufferGeometry(
    new THREE.Shape(points),
    extrudeSettings
  );

  const frameTexture = new THREE.TextureLoader().load(colors[1].texture);

  frameTexture.wrapS = THREE.RepeatWrapping;
  frameTexture.wrapT = THREE.RepeatWrapping;
  frameTexture.repeat.set(0.05, 0.05);

  var mat = new THREE.MeshPhongMaterial({ map: frameTexture, shininess: 10});                     //color: 0x43464b 
  var mesh = new THREE.Mesh(geom, mat);

  mesh.translateZ(zOffset);
  mesh.castShadow = true;

  modelGroup.add(mesh);
}



const p = document.querySelectorAll("p")
console.log(calFunctions.treadCountCalculated());
p[0].innerHTML = `${calFunctions.treadCountCalculated()}`
p[1].innerHTML = `${calFunctions.risePerStepCalculated().toFixed(1)} mm`
p[2].innerHTML = `${calFunctions.stairAngleCalculated().toFixed(1)} °`
p[3].innerHTML = `${Math.round(Math.sqrt(((calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()) * (calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated())) + ((calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()) * (calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()))) * 100)} mm`
p[4].innerHTML = `${(calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[1].value / 100.0 * -1) + (+inputs[9].value / 100.0) + (+inputs[2].value / 100.0 * -1) + 1.55) * 100} mm`
p[5].innerHTML = `${calFunctions.f2fFinished()} mm`
p[6].innerHTML = `${inputs[8].value} mm`
p[7].innerHTML = `${inputs[2].value} mm`
p[8].innerHTML = `${inputs[4].value} mm`
p[9].innerHTML = `${calFunctions.overallGoingCalculated().toFixed(1)} mm`
p[10].innerHTML = `${2 * calFunctions.risePerStepCalculated() + calFunctions.treadGoingCalculated()} `

function handleFieldValues(fieldValues) {
  if (fieldValues.floortofloor > 3420) {
    inputs[0].value = 3420
  }
  if (fieldValues.floortofloor < 1000) {
    inputs[0].value = 1000
  }
  if (fieldValues.headerthickness > 500) {
    inputs[1].value = 500
  }
  if (fieldValues.headerthickness < 200) {
    inputs[1].value = 200
  }
  if (fieldValues.futuretopfloorcoveringthickness > 100) {
    inputs[2].value = 100
  }
  if (fieldValues.futuretopfloorcoveringthickness < 1) {
    inputs[2].value = 1
  }
  if (fieldValues.uppersubfloorthickness > 100) {
    inputs[3].value = 100
  }
  if (fieldValues.uppersubfloorthickness < 0) {
    inputs[3].value = 0
  }
  if (fieldValues.futurelowerfloorcoveringthickness > 100) {
    inputs[4].value = 100
  }
  if (fieldValues.futurelowerfloorcoveringthickness < 1) {
    inputs[4].value = 1
  }
  if (fieldValues.topriserthickness > 100) {
    inputs[5].value = 100
  }
  if (fieldValues.topriserthickness < 1) {
    inputs[5].value = 1
  }
  if (fieldValues.topriserpackout >180) {
    inputs[6].value = 180
  }
  if (fieldValues.topriserpackout < 1) {
    inputs[6].value = 1
  }
  if (fieldValues.treadlength > 1500) {
    inputs[7].value = 1500
  }
  if (fieldValues.treadlength < 600) {
    inputs[7].value = 600
  }
  if (fieldValues.treadgoing > 355) {
    inputs[8].value = 355
  }
  if (fieldValues.treadgoing < 240) {
    inputs[8].value = 240
  }
  if (fieldValues.treadthickness > 190) {
    inputs[9].value = 190
  }
  if (fieldValues.treadthickness < 30) {
    inputs[9].value = 30
  }
  if (fieldValues.treadoverhang > 50) {
    inputs[10].value = 50
  }
  if (fieldValues.treadoverhang < 10) {
    inputs[10].value = 10
  }
}
const inp = document.querySelectorAll('input, select');
inp.forEach(input => {
  input.addEventListener('change', (event) => {
    modelGroup.remove(...modelGroup.children)
    const value = event.target.value;
    const type = event.target.type;
    const name = event.target.name;
    if (type === 'radio') {
      fieldValues[name] = event.target.checked;
    } else {
      fieldValues[name] = value;
    }

    if (selects[2].value == "colors") {
      colorinput.style.display = "block"
    } else if (selects[2].value == "2727714G") {
      colorinput.value = "#FFFDFA"
      colorinput.style.display = "none"
      sessionStorage.setItem("texture", colors[6].texture)
    }
    else if (selects[2].value == "2603167M") {
      colorinput.value = "#FDFBF9"
      colorinput.style.display = "none"
      sessionStorage.setItem("texture", colors[7].texture)

    } else if (selects[2].value == "27219319") {
      colorinput.value = "#252324"
      colorinput.style.display = "none"
      sessionStorage.setItem("texture", colors[8].texture)

    }
    else if (selects[2].value == "2607556M") {
      colorinput.value = "#504e4e"
      colorinput.style.display = "none"
      sessionStorage.setItem("texture", colors[9].texture)

    }
    else if (selects[2].value == "2607257S") {
      colorinput.value = "#84898c"
      colorinput.style.display = "none"
      sessionStorage.setItem("texture", colors[10].texture)
    }
    handleFieldValues(fieldValues);
    Steps();
    addSupport();
    MountingPlate1();
    MountingPlate2();
    addPlate();
    addPlateTop();
    addTop();
    addTopbox();
    addLowerSubFloor();
    addTopConcreteSlab();
    addRecessPlate();
    addGroundSubFloor();
    addGroundFloorStart();
    addGroundFloorEnd();
    addConcreteFloor();
    p[0].innerHTML = `${calFunctions.treadCountCalculated()}`
    p[1].innerHTML = `${calFunctions.risePerStepCalculated().toFixed(1)} mm`
    p[2].innerHTML = `${calFunctions.stairAngleCalculated().toFixed(1)} °`
    p[3].innerHTML = `${Math.round(Math.sqrt(((calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated()) * (calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated())) + ((calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()) * (calFunctions.treadGoingCalculated() / 100.0 * calFunctions.treadCountCalculated()))) * 100)} mm`
    p[4].innerHTML = `${Math.round((calFunctions.risePerStepCalculated() / 100.0 * calFunctions.treadCountCalculated() + (+inputs[1].value / 100.0 * -1) + (+inputs[9].value / 100.0) + (+inputs[2].value / 100.0 * -1) + 1.55) * 100)} mm`
    p[5].innerHTML = `${calFunctions.f2fFinished()} mm`
    p[6].innerHTML = `${inputs[8].value} mm`
    p[7].innerHTML = `${inputs[2].value} mm`
    p[8].innerHTML = `${inputs[4].value} mm`
    p[9].innerHTML = `${calFunctions.overallGoingCalculated().toFixed(1)} mm`
    p[10].innerHTML = `${Math.round(2 * calFunctions.risePerStepCalculated() + calFunctions.treadGoingCalculated())} `
    var message = 2 * calFunctions.risePerStepCalculated() + calFunctions.treadGoingCalculated()
    if (message > 700 || message < 550) {
      alert("Stair is exceeded the Australian standards for slope relationship")
    }
    
    scene.add(hemiLight);
    scene.add(hemiLight1);
    scene.add(light);
    scene.add(camera);
  });
});
const fieldValues = {};

$('.sp-item img').on('click', function () {
  var this$ = $(this).parent();
  var gen_cont_shown = $('.gen-content').hasClass('show');
  if (gen_cont_shown)
    $('.gen-content').removeClass('show')
  if (!gen_cont_shown)
    this$.parent().find('.gen-content').addClass('show')
});

