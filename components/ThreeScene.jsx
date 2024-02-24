"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { useRouter } from "next/navigation"; 

export default function ThreeScene() {
  const containerRef = useRef(null);
  const isMounted = useRef(false);
  const router = useRouter()

  useEffect(() => {
    if (!isMounted.current && typeof window !== "undefined") {
      isMounted.current = true;

      // Scene
      const scene = new THREE.Scene();

      // Textures
      const textureLoader = new THREE.TextureLoader();

      const particleTexture = textureLoader.load("./Texture/particles/11.png");

      const sunTexture = textureLoader.load("./Texture/planets/2k_sun.jpg");
      const mercuryTexture = textureLoader.load(
        "./Texture/planets/2k_mercury.jpg"
      );
      const venusTexture = textureLoader.load(
        "./Texture/planets/2k_venus_surface.jpg"
      );
      const earthTexture = textureLoader.load(
        "./Texture/planets/2k_earth_daymap.jpg"
      );
      const marsTexture = textureLoader.load("./Texture/planets/2k_mars.jpg");
      const jupiterTexture = textureLoader.load(
        "./Texture/planets/2k_jupiter.jpg"
      );
      const saturnTexture = textureLoader.load(
        "./Texture/planets/2k_saturn.jpg"
      );
      const uranusTexture = textureLoader.load(
        "./Texture/planets/2k_uranus.jpg"
      );
      const neptuneTexture = textureLoader.load(
        "./Texture/planets/2k_neptune.jpg"
      );

      // Camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 8;
      camera.position.y = 8;
      scene.add(camera);

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      // Planet Geometry
      const SunGeometry = new THREE.SphereGeometry();
      SunGeometry.scale(1.9, 1.9, 1.9);
      const sunMaterial = new THREE.MeshBasicMaterial({
        map: sunTexture,
      });
      const Sun = new THREE.Mesh(SunGeometry, sunMaterial);
      Sun.name = "sun";

      const MercuryGeometry = new THREE.SphereGeometry();
      MercuryGeometry.scale(0.4, 0.4, 0.4);
      const mercuryMaterial = new THREE.MeshMatcapMaterial({
        map: mercuryTexture,
      });
      const Mercury = new THREE.Mesh(MercuryGeometry, mercuryMaterial);
      Mercury.name = "mercury";

      const VenusGeometry = new THREE.SphereGeometry();
      VenusGeometry.scale(0.8, 0.8, 0.8);
      const venusMaterial = new THREE.MeshMatcapMaterial({ map: venusTexture });
      const Venus = new THREE.Mesh(VenusGeometry, venusMaterial);
      Venus.name = "venus";

      const EarthGeometry = new THREE.SphereGeometry();
      EarthGeometry.scale(1, 1, 1);
      const earthMaterial = new THREE.MeshMatcapMaterial({
        map: earthTexture,
      });
      const Earth = new THREE.Mesh(EarthGeometry, earthMaterial);
      Earth.name = "earth";

      const MarsGeometry = new THREE.SphereGeometry();
      MarsGeometry.scale(0.6, 0.6, 0.6);
      const marsMaterial = new THREE.MeshMatcapMaterial({ map: marsTexture });
      const Mars = new THREE.Mesh(MarsGeometry, marsMaterial);
      Mars.name = "mars";

      const JupiterGeometry = new THREE.SphereGeometry();
      JupiterGeometry.scale(1.4, 1.4, 1.4);
      const jupiterMaterial = new THREE.MeshMatcapMaterial({
        map: jupiterTexture,
      });
      const Jupiter = new THREE.Mesh(JupiterGeometry, jupiterMaterial);
      Jupiter.name = "jupiter";

      const SaturnGeometry = new THREE.SphereGeometry();
      SaturnGeometry.scale(1.3, 1.3, 1.3);
      const saturnMaterial = new THREE.MeshMatcapMaterial({
        map: saturnTexture,
      });
      const Saturn = new THREE.Mesh(SaturnGeometry, saturnMaterial);
      const SaturnRingGeometry = new THREE.TorusGeometry(9, 1.5, 8, 30);
      SaturnRingGeometry.rotateX(Math.PI / 5);
      SaturnRingGeometry.scale(0.2, 0.2, 0.2);
      const SaturnRingMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        color: "gray",
      });
      const SaturnRing = new THREE.Points(
        SaturnRingGeometry,
        SaturnRingMaterial
      );
      Saturn.name = "saturn";

      const UranusGeometry = new THREE.SphereGeometry();
      UranusGeometry.scale(1.1, 1.1, 1.1);
      const uranusMaterial = new THREE.MeshMatcapMaterial({
        map: uranusTexture,
      });
      const Uranus = new THREE.Mesh(UranusGeometry, uranusMaterial);
      Uranus.name = "uranus";

      const NeptuneGeometry = new THREE.SphereGeometry();
      NeptuneGeometry.scale(1.2, 1.2, 1.2);
      const neptuneMaterial = new THREE.MeshMatcapMaterial({
        map: neptuneTexture,
      });
      const Neptune = new THREE.Mesh(NeptuneGeometry, neptuneMaterial);
      Neptune.name = "neptune";

      scene.add(
        Sun,
        Mercury,
        Venus,
        Earth,
        Mars,
        Jupiter,
        Saturn,
        SaturnRing,
        Uranus,
        Neptune
      );

      // CSS2DRenderer
      const labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0";
      labelRenderer.domElement.style.pointerEvents = "none";
      containerRef.current.appendChild(labelRenderer.domElement);

      // CSS2DObject
      const p = document.createElement("p");
      p.className = "tooltip";
      const pContainer = document.createElement("div");
      pContainer.appendChild(p);
      const cPointLabel = new CSS2DObject(pContainer);
      scene.add(cPointLabel);

      // Raycaster
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      document.addEventListener("mousemove", onMouseMove);
      function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([
          Sun,
          Mercury,
          Venus,
          Earth,
          Mars,
          Jupiter,
          Saturn,
          Uranus,
          Neptune,
        ]);

        if (intersects.length > 0) {
          switch (intersects[0].object.name) {
            case "sun":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Sun";
              break;
            case "mercury":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Mercury";
              break;
            case "venus":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Venus";
              break;
            case "earth":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Earth";
              break;
            case "mars":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Mars";
              break;
            case "jupiter":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Jupiter";
              break;
            case "saturn":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Saturn";
              break;
            case "uranus":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Uranus";
              break;
            case "neptune":
              p.className = "tooltip show";
              cPointLabel.position.set(
                intersects[0].point.x,
                intersects[0].point.y,
                intersects[0].point.z
              );
              p.innerHTML = "Neptune";
              break;
          }
        } else {
          p.className = "tooltip hide";
          p.innerHTML = "";
        }
      }

      document.addEventListener('click', onMouseclick)
      function onMouseclick(event) {
        const intersects = raycaster.intersectObjects([
          Sun,
          Mercury,
          Venus,
          Earth,
          Mars,
          Jupiter,
          Saturn,
          Uranus,
          Neptune,
        ]);
        if(intersects.length > 0){
          router.push(`/planet/${intersects[0].object.name}`)
        }
      }

      // Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 2000;

      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 18;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: "#87CEEB",
        size: 0.2,
        sizeAttenuation: true,
        transparent: true,
        alphaMap: particleTexture,
        alphaTest: 0.001,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;

      // Resize
      window.addEventListener("resize", () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        labelRenderer.setSize(width, height);
      });

      // Animation
      const clock = new THREE.Clock();
      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        // Animation
        Sun.rotation.y += 0.005;

        const MercuryAngle = elapsedTime * 0.15;
        Mercury.rotation.y += 0.015;
        Mercury.position.x = Math.cos(MercuryAngle) * 2.5;
        Mercury.position.z = Math.sin(MercuryAngle) * 2.5;

        const VenusAngle = elapsedTime * 0.1;
        Venus.rotation.y += 0.01;
        Venus.position.x = Math.cos(VenusAngle) * 4;
        Venus.position.z = Math.sin(VenusAngle) * 4;

        const EarthAngle = elapsedTime * 0.2;
        Earth.rotation.y += 0.02;
        Earth.position.x = Math.cos(EarthAngle) * 6;
        Earth.position.z = Math.sin(EarthAngle) * 6;

        const MarsAngle = elapsedTime * 0.18;
        Mars.rotation.y += 0.018;
        Mars.position.x = Math.cos(MarsAngle) * 8;
        Mars.position.z = Math.sin(MarsAngle) * 8;

        const JupiterAngle = elapsedTime * 0.32;
        Jupiter.rotation.y += 0.032;
        Jupiter.position.x = Math.cos(JupiterAngle) * 10;
        Jupiter.position.z = Math.sin(JupiterAngle) * 10;

        const SaturnAngle = elapsedTime * 0.3;
        Saturn.rotation.y += 0.03;
        Saturn.position.x = Math.cos(SaturnAngle) * 14;
        Saturn.position.z = Math.sin(SaturnAngle) * 14;
        SaturnRing.position.x = Math.cos(SaturnAngle) * 14;
        SaturnRing.position.z = Math.sin(SaturnAngle) * 14;

        const UranusAngle = elapsedTime * 0.28;
        Uranus.rotation.y += 0.028;
        Uranus.position.x = Math.cos(UranusAngle) * 17;
        Uranus.position.z = Math.sin(UranusAngle) * 17;

        const NeptuneAngle = elapsedTime * 0.24;
        Neptune.rotation.y += 0.024;
        Neptune.position.x = Math.cos(NeptuneAngle) * 19;
        Neptune.position.z = Math.sin(NeptuneAngle) * 19;

        // Render
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);

        // Call tick again on the next frame
        requestAnimationFrame(tick);
      };
      tick();

      return () => {
        removeEventListener("resize", () => {});
        removeEventListener('mousemove', onMouseMove)
        removeEventListener('click', onMouseclick)
      };
    }
  }, []);

  return <div className="webgl" ref={containerRef} />;
}
