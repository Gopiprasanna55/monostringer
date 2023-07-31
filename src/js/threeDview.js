var ThreeDView = (function () {
  function ThreeDView() {}
  ThreeDView.getHomeView = function (scene, camera, lookAt) {
    var offset = 1.85;
    var boundingBox = new THREE.Box3();
    var center = new THREE.Vector3();
    var size = new THREE.Vector3();
    boundingBox.setFromObject(lookAt);
    boundingBox.getCenter(center);
    boundingBox.getSize(size);
    var maxDim = Math.max(size.x, size.y, size.z);
    var fov = camera.fov * (Math.PI / 180);
    var cameraZ = Math.abs((maxDim / 2) * Math.tan(fov * 2));
    cameraZ *= offset; // zoom out a little so that objects don't fill the screen
    scene.updateMatrixWorld(true); // Update world positions
    var objectWorldPosition = new THREE.Vector3();
    objectWorldPosition.setFromMatrixPosition(lookAt.matrixWorld);
    var directionVector = new THREE.Vector3(1000, 1000, 1000).sub(
      objectWorldPosition
    ); // Get vector from camera to lookAt
    var unitDirectionVector = directionVector.normalize(); // Convert to unit vector
    var cameraPosition = unitDirectionVector.multiplyScalar(cameraZ); // Multiply unit vector times cameraZ distance
    var minZ = boundingBox.min.z;
    var cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;
    var view = new ThreeDView();
    view.cameraPosition = cameraPosition;
    view.cameraTarget = center;
    view.cameraFarPlane = cameraToFarEdge * 6;
    view.maxZoomDistance = cameraToFarEdge * 4;
    return view;
  };
  return ThreeDView;
})();



export { ThreeDView };
