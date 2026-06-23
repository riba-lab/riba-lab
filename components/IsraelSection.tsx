import { getTranslations } from 'next-intl/server';

export default async function IsraelSection() {
  const t = await getTranslations('israel');

  const features = [
    {
      bg: '#FCE4EC', color: '#C9305A',
      title: t('feature_1_title'), sub: t('feature_1_desc'),
      icon: <path d="M12 2C9 6 6 9 6 13a6 6 0 0 0 12 0c0-4-3-7-6-11z" />,
    },
    {
      bg: '#E8F0E5', color: '#4A6B4F',
      title: t('feature_2_title'), sub: t('feature_2_desc'),
      icon: (
        <>
          <path d="M12 22s-8-4.5-8-12a8 8 0 0 1 16 0c0 7.5-8 12-8 12z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
    },
    {
      bg: '#F2EAF7', color: '#4A2E4D',
      title: t('feature_3_title'), sub: t('feature_3_desc'),
      icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    },
    {
      bg: 'rgba(229,199,107,.18)', color: '#C9A045',
      title: t('feature_4_title'), sub: t('feature_4_desc'),
      icon: (
        <>
          <circle cx="12" cy="8" r="6" />
          <path d="M9 13.5L7 22l5-3 5 3-2-8.5" />
        </>
      ),
    },
  ];

  const pins = [
    { cx: 100, cy: 50, color: '#C9305A', label: t('galilee'), emoji: '🍇', tt: 'il-tt-1' },
    { cx: 105, cy: 110, color: '#E5C76B', label: t('sharon'), emoji: '🍓', tt: 'il-tt-2' },
    { cx: 98, cy: 175, color: '#E8B7C5', label: t('telaviv'), emoji: '🌹', tt: 'il-tt-3' },
    { cx: 92, cy: 240, color: '#7A9B7E', label: t('negev'), emoji: '🍊', tt: 'il-tt-4' },
  ];

  return (
    <section className="israel-sec" id="israel">
      <div className="container">
        <div className="il-wrap">
          <div>
            <div className="il-flag-row">
              <div className="il-flag">
                <svg viewBox="0 0 60 40">
                  <rect width="60" height="40" fill="#fff" />
                  <rect width="60" height="6" y="3" fill="#0052A5" />
                  <rect width="60" height="6" y="31" fill="#0052A5" />
                  <g transform="translate(30,20)" stroke="#0052A5" strokeWidth="1.4" fill="none">
                    <polygon points="0,-7 6,3.5 -6,3.5" />
                    <polygon points="0,7 6,-3.5 -6,-3.5" />
                  </g>
                </svg>
              </div>
              <div className="il-tag">{t('tag')}</div>
            </div>
            <h2 className="s-h">{t('title')}</h2>
            <div className="s-rule" />
            <p className="s-p">{t('desc')}</p>

            <div className="il-features">
              {features.map((f, i) => (
                <div className="il-feat" key={i}>
                  <div className="il-ico-wrap" style={{ background: f.bg, color: f.color }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {f.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="il-feat-t">{f.title}</div>
                    <div className="il-feat-s">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="il-right">
            <div className="il-map">
              <svg viewBox="0 0 200 320">
                <defs>
                  <linearGradient id="ilg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A88DBF" />
                    <stop offset="50%" stopColor="#2D1B2E" />
                    <stop offset="100%" stopColor="#1A0F1B" />
                  </linearGradient>
                  <filter id="ilshadow">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#2D1B2E" floodOpacity=".3" />
                  </filter>
                </defs>
                <path
                  filter="url(#ilshadow)"
                  fill="url(#ilg)"
                  d="M85,8 L110,12 L120,28 L115,42 L122,55 L130,72 L138,90 L142,110 L145,130 L142,148 L135,165 L128,180 L122,198 L115,215 L108,232 L100,250 L92,268 L82,288 L75,305 L68,295 L62,278 L60,258 L62,238 L65,218 L60,200 L52,182 L48,162 L52,142 L58,122 L62,102 L65,82 L68,62 L72,42 L78,22 Z"
                />
                {pins.map((p, i) => (
                  <g className={`il-pin il-pin-${i + 1}`} key={i}>
                    <circle cx={p.cx} cy={p.cy} r="6" fill={p.color} />
                    <circle cx={p.cx} cy={p.cy} r="14" fill={p.color} opacity=".25" />
                  </g>
                ))}
              </svg>
              {pins.map((p, i) => (
                <div className={`il-tooltip ${p.tt}`} key={i}>
                  {p.emoji} <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
