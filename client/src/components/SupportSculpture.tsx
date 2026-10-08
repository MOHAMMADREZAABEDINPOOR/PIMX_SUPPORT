import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** A real, locally rendered sculpture. No remote models or textures. */
export default function SupportSculpture({
  paused,
  reducedMotion,
  dark,
}: {
  paused: boolean;
  reducedMotion: boolean;
  dark: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef({ paused, reducedMotion, dark });
  const [available, setAvailable] = useState(true);
  controls.current = { paused, reducedMotion, dark };

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setAvailable(false);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0.25, 8.8);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xe3f7ee, 0x33493e, 3));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4);
    keyLight.position.set(-3, 5, 5);
    scene.add(keyLight);
    const peachLight = new THREE.PointLight(0xff9a60, 18, 12);
    peachLight.position.set(3, -1, 3);
    scene.add(peachLight);

    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, -0.95);
    heartShape.bezierCurveTo(-0.25, -0.62, -1.1, -0.1, -1.1, 0.55);
    heartShape.bezierCurveTo(-1.1, 1.25, -0.25, 1.37, 0, 0.82);
    heartShape.bezierCurveTo(0.25, 1.37, 1.1, 1.25, 1.1, 0.55);
    heartShape.bezierCurveTo(1.1, -0.1, 0.25, -0.62, 0, -0.95);
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 1,
      bevelSize: 0.28,
      bevelThickness: 0.3,
      curveSegments: 40,
    });
    heartGeometry.center();
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xc8e1d5,
      metalness: 1,
      roughness: 0.16,
      clearcoat: 1,
    });
    const heart = new THREE.Mesh(heartGeometry, chrome);
    heart.rotation.set(-0.08, -0.35, -0.12);
    sculpture.add(heart);

    const orange = new THREE.MeshPhysicalMaterial({
      color: 0xff7746,
      metalness: 0.12,
      roughness: 0.25,
      clearcoat: 1,
    });
    const pale = new THREE.MeshPhysicalMaterial({
      color: 0xd9eb9a,
      metalness: 0.35,
      roughness: 0.24,
    });
    const orbit = new THREE.Group();
    orbit.rotation.set(0.95, -0.2, -0.48);
    sculpture.add(orbit);
    const ringGeometry = new THREE.TorusGeometry(1.94, 0.045, 12, 120);
    const ring = new THREE.Mesh(ringGeometry, orange);
    orbit.add(ring);
    const beadGeometry = new THREE.SphereGeometry(0.13, 24, 16);
    const bead = new THREE.Mesh(beadGeometry, orange);
    bead.position.set(1.94, 0, 0);
    orbit.add(bead);
    const secondRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.012, 8, 120),
      chrome
    );
    secondRing.rotation.set(1.1, 0.6, 0.3);
    sculpture.add(secondRing);

    const coins: THREE.Group[] = [];
    const coinGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 48);
    const rimGeometry = new THREE.TorusGeometry(0.29, 0.012, 8, 48);
    for (let i = 0; i < 3; i++) {
      const coin = new THREE.Group();
      const disk = new THREE.Mesh(coinGeometry, i === 1 ? orange : pale);
      disk.rotation.x = Math.PI / 2;
      coin.add(disk);
      const rim = new THREE.Mesh(rimGeometry, chrome);
      rim.position.z = 0.065;
      coin.add(rim);
      coin.position.set(
        i === 0 ? -1.9 : i === 1 ? 1.55 : 0.85,
        i === 0 ? -0.9 : i === 1 ? 1.45 : -1.65,
        i === 0 ? 0.7 : -0.3
      );
      coin.rotation.set(0.3, i * 0.7 - 0.5, i * 0.4);
      coins.push(coin);
      sculpture.add(coin);
    }

    const pointer = new THREE.Vector2();
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        ((event.clientY - rect.top) / rect.height - 0.5) * 2
      );
    };
    const leave = () => pointer.set(0, 0);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    let dirty = true;
    let renderedDark: boolean | undefined;
    const resize = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 10 : 8.8;
      camera.updateProjectionMatrix();
      dirty = true;
    });
    resize.observe(element);
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    observer.observe(element);
    let frame = 0;
    let time = 0;
    let last = performance.now();
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (renderedDark !== controls.current.dark) {
        renderedDark = controls.current.dark;
        renderer.toneMappingExposure = renderedDark ? 1.05 : 1.45;
        chrome.color.setHex(renderedDark ? 0xa6d8c4 : 0xc8e1d5);
        peachLight.intensity = renderedDark ? 28 : 18;
        dirty = true;
      }
      const moving =
        !controls.current.paused && !controls.current.reducedMotion;
      if (!moving && !dirty) return;
      if (moving) {
        time += delta;
        sculpture.rotation.y +=
          (pointer.x * 0.23 - sculpture.rotation.y) * 0.045;
        sculpture.rotation.x +=
          (pointer.y * 0.12 - sculpture.rotation.x) * 0.045;
        heart.position.y = Math.sin(time * 0.85) * 0.12;
        heart.rotation.y = -0.35 + Math.sin(time * 0.45) * 0.3;
        orbit.rotation.z = -0.48 + time * 0.13;
        coins.forEach((coin, i) => {
          coin.position.y += Math.sin(time + i * 2) * delta * 0.13;
          coin.rotation.y += delta * (i === 1 ? -0.25 : 0.2);
        });
      }
      renderer.render(scene, camera);
      dirty = false;
    };
    frame = requestAnimationFrame(render);
    const lost = (event: Event) => {
      event.preventDefault();
      setAvailable(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      chrome.dispose();
      orange.dispose();
      pale.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="sculpture" ref={host} aria-hidden="true">
      {!available && (
        <div className="sculpture-fallback">
          <span>♥</span>
          <i />
          <b>+</b>
        </div>
      )}
    </div>
  );
}
