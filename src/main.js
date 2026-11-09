import './styles/main.css'
import './styles/juvenil.css'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const canvas = document.getElementById('hero-canvas')
if (canvas) import('./hero3d.js').then(({ initHero3D }) => initHero3D(canvas))

const menu = document.querySelector('.menu-toggle')
const navigation = document.getElementById('navigation')
if (menu && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open')
    menu.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-label', 'Abrir menu')
    menu.textContent = '☰'
  }
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open')
    menu.setAttribute('aria-expanded', String(open))
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
    menu.textContent = open ? '×' : '☰'
  })
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
}

if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 },
  )
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
}

const tabs = [...document.querySelectorAll('[role="tab"]')]
const experiences = [
  [
    '01 — ARTE EM MOVIMENTO',
    'O primeiro passo é se permitir.',
    'A força do sapateado, o movimento da saia e a sintonia de dançar junto. Há sempre um novo passo para aprender.',
  ],
  [
    '02 — SABERES COMPARTILHADOS',
    'Tradição que vive na gente.',
    'Música, histórias e saberes passam de geração em geração, fortalecendo nossa ligação com a cultura gaúcha.',
  ],
  [
    '03 — AMIZADES QUE FICAM',
    'Juntos, dentro e fora do palco.',
    'Entre ensaios e encontros, a invernada se torna um lugar para aprender, compartilhar e construir amizades.',
  ],
]
function selectTab(index) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index))
    tab.tabIndex = i === index ? 0 : -1
  })
  const [number, title, copy] = experiences[index]
  document.getElementById('tab-number').textContent = number
  document.getElementById('tab-title').textContent = title
  document.getElementById('tab-copy').textContent = copy
  document.getElementById('experience-panel').setAttribute('aria-labelledby', tabs[index].id)
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index))
  tab.addEventListener('keydown', (event) => {
    let next
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault()
    selectTab(next)
    tabs[next].focus()
  })
})

const video = document.querySelector('.hero-video')
const motion = document.getElementById('motion')
if (video && motion) {
  let paused = reducedMotion
  let visible = true
  const updateButton = () => {
    motion.textContent = paused ? '▶' : 'Ⅱ'
    motion.setAttribute('aria-label', paused ? 'Reproduzir vídeo' : 'Pausar vídeo')
    motion.setAttribute('aria-pressed', String(!paused))
  }
  const play = () => {
    if (!video.src) video.src = video.dataset.src
    video
      .play()
      .then(() => {
        motion.hidden = false
      })
      .catch(() => {})
  }
  video.addEventListener('canplay', () => {
    motion.hidden = false
  })
  video.addEventListener('error', () => {
    motion.hidden = true
  })
  motion.addEventListener('click', () => {
    paused = !paused
    updateButton()
    if (paused) video.pause()
    else play()
  })
  updateButton()
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
        if (visible && !paused) play()
        else video.pause()
      },
      { threshold: 0.1 },
    ).observe(video)
  } else if (!paused) play()
  // Permite iniciar o vídeo manualmente quando a preferência é por movimento reduzido.
  if (reducedMotion) {
    video.preload = 'metadata'
    video.src = video.dataset.src
    video.load()
  }
}

const form = document.querySelector('.form-inscricao')
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const message = `Olá! Gostaria de conhecer a Invernada Juvenil.\n\nNome: ${data.get('nome')}\nIdade: ${data.get('idade')}\nWhatsApp: ${data.get('telefone')}\nE-mail: ${data.get('email')}\nExperiência anterior: ${data.get('mensagem') || 'Não informada'}`
    window.location.href = `https://wa.me/5551984223779?text=${encodeURIComponent(message)}`
  })
}
const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())
