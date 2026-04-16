import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const FACE_LABELS = [
  'Python / FastAPI', // +X (right)
  'React / Next.js',  // -X (left)
  'JavaScript / TS',  // +Y (top)
  'Telegram Bots',    // -Y (bottom)
  'SQL / PostgreSQL', // +Z (front)
  'AI Integration',   // -Z (back)
]

function makeFaceTexture(label) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Cream background
  ctx.fillStyle = '#f5f0e8'
  ctx.fillRect(0, 0, size, size)

  // Thick black border
  const border = 30
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(0, 0, size, border)
  ctx.fillRect(0, size - border, size, border)
  ctx.fillRect(0, 0, border, size)
  ctx.fillRect(size - border, 0, border, size)

  // Decorative corner tick marks (editorial feel)
  ctx.fillStyle = '#e63946'
  ctx.fillRect(border + 20, border + 20, 36, 6)
  ctx.fillRect(border + 20, border + 20, 6, 36)
  ctx.fillRect(size - border - 56, size - border - 26, 36, 6)
  ctx.fillRect(size - border - 26, size - border - 56, 6, 36)

  // Index label at top-left (mono micro type)
  ctx.fillStyle = '#1a1a1a'
  ctx.font = '600 22px "Space Mono", monospace'
  ctx.textBaseline = 'top'
  ctx.fillText('// STACK', border + 70, border + 22)

  // Main label — wrap words across lines
  const words = label.split(' ')
  const lines = []
  let line = ''
  ctx.font = 'bold 56px "Space Mono", monospace'
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    const m = ctx.measureText(test).width
    if (m > size - border * 2 - 60 && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)

  ctx.fillStyle = '#1a1a1a'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const lineHeight = 64
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((ln, i) => {
    ctx.fillText(ln, size / 2, startY + i * lineHeight)
  })

  // Accent bar bottom
  ctx.fillStyle = '#e63946'
  ctx.fillRect(border + 20, size - border - 40, 80, 12)

  const tex = new THREE.CanvasTexture(canvas)
  tex.anisotropy = 4
  tex.needsUpdate = true
  return tex
}

export default function RubiksCube() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const size = isMobile ? 240 : 300

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 4.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'

    // Build textured cube
    const textures = FACE_LABELS.map(makeFaceTexture)
    const materials = textures.map(
      (map) => new THREE.MeshBasicMaterial({ map })
    )
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)

    // Black wireframe edges for brutalist outline
    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x1a1a1a, linewidth: 2 })
    )
    cube.add(line)

    // Base tilt — cube always returns here so text stays right-side-up
    const BASE_X = -0.28
    cube.rotation.x = BASE_X
    cube.rotation.y = 0.55

    // Manual drag-rotate
    let isDragging = false
    let lastX = 0
    let lastY = 0
    const AUTO_Y_SPEED = 0.005 // steady Y-only auto-rotation
    let userYVelocity = 0      // extra Y velocity imparted by drag (decays to 0)

    const onDown = (clientX, clientY) => {
      isDragging = true
      lastX = clientX
      lastY = clientY
    }
    const onMove = (clientX, clientY) => {
      if (!isDragging) return
      const dx = clientX - lastX
      const dy = clientY - lastY
      lastX = clientX
      lastY = clientY
      cube.rotation.y += dx * 0.01
      // Limit X rotation so it can't flip upside-down
      const maxTilt = 0.9
      cube.rotation.x = Math.max(-maxTilt, Math.min(maxTilt, cube.rotation.x + dy * 0.01))
      userYVelocity = dx * 0.001
    }
    const onUp = () => {
      isDragging = false
    }

    const mdown = (e) => {
      e.preventDefault()
      onDown(e.clientX, e.clientY)
    }
    const mmove = (e) => onMove(e.clientX, e.clientY)
    const mup = () => onUp()

    const tstart = (e) => {
      if (e.touches[0]) onDown(e.touches[0].clientX, e.touches[0].clientY)
    }
    const tmove = (e) => {
      if (e.touches[0]) {
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const tend = () => onUp()

    const dom = renderer.domElement
    dom.style.touchAction = 'none'
    dom.addEventListener('mousedown', mdown)
    window.addEventListener('mousemove', mmove)
    window.addEventListener('mouseup', mup)
    dom.addEventListener('touchstart', tstart, { passive: true })
    dom.addEventListener('touchmove', tmove, { passive: true })
    dom.addEventListener('touchend', tend)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isDragging) {
        // Y: steady auto-rotation + decaying user velocity
        userYVelocity *= 0.94
        cube.rotation.y += AUTO_Y_SPEED + userYVelocity
        // X: ease back toward BASE_X so text never goes upside-down
        cube.rotation.x += (BASE_X - cube.rotation.x) * 0.06
      }
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler (responsive)
    const onResize = () => {
      const nowMobile = window.matchMedia('(max-width: 768px)').matches
      const s = nowMobile ? 240 : 300
      renderer.setSize(s, s)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      dom.removeEventListener('mousedown', mdown)
      window.removeEventListener('mousemove', mmove)
      window.removeEventListener('mouseup', mup)
      dom.removeEventListener('touchstart', tstart)
      dom.removeEventListener('touchmove', tmove)
      dom.removeEventListener('touchend', tend)
      textures.forEach((t) => t.dispose())
      materials.forEach((m) => m.dispose())
      geometry.dispose()
      edges.dispose()
      renderer.dispose()
      if (dom.parentNode === mount) mount.removeChild(dom)
    }
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -top-4 -left-4 bg-yellow border-2 border-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest z-10 shadow-brut2"
      >
        drag me
      </div>
      <div
        ref={mountRef}
        className="border-2 border-ink bg-cream shadow-brut6 overflow-hidden md:w-[300px] md:h-[300px] w-[240px] h-[240px]"
        aria-label="Интерактивный 3D-куб со стеком технологий"
      />
    </div>
  )
}
