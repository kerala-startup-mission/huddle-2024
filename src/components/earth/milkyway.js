import * as THREE from "three";

export default function getStarfield({ numStars = 10000 } = {}) {

  // Create the Milky Way galaxy effect using particles
  const starCount = 10000;
  const starsGeometry = new THREE.BufferGeometry();
  const starColors = new Float32Array(starCount * 3);
  const starsMaterial = new THREE.PointsMaterial({ vertexColors: true });

  const starPositions = [];
  for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starPositions.push(x, y, z);

      // Assign random colors to the stars
      starColors[i * 3] = Math.random();
      starColors[i * 3 + 1] = Math.random();
      starColors[i * 3 + 2] = Math.random();
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  
  return starField;
}