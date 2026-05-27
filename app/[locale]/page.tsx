import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tSite = await getTranslations({ locale, namespace: 'site' });

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 sm:px-10">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-145 w-145 rounded-full bg-berry/10 blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 h-120 w-120 rounded-full bg-lavender/10 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 h-100 w-100 rounded-full bg-blush/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center gap-10 rounded-4xl border border-plum/10 bg-white/80 p-10 shadow-[0_40px_120px_rgba(45,27,46,0.10)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-plum/60">
          {tSite('tagline')}
        </p>
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-plum sm:text-7xl">
          {t('headline')}
        </h1>
        <p className="max-w-lg text-center text-base leading-8 text-plum/70 sm:text-lg">
          {t('subline')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#shop"
            className="rounded-full bg-berry px-8 py-3 text-sm font-medium text-cream shadow-md transition hover:bg-berry-2"
          >
            {t('cta_shop')}
          </a>
          <a
            href="#about"
            className="rounded-full border border-plum/20 bg-white px-8 py-3 text-sm font-medium text-plum transition hover:bg-plum/5"
          >
            {t('cta_about')}
          </a>
        </div>
      </div>
    </main>
  );
}
