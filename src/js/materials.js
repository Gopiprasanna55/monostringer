import * as THREE from "three";


var LibraryMaterial = (function () {
    function LibraryMaterial(name, type, color, opacity, diffuseImage, normalMapImage, roughnessMapImage, bumpMapImage, textureSize, roughness, metalness) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.opacity = opacity;
        this.diffuseImage = diffuseImage;
        this.normalMapImage = normalMapImage;
        this.roughnessMapImage = roughnessMapImage;
        this.bumpMapImage = bumpMapImage;
        this.textureSize = textureSize;
        this.roughness = roughness;
        this.metalness = metalness;
        this.material = null;
        if (type != "Texture")
            this.textureSize = 1000;
    }
    return LibraryMaterial;
}());
var LibraryMaterials = (function () {
    function LibraryMaterials() {
        this.loader = new THREE.ImageLoader();
        this.init();
    }
    LibraryMaterials.prototype.init = function () {
        this.materials = [
            new LibraryMaterial("Metal gray", "Flat", 0x707070, 0, "", "", "", "", 0, 0.4, 0.4),
            new LibraryMaterial("Flat gray", "Flat", 0x707070, 0),
            new LibraryMaterial("Red", "Flat", 0xff0000, 0),
            new LibraryMaterial("Brown", "Flat", 0xb68148, 0),
            new LibraryMaterial("Blue", "Flat", 0x4650b8, 0),
            new LibraryMaterial("Painted white", "Flat", 0xffffff, 0),
            new LibraryMaterial("Glass 1", "Clear", 0x707070, 0.5),
            new LibraryMaterial("Glass 2", "Clear", 0xcccccc, 0.5),
            new LibraryMaterial("Glass 3", "Clear", 0xcccccc, 0.2),
            new LibraryMaterial("Glass 4", "Clear", 0x202020, 0.5),
            new LibraryMaterial("Bricks", "Texture", 0, 0, "brick_diffuse.jpg", "", "", "brick_bump.jpg", 2800, 1),
            new LibraryMaterial("Hardwood flooring", "Texture", 0, 0, "hardwood2_diffuse.jpg", "", "hardwood2_diffuse.jpg", "hardwood2_bump.jpg", 1200, .35),
            new LibraryMaterial("Wood", "Texture", 0, 0, "bamboo-diffuse.jpg", "bamboo-normal.jpg", "bamboo-roughness.jpg", "", 610, .35),
            new LibraryMaterial("Dark wood", "Texture", 0, 0, "seamless-wood-1.jpg", "bamboo-normal.jpg", "bamboo-roughness.jpg", "", 1000, .35),
            new LibraryMaterial("Light wood", "Texture", 0, 0, "seamless-wood-4.jpg", "bamboo-normal.jpg", "bamboo-roughness.jpg", "", 1000, .35),
            new LibraryMaterial("Carpet 1", "Texture", 0, 0, "seamless-carpet-1.jpg", "", "", "", 300, 1),
            new LibraryMaterial("Carpet 2", "Texture", 0, 0, "seamless-carpet-2.jpg", "", "", "", 200, 1),
            new LibraryMaterial("Concrete paving 104", "Texture", 0, 0, "stone_0104_c.jpg", "", "", "", 610, 1),
            new LibraryMaterial("Sandstone tiles", "Texture", 0, 0, "sandstone-diffuse.jpg", "", "", "sandstone-bump.jpg", 950, 1),
            new LibraryMaterial("UV Test", "Texture", 0, 0, "uv-checker-large.png", "", "", "", 336, 1),
            new LibraryMaterial("Pine", "Texture", 0, 0, "P22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Maple", "Texture", 0, 0, "M22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Victorian Ash", "Texture", 0, 0, "A22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Blackbutt", "Texture", 0, 0, "B22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Blue Gum", "Texture", 0, 0, "K22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("WA Karri", "Texture", 0, 0, "H22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Bamboo", "Texture", 0, 0, "L22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Spotted Gum", "Texture", 0, 0, "G22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Brush Box", "Texture", 0, 0, "X22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Grey Ironbark", "Texture", 0, 0, "E22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Jarrah", "Texture", 0, 0, "J22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Tallowood", "Texture", 0, 0, "R22.jpg", "", "", "", 500, .35),
            new LibraryMaterial("Turpentine", "Texture", 0, 0, "T22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Merbau", "Texture", 0, 0, "W22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("American Oak", "Texture", 0, 0, "O22.jpg", "", "", "", 400, .35),
            new LibraryMaterial("Baubuche", "Texture", 0, 0, "U22.jpg", "", "", "", 400, .35),
        ];
    };
    LibraryMaterials.prototype.getMaterialItem = function (materialName) {
        var materialItems = this.materials.filter(function (m) { return m.name.toUpperCase() == materialName.toUpperCase(); });
        if (materialItems.length != 1)
            return null;
        return materialItems[0];
    };
    LibraryMaterials.prototype.getMaterialItemTextureSize = function (materialName) {
        var materialItem = this.getMaterialItem(materialName);
        return materialItem != null ? materialItem.textureSize : 1000;
    };
    LibraryMaterials.prototype.getMaterial = function (materialName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var materialItem = _this.getMaterialItem(materialName);
            if (materialItem == null) {
                reject(materialName + " is not in the material library");
                return;
            }
            if (!!materialItem.material) {
                resolve(materialItem.material);
            }
            else {
                _this.initFlatMaterial(materialItem).then(function (material) {
                    materialItem.material = material;
                    resolve(material);
                });
            }
        });
    };
    LibraryMaterials.prototype.initFlatMaterial = function (materialItem) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (materialItem.type == "Texture") {
                var diffuseMap_1;
                var normalMap_1;
                var roughnessMap_1;
                var bumpMap_1;
                var hasDiffuse_1 = materialItem.diffuseImage.length > 0;
                var hasNormal_1 = materialItem.normalMapImage.length > 0;
                var hasRoughness_1 = materialItem.roughnessMapImage.length > 0;
                var hasBump_1 = materialItem.bumpMapImage.length > 0;
                var loadImages = [];
                if (hasDiffuse_1)
                    loadImages.push(_this.imageLoad(materialItem.diffuseImage).then(function (image) { return diffuseMap_1 = image; }));
                if (hasNormal_1)
                    loadImages.push(_this.imageLoad(materialItem.normalMapImage).then(function (image) { return normalMap_1 = image; }));
                if (hasRoughness_1)
                    loadImages.push(_this.imageLoad(materialItem.roughnessMapImage).then(function (image) { return roughnessMap_1 = image; }));
                if (hasBump_1)
                    loadImages.push(_this.imageLoad(materialItem.bumpMapImage).then(function (image) { return bumpMap_1 = image; }));
                Promise.all(loadImages).then(function () {
                    var materialOptions = {
                        roughness: !!materialItem.roughness ? materialItem.roughness : 0.25,
                        metalness: !!materialItem.metalness ? materialItem.metalness : 0,
                        normalScale: new THREE.Vector2(0.2, 0.2),
                    };
                    if (hasDiffuse_1) {
                        var diffuseMapTexture = new THREE.Texture();
                        diffuseMapTexture.image = diffuseMap_1;
                        diffuseMapTexture.anisotropy = 1;
                        diffuseMapTexture.wrapS = THREE.RepeatWrapping;
                        diffuseMapTexture.wrapT = THREE.RepeatWrapping;
                        diffuseMapTexture.needsUpdate = true;
                        materialOptions.map = diffuseMapTexture;
                    }
                    if (hasNormal_1) {
                        var normalMapTexture = new THREE.Texture();
                        normalMapTexture.image = normalMap_1;
                        normalMapTexture.wrapS = THREE.RepeatWrapping;
                        normalMapTexture.wrapT = THREE.RepeatWrapping;
                        normalMapTexture.needsUpdate = true;
                        materialOptions.normalMap = normalMapTexture;
                    }
                    if (hasRoughness_1) {
                        var roughnessMapTexture = new THREE.Texture();
                        roughnessMapTexture.image = roughnessMap_1;
                        roughnessMapTexture.wrapS = THREE.RepeatWrapping;
                        roughnessMapTexture.wrapT = THREE.RepeatWrapping;
                        roughnessMapTexture.needsUpdate = true;
                        materialOptions.roughnessMap = roughnessMapTexture;
                    }
                    if (hasBump_1) {
                        var bumpMapTexture = new THREE.Texture();
                        bumpMapTexture.image = bumpMap_1;
                        bumpMapTexture.wrapS = THREE.RepeatWrapping;
                        bumpMapTexture.wrapT = THREE.RepeatWrapping;
                        bumpMapTexture.needsUpdate = true;
                        materialOptions.bumpMap = bumpMapTexture;
                    }
                    resolve(new THREE.MeshStandardMaterial(materialOptions));
                });
            }
            else if (materialItem.type == "Flat") {
                resolve(new THREE.MeshStandardMaterial({
                    color: materialItem.color,
                    roughness: !!materialItem.roughness ? materialItem.roughness : 0.25,
                    metalness: !!materialItem.metalness ? materialItem.metalness : 0,
                }));
            }
            else if (materialItem.type == "Clear") {
                resolve(new THREE.MeshStandardMaterial({
                    color: materialItem.color,
                    transparent: true,
                    opacity: materialItem.opacity,
                    roughness: !!materialItem.roughness ? materialItem.roughness : 0.25,
                    metalness: !!materialItem.metalness ? materialItem.metalness : 0,
                }));
            }
            else
                reject(materialItem.type + " is not a valid material type");
        });
    };
    LibraryMaterials.prototype.imageLoad = function (filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loader.load(environmentData.AppRoot + "/Images/textures/" + filename, function (image) {
                resolve(image);
            });
        });
    };
    return LibraryMaterials;
}());

export {LibraryMaterial, LibraryMaterials};