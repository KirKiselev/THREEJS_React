import * as THREE from "three";
import { useEffect, useRef } from "react";
import "./App.css";
import "./FrameHandler";
import { FrameHandler } from "./FrameHandler";

function App() {
  const refContainer = useRef(null);
  const refFrameHandler = useRef<FrameHandler | null>(null);
  const refAnimation = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);

    if (refContainer.current) {
      refContainer.current.append(renderer.domElement);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);

    scene.add(light);
    light.target = cube;
    scene.add(cube);

    camera.position.z = 5;
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={refContainer} id="threeContainer"></div>;
}

export default App;
