import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { COLLECTIONS } from '@/lib/products';
import type { Locale } from '@/lib/products';

export default async function Collections() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('sections');

  return (
    <section className="cats" id="cats">
      <div className="container">
        <div>
          <div className="s-eye">🗂 {t('collections_eye')}</div>
          <h2 className="s-h">{t('collections_title')}</h2>
          <div className="s-rule" />
          <p className="s-p">{t('collections_desc')}</p>
        </div>

        <div className="cat-grid">
          {COLLECTIONS.map((col) => (
            <a key={col.id} className="cat-card" href={`#prd`}>
              <div className="cat-month-tag">{col.year}</div>
              <span className="cat-ic" role="img" aria-label={col.name[locale]}>
                {col.icon}
              </span>
              <div className="cat-nm">{col.name[locale]}</div>
              <div className="cat-sb">{col.sub[locale]}</div>
              <div className="cat-pill">{t('view')}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
