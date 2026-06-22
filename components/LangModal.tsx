'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'

const STORAGE_KEY = 'riba-lang'

const SWARM = ['🍓','🫐','🍋','🍑','🥭','🍒','🍇','🍊','🌸','🍯','🍎','🌿']

function rnd(a: number, b: number) { return a + Math.random() * (b - a) }

const LANGS = [
  { code: 'he', flag: '🇮🇱', label: 'עברית',   sub: 'ריבה מיוחדת',          active: true  },
  { code: 'ru', flag: '🇷🇺', label: 'Русский', sub: 'Варенье ручной работы', active: true  },
  { code: 'en', flag: '🇬🇧', label: 'English', sub: 'Coming soon',           active: false },
  { code: 'fr', flag: '🇫🇷', label: 'Français', sub: 'Bientôt',              active: false },
]

export default function LangModal() {
  const locale  = useLocale()
  const [visible, setVisible] = useState(false)
  const swarmRef = useRef<HTMLDivElement>(null)

  // Show on first visit (no saved preference)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) setVisible(true)
  }, [])

  // Listen for re-open event from Header
  useEffect(() => {
    const handler = () => setVisible(true)
    document.addEventListener('riba:openLangModal', handler)
    return () => document.removeEventListener('riba:openLangModal', handler)
  }, [])

  // Build mini fruit swarm inside modal
  useEffect(() => {
    const el = swarmRef.current
    if (!el || !visible) return
    el.innerHTML = ''
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span')
      s.className = 'swarm-f'
      s.textContent = SWARM[Math.floor(Math.random() * SWARM.length)]
      s.style.left   = rnd(0, 100) + '%'
      s.style.fontSize = rnd(12, 22) + 'px'
      const dur = rnd(5, 12)
      s.style.animationDuration = dur + 's'
      s.style.animationDelay   = (-rnd(0, dur)) + 's'
      s.style.animationName    = 'swarmFloatSm'
      el.appendChild(s)
    }
  }, [visible])

  const pick = (code: string) => {
    localStorage.setItem(STORAGE_KEY, code)
    setVisible(false)
    window.location.href = `/${code}`
  }

  if (!visible) return null

  return (
    <div className="lang-modal-bg" onClick={() => {
      // close only if a lang was previously saved
      if (localStorage.getItem(STORAGE_KEY)) setVisible(false)
    }}>
      <div className="lang-modal" onClick={e => e.stopPropagation()}>
        {/* Mini swarm */}
        <div ref={swarmRef} className="modal-swarm" />

        <div className="lm-logo">RIBA <em>Lab</em></div>
        <div className="lm-sub">
          {locale === 'he' ? 'מעבדת ריבה' : 'Лаборатория варенья'}
        </div>
        <div className="lm-line" />

        <div className="lm-grid">
          {LANGS.map(lng => (
            <button
              key={lng.code}
              className={`lm-btn${!lng.active ? ' lm-btn-soon' : ''}`}
              disabled={!lng.active}
              onClick={() => lng.active && pick(lng.code)}
            >
              <span className="fl">{lng.flag}</span>
              <div>
                <span className="lb">{lng.label}</span>
                <span className="ls">{lng.sub}</span>
                {!lng.active && (
                  <span className="soon-badge">
                    {locale === 'he' ? 'בקרוב' : 'Скоро'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
