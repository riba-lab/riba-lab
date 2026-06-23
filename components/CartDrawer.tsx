'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import ModalSwarm from './ModalSwarm';

const DELIVERY_OPTIONS = [
  { key: 'pickup', cost: 0 },
  { key: 'courier', cost: 29 },
  { key: 'express', cost: 59 },
] as const;

export default function CartDrawer() {
  const locale = useLocale() as Locale;
  const t = useTranslations('cart');
  const { cart, isOpen, closeCart, changeQty, subtotal, toastMsg } = useCart();
  const [delKey, setDelKey] = useState<(typeof DELIVERY_OPTIONS)[number]['key']>('pickup');

  const delCost = DELIVERY_OPTIONS.find((d) => d.key === delKey)?.cost ?? 0;
  const total = subtotal + (cart.length ? delCost : 0);

  return (
    <>
      <div id="cart-ov" className={isOpen ? 'open' : ''} onClick={closeCart} />
      <div id="scart" className={isOpen ? 'open' : ''}>
        <ModalSwarm />
        <div className="sc-hd">
          <div className="sc-ttl">🛒 {t('title')}</div>
          <button className="x" onClick={closeCart} aria-label="Close">✕</button>
        </div>

        <div className="sc-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8B7484' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🫙</div>
              <div>{t('empty')}</div>
            </div>
          ) : (
            cart.map((item) => (
              <div className="ci" key={item.id}>
                <div className="ci-img">{item.emoji}</div>
                <div className="ci-inf">
                  <div className="ci-nm">{item.name[locale]}</div>
                  <div className="ci-pr">{item.price} ₪</div>
                  <div className="qty">
                    <button className="qb" onClick={() => changeQty(item.id, -1)} aria-label="-">−</button>
                    <span className="qn">{item.qty}</span>
                    <button className="qb" onClick={() => changeQty(item.id, 1)} aria-label="+">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sc-ft">
          <div className="del-box">
            <div className="del-ttl">{t('delivery_title')}</div>
            <div className="del-opts">
              {DELIVERY_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  className={`do${delKey === opt.key ? ' sel' : ''}`}
                  onClick={() => setDelKey(opt.key)}
                >
                  {t(opt.key)}
                </button>
              ))}
            </div>
          </div>
          <div className="tot-row">
            <span className="tot-lbl">{t('total')}</span>
            <span className="tot-val">{total} ₪</span>
          </div>
          <div className="pay-row">
            <div className="pc-chip">VISA</div>
            <div className="pc-chip">MC</div>
            <div className="pc-chip">Bit</div>
            <div className="pc-chip">🍎 Pay</div>
          </div>
          <button className="chk">{t('checkout')}</button>
        </div>
      </div>

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </>
  );
}
