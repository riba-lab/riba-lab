import { getTranslations } from 'next-intl/server';
import { LOYALTY_LEVELS, PROFESSOR_JARS, DEMO_JARS } from '@/lib/loyalty';

export default async function Loyalty() {
  const t = await getTranslations('loyalty');
  const names = [t('level_1'), t('level_2'), t('level_3'), t('level_4'), t('level_5')];
  const roadPct = (Math.min(DEMO_JARS, PROFESSOR_JARS) / PROFESSOR_JARS) * 100;

  return (
    <section className="loyalty" id="loy">
      <div className="loy-tex" />
      <div className="container">
        <div className="loy-wrap">
          <div>
            <div className="s-eye">💎 {t('eyebrow')}</div>
            <h2 className="s-h">{t('title')}</h2>
            <div className="s-rule" />
            <p className="s-p">{t('desc')}</p>

            <div className="lev-list">
              {LOYALTY_LEVELS.map((lv, i) => {
                const isActive = DEMO_JARS >= lv.from && DEMO_JARS <= lv.to;
                const range = lv.to >= 99 ? `${lv.from}+ 🫙` : `${lv.from}–${lv.to} 🫙`;
                const addTxt = lv.add > 0 ? `+${lv.add} 🫙` : '∞';
                return (
                  <div className={`lev-row${isActive ? ' active' : ''}`} key={lv.icon}>
                    <div className="lv-ic">{lv.icon}</div>
                    <div className="lv-in">
                      <div className="lv-nm">{names[i]}</div>
                      <div className="lv-jars">
                        <span className="lv-range">{range}</span>
                        <span className="lv-add">{addTxt}</span>
                      </div>
                    </div>
                    <div className="lv-pct">
                      {lv.pct}%<span className="lv-cb-money">💰</span>
                      {lv.pct === 15 && <span className="lv-perm">{t('forever')}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="loy-visual">
            <div className="jc-card">
              <div className="cb-wallet-banner">
                <div className="cbw-ico">💰</div>
                <div className="cbw-txt">{t('wallet_text')}</div>
              </div>
              <div className="jc-title">{t('road_title')}</div>
              <div className="jc-sub">{t('road_subtitle')}</div>

              <div className="road">
                <div className="road-progress-outer">
                  <div className="road-progress-inner" style={{ height: `${roadPct}%` }} />
                </div>
                <div className="road-stations">
                  {LOYALTY_LEVELS.map((lv, i) => {
                    const reached = DEMO_JARS >= lv.from;
                    const isCurrent = DEMO_JARS >= lv.from && DEMO_JARS <= lv.to;
                    return (
                      <div
                        className={`road-station${reached ? ' reached' : ''}${isCurrent ? ' current' : ''}`}
                        key={lv.icon}
                      >
                        <div className="rs-node">{lv.icon}</div>
                        <div className="rs-info">
                          <div className="rs-name">{names[i]}</div>
                          <div className="rs-pct">{lv.pct}% 💰</div>
                        </div>
                        <div className="rs-milestone">
                          {lv.to >= 99 ? '22+' : lv.to}
                          <span>🫙</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button className="join-btn">
                <span>{t('join_button')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
