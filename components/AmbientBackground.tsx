'use client'

import { useEffect, useRef } from 'react'

const SWARM_FRUITS = ['🍓','🫐','🍋','🍑','🥭','🍒','🍇','🍊','🌸','🍯','🍎','🍈','🍏','🌿','🍐','🫐']

const HOLO_BY_SECTION: Record<string, string> = {
  top: '🍍', cats: '🍓', prd: '🫐', israel: '🍊', loy: '🍯'
}
const HOLO_POS: Record<string, { t: string; l: string }> = {
  top:    { t: '-8%',  l: '55%'  },
  cats:   { t: '10%',  l: '-10%' },
  prd:    { t: '-5%',  l: '60%'  },
  israel: { t: '20%',  l: '-8%'  },
  loy:    { t: '0%',   l: '58%'  },
}
const PART_COLORS: Record<string, string> = {
  top: '#C9305A', cats: '#A88DBF', prd: '#E8B7C5', israel: '#0052A5', loy: '#C9A045'
}

function rnd(a: number, b: number) { return a + Math.random() * (b - a) }
function pickFruit() { return SWARM_FRUITS[Math.floor(Math.random() * SWARM_FRUITS.length)] }

export default function AmbientBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const holoRef    = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const swarmRef   = useRef<HTMLDivElement>(null)
  const curColor   = useRef('#C9305A')

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    // Alias as non-null so TypeScript doesn't complain inside closures
    const canvas = canvasEl as HTMLCanvasElement
    const holoEl  = holoRef.current
    const glowEl  = glowRef.current
    const swarmEl = swarmRef.current

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const mouse = { x: -999, y: -999 }

    // Canvas resize
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particles
    const particles = Array.from({ length: 64 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 2.5 + 1,
    }))

    let raf: number
    function loopParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const color = curColor.current
      for (const p of particles) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const d  = Math.hypot(dx, dy)
        if (d < 140 && d > 0) {
          const f = (140 - d) / 140
          p.vx += (dx / d) * f * 0.4
          p.vy += (dy / d) * f * 0.4
        }
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.96; p.vy *= 0.96
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        p.x = Math.max(0, Math.min(canvas.width,  p.x))
        p.y = Math.max(0, Math.min(canvas.height, p.y))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color + '66'
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dd = Math.hypot(a.x - b.x, a.y - b.y)
          if (dd < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            const alpha = Math.floor((1 - dd / 110) * 40).toString(16).padStart(2, '0')
            ctx.strokeStyle = color + alpha
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(loopParticles)
    }
    loopParticles()

    // Mouse → particles + glow orb
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (glowEl) glowEl.style.transform = `translate(${e.clientX - 150}px,${e.clientY - 150}px)`
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Fruit swarm
    function buildSwarm(el: HTMLElement, count: number, sMin: number, sMax: number) {
      el.innerHTML = ''
      for (let i = 0; i < count; i++) {
        const s = document.createElement('span')
        s.className = 'swarm-f'
        s.textContent = pickFruit()
        s.style.left   = rnd(0, 100) + '%'
        s.style.fontSize = rnd(sMin, sMax) + 'px'
        const dur = rnd(7, 16)
        s.style.animationDuration = dur + 's'
        s.style.animationDelay   = (-rnd(0, dur)) + 's'
        s.style.filter = 'saturate(1.2) drop-shadow(0 4px 10px rgba(201,48,90,.15))'
        el.appendChild(s)
      }
    }
    if (swarmEl) buildSwarm(swarmEl, 34, 16, 30)

    const shuffleId = setInterval(() => {
      document.querySelectorAll('.swarm-f').forEach(s => {
        if (Math.random() < 0.12) s.textContent = pickFruit()
      })
    }, 1400)

    // Parallax on holo-fruit
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (holoEl) {
          holoEl.style.marginTop = `${window.scrollY * 0.15}px`
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Section observer — swap fruit + color
    if (glowEl) glowEl.style.background = `radial-gradient(circle,${curColor.current},transparent 70%)`

    const secs = (Object.keys(HOLO_BY_SECTION)
      .map(id => document.getElementById(id))
      .filter(Boolean)) as HTMLElement[]

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio > 0.35) {
          const id = e.target.id
          if (holoEl && HOLO_BY_SECTION[id]) {
            const pos = HOLO_POS[id] ?? { t: '0%', l: '55%' }
            holoEl.classList.remove('holo-swap')
            void holoEl.offsetWidth
            holoEl.textContent = HOLO_BY_SECTION[id]
            holoEl.classList.add('holo-swap')
            holoEl.style.top  = pos.t
            holoEl.style.left = pos.l
          }
          if (PART_COLORS[id]) {
            curColor.current = PART_COLORS[id]
            if (glowEl) glowEl.style.background = `radial-gradient(circle,${curColor.current},transparent 70%)`
          }
        }
      })
    }, { threshold: [0.35, 0.6] })

    secs.forEach(s => obs.observe(s))

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(shuffleId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div className="holo-stage">
        <div ref={holoRef} className="holo-fruit" id="holoFruit">🍍</div>
      </div>
      <div className="holo-iri" />
      <div className="holo-scan" />
      <div className="holo-grain" />
      <div ref={swarmRef} className="fruit-swarm" id="fruitSwarm" />
      <div ref={glowRef}  className="glow-orb"    id="glowOrb"   />
      <canvas ref={canvasRef} id="partCanvas" />
    </>
  )
}
