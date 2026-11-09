import AOS from 'aos'
import 'aos/dist/aos.css'
import './styles/main.css'

// ── Animações de scroll ─────────────────────────────────────────────
AOS.init({ once: true, offset: 80, duration: 700, easing: 'ease-out-cubic' })

// ── Cena 3D do hero (code-split: Three.js só carrega onde há canvas) ─
const canvas = document.getElementById('hero-canvas')
if (canvas) import('./hero3d.js').then(({ initHero3D }) => initHero3D(canvas))

// ── Menu mobile ─────────────────────────────────────────────────────
const menuBtn = document.getElementById('mobile-menu-btn')
const menu = document.getElementById('mobile-menu')
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden')
    menuBtn.setAttribute('aria-expanded', String(!open))
  })
  menu
    .querySelectorAll('a')
    .forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')))
}

// ── Header com sombra ao rolar ──────────────────────────────────────
const navbar = document.getElementById('navbar')
if (navbar) {
  const onScroll = () => navbar.classList.toggle('shadow-lg', window.scrollY > 20)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

// ── Tilt 3D nos cards (apontares finos) ─────────────────────────────
const canHover = window.matchMedia('(hover: hover)').matches
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (canHover && !reduceMotion) {
  document.querySelectorAll('.tilt').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
    })
    el.addEventListener('pointerleave', () => {
      el.style.transform = ''
    })
  })
}

// ── Formulário de inscrição ─────────────────────────────────────────
const form = document.querySelector('.form-inscricao')
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!form.reportValidity()) return

    const btn = form.querySelector('button[type="submit"]')
    btn.disabled = true
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'

    setTimeout(() => {
      window.location.href = 'inscricao.html'
    }, 800)
  })
}

// ── Rodapé: ano dinâmico ────────────────────────────────────────────
const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())
