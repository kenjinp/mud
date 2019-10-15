import * as THREE from "three";
import { OrbitControls } from "@avatsaev/three-orbitcontrols-ts";

export interface Transform {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

// A simple world renderer.
export default class World {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  public size: [number, number];
  private worldObjects: {
    [uuid: string]: THREE.Object3D;
  };
  constructor(
    canvas: HTMLCanvasElement,
    cameraPostion: number[],
    { onCameraChange }: { onCameraChange: (event: Event) => void }
  ) {
    this.worldObjects = {};
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMapSoft = true;
    this.size = [canvas.clientWidth, canvas.clientHeight];
    this.renderer.setSize(...this.size);

    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      1000
    );

    this.camera.name = "debug-camera";

    (this.camera.position.set as any)(...cameraPostion);
    this.scene.add(this.camera);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    controls.addEventListener("change", onCameraChange);

    const starsGeometry = new THREE.Geometry();

    // this.scene.add(makeSpear());

    for (let i = 0; i < 5000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(2000);
      star.y = THREE.Math.randFloatSpread(2000);
      star.z = THREE.Math.randFloatSpread(2000);

      starsGeometry.vertices.push(star);
    }

    const starsMaterial = new THREE.PointsMaterial({ color: 0xfee2f8 });

    const starsGeometry2 = new THREE.Geometry();
    for (let i = 0; i < 5000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(2000);
      star.y = THREE.Math.randFloatSpread(2000);
      star.z = THREE.Math.randFloatSpread(2000);

      starsGeometry2.vertices.push(star);
    }

    const starsMaterial2 = new THREE.PointsMaterial({ color: 0x00bcd4 });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    const starField2 = new THREE.Points(starsGeometry2, starsMaterial2);
    this.scene.add(starField);
    this.scene.add(starField2);

    // const rot = new THREE.Vector3(0, 1, 1);
    // this.camera.quaternion.setFromAxisAngle(rot, Math.PI / 2);

    const groundGeo = new THREE.PlaneGeometry(100, 100, 10);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x65c34a,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    const rot = new THREE.Vector3(1, 0, 0);
    ground.quaternion.setFromAxisAngle(rot, Math.PI / 2);
    ground.receiveShadow = true;
    // this.scene.add(ground);

    // LIGHTS
    this.scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(300, 400, 50);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;

    this.scene.add(light);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    window.addEventListener(
      "resize",
      () => {
        this.size = [window.innerWidth, window.innerHeight];
        // TODO maybe cycle through all cameras
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );
  }

  update(delta: number) {
    this.renderer.render(this.scene, this.camera);
    return this;
  }

  updateCameraBox(uuid: string) {}

  getWorldObjectByUUID(uuid: string) {
    return this.worldObjects[uuid] || null;
  }
}
