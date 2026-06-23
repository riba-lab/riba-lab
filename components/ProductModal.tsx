'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { PRODUCTS, type Locale } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import FlavorIcon from './FlavorIcon';
import ModalSwarm from './ModalSwarm';

const BG_COLORS = ['#A88DBF', '#E5C76B', '#E04D77', '#C2ACD6', '#E8B7C5', '#7A9B7E'];

export default function ProductModal() {
  const locale = useLocale() as Locale;
  const t = useTranslations('products');
  const { addToCart } = useCart();
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ id: number }>).detail.id;
      setProductId(id);
    };
    document.addEventListener('riba:openProductModal', handler);
    return () => document.removeEventListener('riba:openProductModal', handler);
  }, []);

  const product = productId !== null ? PRODUCTS.find((p) => p.id === productId) : undefined;
  if (!product) return null;

  const close = () => setProductId(null);

  const qrCells = Array.from({ length: 49 }, (_, i) => (i * 7 + product.id * 3 + i * i) % 5 < 2);

  return (
    <div id="pm" className="open" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="pm-in">
        <ModalSwarm />
        <button className="pm-close" onClick={close} aria-label="Close">✕</button>

        <div
          className="pm-img"
          style={{ background: `radial-gradient(ellipse at 38% 32%,${BG_COLORS[product.id % 6]},#2D1B2E 60%,#1A0F1B 100%)` }}
        >
          <ModalSwarm className="pm-img-swarm" count={14} sizeMin={18} sizeMax={32} />
          <div className="pm-emoji">{product.emoji}</div>
        </div>

        <div className="pm-bd">
          <div>
            <div className="pm-coll">{product.coll[locale]}</div>
            <div className="pm-nm">{product.name[locale]}</div>
          </div>
          <div className="pm-dc">{product.desc[locale]}</div>

          <div>
            <div className="pm-fh">{t('flavor_profile')}</div>
            <div className="flavor-row" style={{ gap: '.85rem' }}>
              {product.flavors.map((f, i) => (
                <FlavorIcon key={i} type={f.type} level={f.level} />
              ))}
            </div>
          </div>

          <div className="qr-wrap">
            <div className="qr-bx">
              <div className="qr-gr">
                {qrCells.map((filled, i) => (
                  <div key={i} className="qr-c" style={{ background: filled ? '#2D1B2E' : 'transparent' }} />
                ))}
              </div>
            </div>
            <div>
              <div className="qr-id">QR #RL-{String(product.id).padStart(5, '0')}</div>
              <div className="qr-sl">{t('scan')}</div>
              {product.lim && <div className="pm-lim" style={{ marginTop: '.4rem' }}>⚡ {t('limited_edition')}</div>}
            </div>
          </div>

          <div className="pm-pr-row">
            <div className="pm-pr">{product.price} ₪</div>
          </div>

          <button
            className="pm-add"
            disabled={product.stock <= 0}
            onClick={() => {
              addToCart(product.id);
              close();
            }}
          >
            {product.stock <= 0 ? t('sold_out') : t('add')}
          </button>
        </div>
      </div>
    </div>
  );
}
