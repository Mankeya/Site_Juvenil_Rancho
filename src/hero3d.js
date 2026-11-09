import * as THREE from 'three'
import logoUrl from '../Img/logo-3d.png'

function roundedRectShape(w, h, radius) {
  const x = -w / 2
  const y = -h / 2
  const s = new THREE.Shape()
  s.moveTo(x + radius, y)
  s.lineTo(x + w - radius, y)
  s.quadraticCurveTo(x + w, y, x + w, y + radius)
  s.lineTo(x + w, y + h - radius)
  s.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  s.lineTo(x + radius, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - radius)
  s.lineTo(x, y + radius)
  s.quadraticCurveTo(x, y, x + radius, y)
  return s
}

/**
 * Distintivo 3D do hero: logo do CTG sobre um card com borda vermelha,
 * flutuando com parallax no ponteiro. Respeita prefers-reduced-motion.
 */
export function initHero3D(canvas) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  } catch {
    return // sem WebGL: a página funciona normalmente sem a cena
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 6.5

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene.add(new THREE.AmbientLight(0xffffff, 2))
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(3, 5, 6)
  scene.add(key)

  // ── Distintivo ────────────────────────────────────────────────
  const group = new THREE.Group()
  scene.add(group)

  const W = 3.1
  const H = (W * 644) / 544
  const R = 0.28

  // Borda vermelha (card levemente maior atrás)
  const border = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(W + 0.2, H + 0.2, R + 0.06)),
    new THREE.MeshBasicMaterial({ color: 0xd62828 }),
  )
  group.add(border)

  // Cartão branco
  const card = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(W, H, R)),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  )
  card.position.z = 0.02
  group.add(card)

  // Logo (textura com fundo transparente)
  const texture = new THREE.TextureLoader().load(logoUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = renderer.capabilities.getMaxAnisotropy()
  })
  const logo = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.92, H * 0.92),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
  )
  logo.position.z = 0.04
  group.add(logo)

  // ── Interação ─────────────────────────────────────────────────
  const pointer = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }
  if (!reduceMotion) {
    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35
    })
    canvas.addEventListener('pointerleave', () => {
      pointer.x = 0
      pointer.y = 0
    })
  }

  function resize() {
    const size = canvas.clientWidth
    renderer.setSize(size, size, false)
    camera.aspect = 1
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  // ── Animação ──────────────────────────────────────────────────
  let raf = 0
  let t = 0
  function animate() {
    raf = requestAnimationFrame(animate)
    if (!reduceMotion) {
      t += 0.016
      current.x += (pointer.x - current.x) * 0.06
      current.y += (pointer.y - current.y) * 0.06
      group.position.y = Math.sin(t * 1.1) * 0.14 // flutuação suave
      group.rotation.y = Math.sin(t * 0.7) * 0.16 + current.x
      group.rotation.x = Math.sin(t * 0.9) * 0.05 + current.y
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
