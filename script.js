<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>3D Snake Game</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.min.js"></script>
  <script>
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add light
    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 3);
    scene.add(light);

    // Ground
    let groundGeo = new THREE.PlaneGeometry(20, 20);
    let groundMat = new THREE.MeshPhongMaterial({color: 0x444444});
    let ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Snake body
    let snake = [];
    let snakeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
    for (let i = 0; i < 3; i++) {
      let segment = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), snakeMaterial);
      segment.position.set(i, 0.5, 0);
      scene.add(segment);
      snake.push(segment);
    }

    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    let direction = new THREE.Vector3(-1, 0, 0);

    function animate() {
      requestAnimationFrame(animate);

      // Move snake
      let newPos = snake[0].position.clone().add(direction);
      let newHead = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), snakeMaterial);
      newHead.position.copy(newPos);
      scene.add(newHead);
      snake.unshift(newHead);

      let tail = snake.pop();
      scene.remove(tail);

      renderer.render(scene, camera);
    }

    animate();

    // Control
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp': direction.set(0, 0, -1); break;
        case 'ArrowDown': direction.set(0, 0, 1); break;
        case 'ArrowLeft': direction.set(-1, 0, 0); break;
        case 'ArrowRight': direction.set(1, 0, 0); break;
      }
    });
  </script>
</body>
</html>
