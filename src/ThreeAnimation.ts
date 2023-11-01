import * as THREE from "three";
import { FrameHandler } from "./FrameHandler";

export class ThreeAnimation {
  public frameHandler: FrameHandler;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshLambertMaterial;
  private cube: THREE.Mesh;
  private light: THREE.DirectionalLight;

  private animate(delta: number) {
    this.cube.rotation.x += 0.01 * delta;
    this.cube.rotation.y += 0.01 * delta;
    this.renderer.render(this.scene, this.camera);
  }

  public constructor(rendererContainer: React.MutableRefObject<THREE.WebGLRenderer | null>) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.light = new THREE.DirectionalLight(0xffffff);

    //
    this.light.position.set(1, 1, 1);
    this.scene.add(this.light);
    this.light.target = this.cube;
    this.scene.add(this.cube);
    this.camera.position.z = 5;
    this.renderer.setSize(640, 480);
    //

    if (rendererContainer.current) {
      rendererContainer.current.append(this.renderer.domElement);
    }

    this.animate = this.animate.bind(this);
    this.frameHandler = new FrameHandler(this.animate);
    this.frameHandler.start();
  }
}
