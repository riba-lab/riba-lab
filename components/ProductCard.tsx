'use client';

import type { Product, Locale } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import FlavorIcon from './FlavorIcon';

const CARD_BG = [
  'radial-gradient(ellipse at 38% 32%,#A88DBF,#4A2E4D 65%,#2D1B2E 100%)',
  'radial-gradient(ellipse at 38% 32%,#E5C76B,#8B6F1A 65%,#3D2F00 100%)',
  'radial-gradient(ellipse at 38% 32%,#E04D77,#C9305A 65%,#5A0E2A 100%)',
  'radial-gradient(ellipse at 38% 32%,#C2ACD6,#A88DBF 65%,#3D2A4D 100%)',
  'radial-gradient(ellipse at 38% 32%,#E8B7C5,#F5A8BD 65%,#C9305A 100%)',
  'radial-gradient(ellipse at 38% 32%,#7A9B7E,#4A6B4F 65%,#1F3322 100%)',
];

interface Props {
  product: Product;
  locale: Locale;
  index: number;
  labels: {
    lim: string;
    isNew: string;
    add: string;
    sold_out: string;
    available: string;
    of: string;
  };
}

export default function ProductCard({ product, locale, index, labels }: Props) {
  const { id, emoji, price, lim, isNew, stock, total, name, coll, desc, flavors } = product;
  const bg = CARD_BG[index % CARD_BG.length];
  const { addToCart } = useCart();

  const soldOut = stock === 0;
  const lowStock = !soldOut && stock <= 8;

  const stockClass = soldOut ? 'stock-b stock-out' : lowStock ? 'stock-b stock-low' : 'stock-b';

  const openModal = () => {
    document.dispatchEvent(new CustomEvent('riba:openProductModal', { detail: { id } }));
  };

  return (
    <article className={`pc${soldOut ? ' pc-sold' : ''}`} onClick={openModal} style={{ cursor: 'pointer' }}>
      {/* Image area */}
      <div className="pc-img">
        <div className="pc-bg" style={{ background: bg }} />
        <div className="pc-shimmer" />
        <span className="pc-emoji" role="img" aria-label={name[locale]}>{emoji}</span>

        {lim && (
          <span className="badgeLIM" style={{ insetInlineStart: '.9rem' }}>
            {labels.lim}
          </span>
        )}
        {isNew && (
          <span className="badgeNEW" style={{ insetInlineEnd: '.9rem' }}>
            {labels.isNew}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-coll">{coll[locale]}</div>
        <div className="pc-nm">{name[locale]}</div>
        <div className="pc-desc">{desc[locale]}</div>

        {/* Flavor icons */}
        <div className="flavor-row">
          {flavors.map((f, i) => (
            <FlavorIcon key={i} type={f.type} level={f.level} />
          ))}
        </div>

        {/* Footer: price + stock + actions */}
        <div className="pc-foot">
          <div className="pc-price-wrap">
            <div className="pc-price">
              {price} <span>₪</span>
            </div>
            <div className={stockClass}>
              {soldOut ? (
                labels.sold_out
              ) : (
                <>
                  {labels.available} <b>{stock}</b> {labels.of} {total}
                </>
              )}
            </div>
          </div>

          <div className="pc-actions">
            <button className="wb" aria-label="Wishlist" onClick={(e) => e.stopPropagation()}>♡</button>
            <button
              className={`ab${soldOut ? ' ab-out' : ''}`}
              disabled={soldOut}
              aria-label={soldOut ? labels.sold_out : labels.add}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
