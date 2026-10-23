'use strict';

(() => {
  const cover = document.getElementById('invitation-opening');
  const sealButton = document.getElementById('open-invitation');
  const skipButton = document.getElementById('skip-opening');
  const sealArt = document.getElementById('seal-art');
  const invitation = document.querySelector('.invitation');
  const utility = document.querySelector('.utility');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!cover || !sealButton || !skipButton || !sealArt || !invitation) return;

  let renderer;
  let scene;
  let camera;
  let seal;
  let sealTexture;
  let frame = 0;
  let openingAt = 0;
  let safetyTimer;
  let opening = false;
  let finished = false;
  let sealRadius = 0.4;
  const hinges = [];
  const resources = [];

  function drawGanesha(image) {
    const context = sealArt.getContext('2d');
    if (!context) return;
    context.setTransform(sealArt.width / 512, 0, 0, sealArt.height / 512, 0, 0);
    context.imageSmoothingQuality = 'high';
    const wax = context.createRadialGradient(190, 150, 30, 256, 256, 260);
    wax.addColorStop(0, '#ba7c8c');
    wax.addColorStop(1, '#884757');
    context.fillStyle = wax;
    context.fillRect(0, 0, 512, 512);
    context.strokeStyle = '#efd3a0';
    for (const radius of [235, 224]) {
      context.lineWidth = radius === 235 ? 3 : 1;
      context.beginPath();
      context.arc(256, 256, radius, 0, Math.PI * 2);
      context.stroke();
    }
    if (image) {
      context.save();
      context.beginPath();
      context.arc(256, 256, 210, 0, Math.PI * 2);
      context.fillStyle = '#ffffff';
      context.fill();
      context.clip();
      const scale = 384 / Math.max(image.naturalWidth, image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.drawImage(image, (512 - width) / 2, (512 - height) / 2, width, height);
      context.restore();
      return;
    }
    context.lineWidth = 7;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    const artwork = new Path2D('M207 172Q256 151 305 172M216 155L206 127 237 140 256 103 275 140 306 127 296 155 M208 205C168 166 117 189 137 243C149 280 182 291 204 268 M304 205C344 166 395 189 375 243C363 280 330 291 308 268 M214 187C202 216 212 241 235 252C250 263 229 282 237 306C247 339 294 337 300 311C307 289 280 280 270 295 M298 187C309 213 300 240 281 251Q263 267 269 282 M224 216Q235 223 241 217M273 217Q280 223 290 216 M256 185V204 M225 248L214 264 233 258 M291 250L301 264 M204 294C175 306 153 331 167 351Q191 372 231 352 M312 294C341 306 363 331 349 351Q325 372 285 352 M192 384Q256 402 320 384 M216 377Q230 357 250 379M262 379Q282 357 296 377');
    context.stroke(artwork);
  }

  function disposeScene() {
    cancelAnimationFrame(frame);
    frame = 0;
    window.removeEventListener('resize', resizeScene);
    resources.splice(0).forEach(resource => resource.dispose());
    sealTexture = null;
    renderer?.dispose();
    renderer?.domElement.remove();
    renderer = null;
  }

  function finishOpening() {
    if (finished) return;
    finished = true;
    clearTimeout(safetyTimer);
    disposeScene();
    cover.hidden = true;
    cover.dataset.state = 'open';
    document.body.classList.remove('opening-locked');
    invitation.inert = false;
    if (utility) utility.inert = false;
    const destination = document.getElementById(location.hash.slice(1)) || document.getElementById('couple-names');
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
    cover.removeEventListener('keydown', handleKeyboard);
    motion.removeEventListener('change', handleMotionChange);
    window.dispatchEvent(new Event('resize'));
  }

  function openInvitation(skip = false) {
    if (finished || opening) return;
    opening = true;
    window.dispatchEvent(new Event('invitation:opening'));
    openingAt = performance.now();
    cover.classList.add('is-opening');
    cover.dataset.state = 'opening';
    if (skip || motion.matches) return finishOpening();
    safetyTimer = setTimeout(finishOpening, renderer ? 2300 : 450);
    startFrame();
  }

  function handleKeyboard(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      openInvitation(true);
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      (document.activeElement === sealButton ? skipButton : sealButton).focus();
    }
  }

  function handleMotionChange() {
    if (opening) finishOpening();
    else startFrame();
  }

  function paperTexture(right) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    const paper = context.createLinearGradient(right ? 1024 : 0, 0, right ? 0 : 1024, 1024);
    paper.addColorStop(0, '#fff0e7');
    paper.addColorStop(1, '#edccd4');
    context.fillStyle = paper;
    context.fillRect(0, 0, 1024, 1024);
    context.fillStyle = '#75495608';
    for (let grain = 0; grain < 14000; grain += 1) context.fillRect((grain * 127.7) % 1024, (grain * 79.3) % 1024, 1, 1);
    context.strokeStyle = '#ab895d88';
    context.lineWidth = 1.4;
    context.strokeRect(22, 22, 980, 980);
    context.strokeRect(32, 32, 960, 960);
    context.beginPath();
    context.moveTo(right ? 1024 : 0, 0);
    context.lineTo(right ? 0 : 1024, 532);
    context.lineTo(right ? 1024 : 0, 1024);
    context.fillStyle = '#ffffff13';
    context.fill();
    context.strokeStyle = '#a46d7a30';
    context.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    resources.push(texture);
    return texture;
  }

  function resizeScene() {
    if (!renderer || finished) return;
    const width = cover.clientWidth;
    const height = cover.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight = 2 * camera.position.z * Math.tan(camera.fov * Math.PI / 360);
    const halfWidth = visibleHeight * camera.aspect / 2;
    hinges.forEach(({ hinge, door, direction }) => {
      hinge.position.x = direction * halfWidth;
      door.position.x = -direction * halfWidth / 2;
      door.scale.set(halfWidth + 0.006, visibleHeight + 0.02, 1);
    });
    const bounds = sealButton.getBoundingClientRect();
    sealRadius = bounds.width / height * visibleHeight / 2 * 0.94;
    seal.scale.setScalar(sealRadius);
    seal.position.set(0, (0.5 - (bounds.top + bounds.height / 2) / height) * visibleHeight, 0.12);
    renderer.render(scene, camera);
  }

  function renderFrame(timestamp) {
    frame = 0;
    if (!renderer || finished) return;
    if (opening) {
      const progress = Math.min((timestamp - openingAt) / 1900, 1);
      const hingeProgress = Math.max(0, Math.min((progress - 0.12) / 0.88, 1));
      const eased = hingeProgress * hingeProgress * (3 - 2 * hingeProgress);
      hinges.forEach(({ hinge, direction }) => { hinge.rotation.y = direction * eased * 1.72; });
      const lift = Math.min(progress * 3, 1);
      seal.position.z = 0.12 + lift * 1.4;
      seal.rotation.z = -lift * 0.2;
      seal.scale.setScalar(sealRadius * Math.max(0.001, 1 - Math.max(0, progress - 0.2) * 3.5));
      cover.dataset.progress = progress.toFixed(3);
      if (progress >= 1) return finishOpening();
    } else {
      seal.rotation.y = motion.matches ? 0 : Math.sin(timestamp * 0.0008) * 0.06;
      seal.rotation.x = motion.matches ? 0 : Math.sin(timestamp * 0.0006) * 0.035;
    }
    renderer.render(scene, camera);
    if (!motion.matches || opening) frame = requestAnimationFrame(renderFrame);
  }

  function startFrame() {
    if (renderer && !frame && !finished) frame = requestAnimationFrame(renderFrame);
  }

  function createScene() {
    if (!window.THREE) return;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio, 2), 3));
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.dataset.renderer = 'three';
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = 8;
    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const light = new THREE.DirectionalLight(0xfff3e4, 2.2);
    light.position.set(-3, 5, 8);
    scene.add(light);
    for (const direction of [-1, 1]) {
      const hinge = new THREE.Group();
      const geometry = new THREE.BoxGeometry(1, 1, 0.014);
      const front = new THREE.MeshStandardMaterial({ map: paperTexture(direction === 1), roughness: 0.94 });
      const edge = new THREE.MeshStandardMaterial({ color: 0xf0cdd4, roughness: 1 });
      const door = new THREE.Mesh(geometry, [edge, edge, edge, edge, front, edge]);
      resources.push(geometry, front, edge);
      hinge.add(door);
      scene.add(hinge);
      hinges.push({ hinge, door, direction });
    }
    seal = new THREE.Group();
    const outline = new THREE.Shape();
    for (let point = 0; point <= 160; point += 1) {
      const angle = point / 160 * Math.PI * 2;
      const radius = 1 + Math.sin(angle * 18) * 0.022;
      const horizontal = Math.cos(angle) * radius;
      const vertical = Math.sin(angle) * radius;
      if (point === 0) outline.moveTo(horizontal, vertical);
      else outline.lineTo(horizontal, vertical);
    }
    const waxGeometry = new THREE.ExtrudeGeometry(outline, { depth: 0.13, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.025, bevelThickness: 0.025 });
    const waxMaterial = new THREE.MeshStandardMaterial({ color: 0x9f596c, roughness: 0.48, metalness: 0.16 });
    seal.add(new THREE.Mesh(waxGeometry, waxMaterial));
    sealTexture = new THREE.CanvasTexture(sealArt);
    sealTexture.colorSpace = THREE.SRGBColorSpace;
    const faceGeometry = new THREE.CircleGeometry(0.94, 96);
    const faceMaterial = new THREE.MeshBasicMaterial({ map: sealTexture });
    const face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.position.z = 0.161;
    seal.add(face);
    const ringGeometry = new THREE.TorusGeometry(0.99, 0.018, 8, 96);
    const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xd4b77e, metalness: 0.7, roughness: 0.28 });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.z = 0.13;
    seal.add(ring);
    resources.push(waxGeometry, waxMaterial, sealTexture, faceGeometry, faceMaterial, ringGeometry, ringMaterial);
    scene.add(seal);
    renderer.domElement.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      finishOpening();
    });
    document.getElementById('opening-scene').append(renderer.domElement);
    window.addEventListener('resize', resizeScene);
    resizeScene();
    cover.classList.add('scene-ready');
    startFrame();
  }

  drawGanesha();
  const ganeshaImage = new Image();
  ganeshaImage.onload = () => {
    if (finished) return;
    drawGanesha(ganeshaImage);
    if (sealTexture) {
      sealTexture.needsUpdate = true;
      startFrame();
    }
  };
  ganeshaImage.src = 'assets/ganesha-floral-enhanced.jpg';
  sealButton.addEventListener('click', () => openInvitation());
  skipButton.addEventListener('click', () => openInvitation(true));
  cover.addEventListener('keydown', handleKeyboard);
  motion.addEventListener('change', handleMotionChange);
  cover.hidden = false;
  cover.dataset.state = 'closed';
  invitation.inert = true;
  if (utility) utility.inert = true;
  document.body.classList.add('opening-locked');
  try {
    createScene();
  } catch {
    disposeScene();
    cover.classList.remove('scene-ready');
  }
  sealButton.focus({ preventScroll: true });
})();