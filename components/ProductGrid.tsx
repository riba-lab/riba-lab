import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { PRODUCTS } from '@/lib/products';
import type { Locale } from '@/lib/products';
import ProductCard from './ProductCard';

export default async function ProductGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('products');
  const ts = await getTranslations('sections');

  const labels = {
    lim:       t('limited'),
    isNew:     t('new'),
    add:       t('add'),
    sold_out:  t('sold_out'),
    available: t('available'),
    of:        t('of'),
  };

  return (
    <section className="prods" id="prd">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '0' }}>
          <div>
            <div className="s-eye">⭐ {ts('products_eye')}</div>
            <h2 className="s-h">{ts('products_title')}</h2>
            <div className="s-rule" />
          </div>
          <a href="#cats" className="btn-ghost" style={{ marginBottom: '1.2rem' }}>
            {ts('all_collections')}
          </a>
        </div>

        <div className="prod-grid">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              index={i}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
