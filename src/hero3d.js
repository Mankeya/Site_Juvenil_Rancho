import * as THREE from 'three'

/**
 * Estrela 3D do hero — geometria extrudada com as cores da marca.
 * Respeita prefers-reduced-motion (renderiza estático).
 */
export function initHero3D(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 6

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Iluminação suave
  scene.add(new THREE.AmbientLight(0xffffff, 1.2))
  const key = new THREE.DirectionalLight(0xffffff, 2)
  key.position.set(4, 6, 8)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x009739, 1.5)
  rim.position.set(-6, -2, 4)
  scene.add(rim)

  // Geometria: estrela de 5 pontas (evoca a bandeira gaúcha)
  const shape = new THREE.Shape()
  const spikes = 5
  const outer = 2
  const inner = 0.85
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const angle = (Math.PI / spikes) * i - Math.PI / 2
    const x = Math.cos(angle) * r
    const y = Math.sin(angle) * r
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
  }
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.1,
    bevelSegments: 3,
  })
  geometry.center()

  const material = new THREE.MeshStandardMaterial({
    color: 0xd62828,
    metalness: 0.35,
    roughness: 0.3,
  })
  const star = new THREE.Mesh(geometry, material)
  star.rotation.x = 0.35
  scene.add(star)

  // Anel verde orbitando (acento secundário)
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3, 0.045, 16, 96),
    new THREE.MeshStandardMaterial({ color: 0x009739, metalness: 0.5, roughness: 0.35 }),
  )
  ring.rotation.x = Math.PI / 2.4
  scene.add(ring)

  // Controle por ponteiro (parallax sutil)
  const target = { x: 0, y: 0 }
  const onPointerMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6
    target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6
  }
  if (!reduceMotion) canvas.addEventListener('pointermove', onPointerMove)

  function resize() {
    const size = canvas.clientWidth
    renderer.setSize(size, size, false)
    camera.aspect = 1
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  let raf
  function animate() {
    raf = requestAnimationFrame(animate)
    if (!reduceMotion) {
      star.rotation.y += 0.006
      ring.rotation.z += 0.003
      star.rotation.x += (0.35 + target.y - star.rotation.x) * 0.05
      star.rotation.z += (target.x - star.rotation.z) * 0.05
    }
    renderer.render(scene, camera)
  }
  animate()

  // Pausa quando a aba fica oculta (economia de bateria)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf)
    else animate()
  })
}
