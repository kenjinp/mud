import * as THREE from "three";
import { Object3D, Mesh, Color } from "three";

import { SpriteText2D, textAlign } from "three-text2d";

const cubeGeo = new THREE.BoxGeometry(1, 1, 1);

export default class Avatar extends Object3D {
  private mesh: Mesh;
  private nameTag: SpriteText2D;
  constructor(options?: { name?: string; color?: number }) {
    const { color, name } = options || {};
    super();
    const material = new THREE.MeshBasicMaterial({ color: color || 0x00ff00 });
    this.makeNameTag(name || "unknown");

    this.mesh = new THREE.Mesh(cubeGeo, material);
    this.add(this.mesh);
  }

  public setColor(color: Color) {
    this.mesh.material = new THREE.MeshBasicMaterial({ color });
  }

  public setName(name: string) {
    this.makeNameTag(name);
  }

  makeNameTag(name: string) {
    this.remove(this.nameTag);
    this.nameTag = new SpriteText2D(name || "unknown", {
      align: textAlign.center,
      font: "20px Arial",
      fillStyle: "#000000",
      shadowColor: "#ffffff",
      shadowBlur: 2,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      antialias: false
    });
    this.nameTag.scale.set(0.01, 0.01, 0.01);
    this.nameTag.position.set(0, 1, 0);
    this.add(this.nameTag);
  }

  update(delta?: number) {
    return this;
  }
}
