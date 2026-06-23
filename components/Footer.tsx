import { getTranslations } from 'next-intl/server';
import Logo from './Logo';

const PAYMENT_CHIPS = ['VISA', 'Mastercard', 'Bit', 'PayPal', 'Apple Pay', 'Google Pay', 'Max'];

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="ft-lg">
        <Logo theme="dark" href={null} />
      </div>
      <div className="ft-s">{t('tagline')}</div>
      <div className="ft-ls">
        <a className="ft-l" href="#">{t('about')}</a>
        <a className="ft-l" href="#">{t('delivery')}</a>
        <a className="ft-l" href="#">{t('privacy')}</a>
        <a className="ft-l" href="#">{t('contact')}</a>
      </div>
      <div className="ft-py">
        {PAYMENT_CHIPS.map((chip) => (
          <div className="pych" key={chip}>{chip}</div>
        ))}
      </div>
      <div className="ft-cp">{t('copyright', { year })}</div>
    </footer>
  );
}
