'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LOYALTY_LEVELS, DEMO_JARS } from '@/lib/loyalty';
import ModalSwarm from './ModalSwarm';

type TabId = 't1' | 't2' | 't3' | 't4' | 't5';

const FIRST_FOUR = LOYALTY_LEVELS.slice(0, 4);
const currentLevelIndex = LOYALTY_LEVELS.findIndex((lv) => DEMO_JARS >= lv.from && DEMO_JARS <= lv.to);
const currentLevel = LOYALTY_LEVELS[currentLevelIndex] ?? LOYALTY_LEVELS[LOYALTY_LEVELS.length - 1];

function connectorFill(i: number) {
  if (i < currentLevelIndex) return 100;
  if (i > currentLevelIndex) return 0;
  const lv = LOYALTY_LEVELS[i];
  return ((DEMO_JARS - lv.from + 1) / (lv.to - lv.from + 1)) * 100;
}

export default function AccountModal() {
  const t = useTranslations('account');
  const tLoy = useTranslations('loyalty');
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<TabId>('t1');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest('[data-open-account]');
      if (trigger) {
        e.preventDefault();
        setVisible(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  if (!visible) return null;

  const close = () => setVisible(false);
  const levelNames = [tLoy('level_1'), tLoy('level_2'), tLoy('level_3'), tLoy('level_4'), tLoy('level_5')];
  const remaining = currentLevel.to - DEMO_JARS;

  return (
    <div id="mem" className="open" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="mem-in">
        <ModalSwarm />
        <div className="mem-hd">
          <div className="mem-ttl">👤 {t('title')}</div>
          <button className="x" onClick={close} aria-label="Close">✕</button>
        </div>

        <div className="tabs">
          <button className={`tab${tab === 't1' ? ' on' : ''}`} onClick={() => setTab('t1')}>{t('tab_orders')}</button>
          <button className={`tab${tab === 't2' ? ' on' : ''}`} onClick={() => setTab('t2')}>{t('tab_level')}</button>
          <button className={`tab${tab === 't3' ? ' on' : ''}`} onClick={() => setTab('t3')}>{t('tab_cashback')}</button>
          <button className={`tab${tab === 't4' ? ' on' : ''}`} onClick={() => setTab('t4')}>{t('tab_wishlist')}</button>
          <button className={`tab${tab === 't5' ? ' on' : ''}`} onClick={() => setTab('t5')}>{t('tab_profile')}</button>
        </div>

        {tab === 't1' && (
          <div className="pane on">
            <div className="ord-c">
              <div className="ord-tp">
                <span className="ord-id">#RL-2024-089</span>
                <span className="sp s-ok">✓ {t('status_delivered')}</span>
              </div>
              <div className="ord-it">{t('order_1_items')}</div>
              <div className="ord-pr">185 ₪</div>
            </div>
            <div className="ord-c">
              <div className="ord-tp">
                <span className="ord-id">#RL-2024-091</span>
                <span className="sp s-go">🚚 {t('status_shipping')}</span>
              </div>
              <div className="ord-it">{t('order_2_items')}</div>
              <div className="ord-pr">145 ₪</div>
            </div>
          </div>
        )}

        {tab === 't2' && (
          <div className="pane on">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '.75rem', color: '#8B7484', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {t('your_level')}
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2D1B2E', letterSpacing: '.3px' }}>
                {currentLevel.icon} {levelNames[currentLevelIndex]}
              </div>
            </div>

            <div className="lv-prog-vis">
              {FIRST_FOUR.map((lv, i) => (
                <Fragment key={lv.icon}>
                  <div className={`lv-nd${i < currentLevelIndex ? ' done' : ''}${i === currentLevelIndex ? ' curr' : ''}`}>
                    {lv.icon}
                  </div>
                  {i < FIRST_FOUR.length - 1 && (
                    <div className="lv-con">
                      <div className="lv-cf" style={{ width: `${connectorFill(i)}%` }} />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>

            <div className="sp-card">
              <div className="sp-row">
                <span>{t('jars_bought')}</span>
                <strong>{DEMO_JARS} 🫙</strong>
              </div>
              <div className="sp-t">
                <div className="sp-f" style={{ width: `${connectorFill(currentLevelIndex)}%` }} />
              </div>
              <div className="sp-ls">
                <span>0</span>
                <span>{currentLevel.add > 0 ? t('next_level', { count: remaining }) : tLoy('forever')}</span>
                <span>{currentLevel.to >= 99 ? '22+' : currentLevel.to} 🫙</span>
              </div>
            </div>
          </div>
        )}

        {tab === 't3' && (
          <div className="pane on">
            <div className="cb-big">8.49 ₪</div>
            <div className="cb-sub">{t('cashback_available', { pct: currentLevel.pct })}</div>
            <div className="cb-h">
              <div style={{ fontSize: '.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#8B7484', marginBottom: '.7rem' }}>
                {t('cashback_history')}
              </div>
              <div className="cbr">
                <span>{t('order_label')} #RL-089</span>
                <span className="cbp">+5.55 ₪</span>
              </div>
              <div className="cbr">
                <span>{t('order_label')} #RL-091</span>
                <span className="cbp">+2.94 ₪</span>
              </div>
            </div>
          </div>
        )}

        {tab === 't4' && (
          <div className="pane on">
            <div style={{ textAlign: 'center', padding: '2rem', color: '#8B7484' }}>{t('wishlist_empty')}</div>
          </div>
        )}

        {tab === 't5' && (
          <div className="pane on">
            <div className="fg">
              <div>
                <label className="fl-lbl">{t('first_name')}</label>
                <input className="inp" placeholder={t('first_name')} />
              </div>
              <div>
                <label className="fl-lbl">{t('last_name')}</label>
                <input className="inp" placeholder={t('last_name')} />
              </div>
            </div>
            <div className="mb">
              <label className="fl-lbl">Email</label>
              <input className="inp" type="email" placeholder="email@example.com" />
            </div>
            <div className="mb">
              <label className="fl-lbl">{t('phone')}</label>
              <input className="inp" type="tel" placeholder="+972-XX-XXX-XXXX" />
            </div>
            <button className="btn-fill" style={{ width: '100%' }}>{t('save')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
