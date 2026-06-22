'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Logo from './Logo'

const DROPDOWN: Record<string, { icon: string; label: string; href: string }[]> = {
  he: [
    { icon: '🏠', label: 'בית',          href: '#top'     },
    { icon: '🗂', label: 'קולקציות',     href: '#cats'    },
    { icon: '🫙', label: 'קטלוג',        href: '#prd'     },
    { icon: '🇮🇱', label: 'על ישראל שלנו', href: '#israel'  },
    { icon: '💎', label: 'נאמנות',       href: '#loy'     },
  ],
  ru: [
    { icon: '🏠', label: 'Главная',             href: '#top'    },
    { icon: '🗂', label: 'Коллекции',           href: '#cats'   },
    { icon: '🫙', label: 'Каталог',             href: '#prd'    },
    { icon: '🇮🇱', label: 'О нашем Израиле',   href: '#israel' },
    { icon: '💎', label: 'Лояльность',          href: '#loy'    },
  ],
}

const MAIN_LINKS: Record<string, { label: string; href: string }[]> = {
  he: [
    { label: 'קולקציות', href: '#cats' },
    { label: 'קטלוג',    href: '#prd'  },
    { label: 'נאמנות',   href: '#loy'  },
  ],
  ru: [
    { label: 'Коллекции', href: '#cats' },
    { label: 'Каталог',   href: '#prd'  },
    { label: 'Лояльность', href: '#loy'  },
  ],
}

const LANG_PILL: Record<string, string> = { he: '🇮🇱 HE', ru: '🇷🇺 RU' }
const ACCOUNT_LABEL: Record<string, string> = { he: 'חשבון אישי', ru: 'Личный кабинет' }
const CART_LABEL:    Record<string, string> = { he: 'עגלה',       ru: 'Корзина'         }

export default function Header() {
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const dropdown  = DROPDOWN[locale]  ?? DROPDOWN.ru
  const mainLinks = MAIN_LINKS[locale] ?? MAIN_LINKS.ru

  const openLangModal = () => {
    document.dispatchEvent(new CustomEvent('riba:openLangModal'))
  }

  return (
    <nav className="site-nav">
      {/* ── Logo + dropdown ── */}
      <div ref={wrapRef} className={`nav-logo-wrap${open ? ' open' : ''}`}>
        <button
          className="nav-logo-btn"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <Logo variant="mark" size={28} href={null} />
          <span className="nav-logo-text">
            RIBA <em>Lab</em>
          </span>
          <span className="nav-tube" aria-hidden>🧪</span>
          <span className="nav-chev" aria-hidden>▾</span>
        </button>

        <div
          className={`logo-dropdown${open ? ' open' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          {dropdown.map(item => (
            <a
              key={item.href}
              className="lm-item"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span className="lm-item-ico">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
          <div className="lm-divider" />
          <a className="lm-item" href="#account" onClick={() => setOpen(false)}>
            <span className="lm-item-ico">👤</span>
            <span>{ACCOUNT_LABEL[locale] ?? ACCOUNT_LABEL.ru}</span>
          </a>
          <a className="lm-item" href="#cart" onClick={() => setOpen(false)}>
            <span className="lm-item-ico">🛒</span>
            <span>{CART_LABEL[locale] ?? CART_LABEL.ru}</span>
          </a>
        </div>
      </div>

      {/* ── Centre links (desktop) ── */}
      <div className="nav-links">
        {mainLinks.map(link => (
          <a key={link.href} className="nav-a" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      {/* ── Right side ── */}
      <div className="nav-r">
        <button className="lp" onClick={openLangModal}>
          {LANG_PILL[locale] ?? '🌐'}
        </button>
        <button className="nav-ic" aria-label="Account">👤</button>
        <button className="nav-ic" aria-label="Cart">
          🛒
          <span className="nbadge">0</span>
        </button>
      </div>
    </nav>
  )
}
