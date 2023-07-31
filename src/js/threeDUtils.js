var ThreeDUtils = (function () {
  function ThreeDUtils() {}
  ThreeDUtils.calcRadians = function (degrees) {
    return (Math.PI / 180) * degrees;
  };
  ThreeDUtils.getTriFromOpp = function (theta, opp) {
    return { opp: opp, adj: opp / Math.tan(theta), hyp: opp / Math.sin(theta) };
  };
  ThreeDUtils.getTriFromAdj = function (theta, adj) {
    return { opp: adj * Math.tan(theta), adj: adj, hyp: adj / Math.cos(theta) };
  };
  ThreeDUtils.getTriFromHyp = function (theta, hyp) {
    return { opp: hyp * Math.sin(theta), adj: hyp * Math.cos(theta), hyp: hyp };
  };
  // Uses the other non-theta angle (what's that called??)
  ThreeDUtils.getTriFromOppInv = function (theta, opp) {
    return this.getTriFromOpp(this.halfPi - theta, opp);
  };
  ThreeDUtils.getTriFromAdjInv = function (theta, adj) {
    return this.getTriFromAdj(this.halfPi - theta, adj);
  };
  ThreeDUtils.getTriFromHypInv = function (theta, hyp) {
    return this.getTriFromHyp(this.halfPi - theta, hyp);
  };
  ThreeDUtils.convertGeometryToNonBuffered = function (mesh) {
    var geo = mesh.geometry;
    if (geo.isGeometry) return;
    mesh.geometry = new THREE.Geometry().fromBufferGeometry(geo);
  };
  // If we pass in textureSize, the UV will be mapped to allow the texture to tile over the geometry at the matching size
  ThreeDUtils.cubeMapUVs = function (
    mesh,
    textureSize,
    turnXFace,
    turnYFace,
    turnZFace,
    rotateFaceAxis,
    rotateFaceAmt
  ) {
    if (turnXFace === void 0) {
      turnXFace = false;
    }
    if (turnYFace === void 0) {
      turnYFace = false;
    }
    if (turnZFace === void 0) {
      turnZFace = false;
    }
    if (rotateFaceAxis === void 0) {
      rotateFaceAxis = "";
    }
    if (rotateFaceAmt === void 0) {
      rotateFaceAmt = 0;
    }
    this.convertGeometryToNonBuffered(mesh);
    var geometry = mesh.geometry;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (rotateFaceAmt != 0) {
      if (rotateFaceAxis == "x") geometry.rotateX(rotateFaceAmt);
      else if (rotateFaceAxis == "y") geometry.rotateY(rotateFaceAmt);
      else geometry.rotateZ(rotateFaceAmt);
    }
    var boundingBox;
    if (!!textureSize) {
      boundingBox = new THREE.Box3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(textureSize, textureSize, textureSize)
      );
    } else {
      geometry.computeBoundingBox();
      boundingBox = geometry.boundingBox;
    }
    var sz = boundingBox.getSize(new THREE.Vector3());
    var min = boundingBox.min;
    if (geometry.faceVertexUvs[0].length == 0) {
      for (var i = 0; i < geometry.faces.length; i++) {
        geometry.faceVertexUvs[0].push([
          new THREE.Vector2(),
          new THREE.Vector2(),
          new THREE.Vector2(),
        ]);
      }
    }
    for (var i = 0; i < geometry.faces.length; i++) {
      var face = geometry.faces[i];
      var faceUVs = geometry.faceVertexUvs[0][i];
      var va = geometry.vertices[face.a];
      var vb = geometry.vertices[face.b];
      var vc = geometry.vertices[face.c];
      var vab = new THREE.Vector3().copy(vb).sub(va);
      var vac = new THREE.Vector3().copy(vc).sub(va);
      //now we have 2 vectors to get the cross product of...
      var vcross = new THREE.Vector3().copy(vab).cross(vac);
      //Find the largest axis of the plane normal...
      vcross.set(Math.abs(vcross.x), Math.abs(vcross.y), Math.abs(vcross.z));
      var majorAxis =
        vcross.x > vcross.y
          ? vcross.x > vcross.z
            ? "x"
            : vcross.y > vcross.z
            ? "y"
            : vcross.y > vcross.z
          : vcross.y > vcross.z
          ? "y"
          : "z";
      //Take the other two axis from the largest axis
      var uAxis = void 0;
      var vAxis = void 0;
      if (majorAxis == "x") {
        if (turnXFace) {
          uAxis = "y";
          vAxis = "z";
        } else {
          uAxis = "z";
          vAxis = "y";
        }
      } else if (majorAxis == "y") {
        if (turnYFace) {
          uAxis = "z";
          vAxis = "x";
        } else {
          uAxis = "x";
          vAxis = "z";
        }
      } else {
        if (turnZFace) {
          uAxis = "y";
          vAxis = "x";
        } else {
          uAxis = "x";
          vAxis = "y";
        }
      }
      faceUVs[0].set(
        (va[uAxis] - min[uAxis]) / sz[uAxis],
        (va[vAxis] - min[vAxis]) / sz[vAxis]
      );
      faceUVs[1].set(
        (vb[uAxis] - min[uAxis]) / sz[uAxis],
        (vb[vAxis] - min[vAxis]) / sz[vAxis]
      );
      faceUVs[2].set(
        (vc[uAxis] - min[uAxis]) / sz[uAxis],
        (vc[vAxis] - min[vAxis]) / sz[vAxis]
      );
    }
    if (rotateFaceAmt != 0) {
      if (rotateFaceAxis == "x") geometry.rotateX(-rotateFaceAmt);
      else if (rotateFaceAxis == "y") geometry.rotateY(-rotateFaceAmt);
      else geometry.rotateZ(-rotateFaceAmt);
    }
    geometry.elementsNeedUpdate = geometry.verticesNeedUpdate = true;
  };
  ThreeDUtils.halfPi = Math.PI / 2;
  return ThreeDUtils;
})();

export { ThreeDUtils };
