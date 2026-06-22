import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="hero" id="top">
      <div className="hero-inner">

        {/* Kicker badge */}
        <div className="hero-kicker">
          <span className="kicker-dot" />
          <span>🇮🇱</span>
          <span>{t('kicker')}</span>
        </div>

        {/* Main title */}
        <h1 className="hero-title">
          {t('title_1')} <em>{t('title_2')}</em>
          <span className="hero-sub">{t('subtitle')}</span>
        </h1>

        {/* Description */}
        <p className="hero-desc">{t('desc')}</p>

        {/* CTA buttons */}
        <div className="hero-btns">
          <a href="#prd" className="btn-fill">
            <span>{t('cta_shop')}</span>
          </a>
          <a href="#account" className="btn-ghost">
            {t('cta_join')}
          </a>
        </div>

        {/* Credential pills */}
        <div className="hero-pills">
          <div className="h-pill h-pill-il">
            <span className="pill-flag">🇮🇱</span>
            <span>{t('pill_israel')}</span>
          </div>
          <div className="h-pill">
            <span className="h-dot" style={{ background: '#7A9B7E' }} />
            <span>{t('pill_local')}</span>
          </div>
          <div className="h-pill">
            <span className="h-dot" style={{ background: '#C9305A' }} />
            <span>{t('pill_limited')}</span>
          </div>
          <div className="h-pill">
            <span className="h-dot" style={{ background: '#C9A045' }} />
            <span>{t('pill_handmade')}</span>
          </div>
        </div>
      </div>

      {/* ── Decorative jar in corner ── */}
      <div className="jar-corner">
        <div className="halo" />
        <div className="pulse-ring" />
        <div className="pulse-ring r2" />
        <div className="pulse-ring r3" />
        <div className="jar-center">🫙</div>

        {/* 6 floating flavor icons */}
        <div className="fcip fcip-1" style={{ background: '#FFE0D5', color: '#D43818' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 4c1.5 0 3 1 3.5 2.5C19 8 18 10 17 12c-1 2-3 4-5 5.5-2 1.5-4.5 2-7 2 .5-2.5 2-5 4-6.5 1.5-1.2 2.5-2.5 3.5-4 1-1.5 1.5-3 2.5-4.5z" fill="currentColor" fillOpacity=".25" />
            <path d="M15 4c-2 1-3.5 2-5 3.5-2 2-3 4-3.5 6.5-.5 2.5-.5 4 .5 5.5" />
            <path d="M15 4c.8-.8 1.8-1.3 3-1.5" />
            <path d="M17 3.5c.5-.3 1-.4 1.5-.3" />
          </svg>
        </div>

        <div className="fcip fcip-2" style={{ background: '#F5F5F5', color: '#5A4A52' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".18" />
            <rect x="3" y="11" width="9" height="9" rx="1" />
            <rect x="12" y="11" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".3" />
            <rect x="12" y="11" width="9" height="9" rx="1" />
            <rect x="7" y="3" width="9" height="9" rx="1" fill="currentColor" fillOpacity=".25" />
            <rect x="7" y="3" width="9" height="9" rx="1" />
          </svg>
        </div>

        <div className="fcip fcip-3" style={{ background: '#FFF4A8', color: '#B89A00' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="14" rx="6" ry="7.5" transform="rotate(-20 12 14)" fill="currentColor" fillOpacity=".3" />
            <ellipse cx="12" cy="14" rx="6" ry="7.5" transform="rotate(-20 12 14)" />
            <path d="M16 7c1-1 2.5-1.5 3.5-1 .5 1.5-.5 3-2 4" fill="currentColor" fillOpacity=".25" />
            <path d="M16 7c1-1 2.5-1.5 3.5-1 .5 1.5-.5 3-2 4" />
          </svg>
        </div>

        <div className="fcip fcip-4" style={{ background: '#F5E4C8', color: '#8B5A2B' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c-3 5-6 9-6 13a6 6 0 0 0 12 0c0-4-3-8-6-13z" fill="currentColor" fillOpacity=".25" />
            <path d="M12 3c-3 5-6 9-6 13a6 6 0 0 0 12 0c0-4-3-8-6-13z" />
            <ellipse cx="10" cy="14" rx="1.5" ry="2" fill="currentColor" fillOpacity=".6" stroke="none" />
          </svg>
        </div>

        <div className="fcip fcip-5" style={{ background: '#E0F0D8', color: '#4A7A3A' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3c-2 6-5 10-9 12-4 2-8 2-9-1 0-3 2-7 6-9 4-2 8-2 12-2z" fill="currentColor" fillOpacity=".25" />
            <path d="M21 3c-2 6-5 10-9 12-4 2-8 2-9-1 0-3 2-7 6-9 4-2 8-2 12-2z" />
            <path d="M21 3c-3 4-6 7-10 9-2 1-4 2-6 3.5" strokeOpacity=".5" />
          </svg>
        </div>

        <div className="fcip fcip-6" style={{ background: '#E8E4F5', color: '#6E5494' }}>
          <svg className="fi-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21V8" />
            <ellipse cx="10" cy="14" rx="2.5" ry="1.2" transform="rotate(-30 10 14)" fill="currentColor" fillOpacity=".3" />
            <ellipse cx="14" cy="11" rx="2.5" ry="1.2" transform="rotate(30 14 11)" fill="currentColor" fillOpacity=".3" />
            <ellipse cx="10" cy="14" rx="2.5" ry="1.2" transform="rotate(-30 10 14)" />
            <ellipse cx="14" cy="11" rx="2.5" ry="1.2" transform="rotate(30 14 11)" />
            <circle cx="12" cy="6" r="2.5" fill="currentColor" fillOpacity=".35" />
            <circle cx="12" cy="6" r="2.5" />
          </svg>
        </div>

        <div className="jar-tag">{t('jar_tag')}</div>
      </div>
    </section>
  );
}
