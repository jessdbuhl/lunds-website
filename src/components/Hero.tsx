type HeroProps = {
  headline: string
  subhead: string
  imageUrl: string
  ctaText: string
  amazonUrl: string
}

export function Hero({ headline, subhead, imageUrl, ctaText, amazonUrl }: HeroProps) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-primary-100/40 to-stone-50">
      {imageUrl ? (
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-900/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-200/30 to-primary-100/20" />
      )}
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-700 sm:text-xl">
          {subhead}
        </p>
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center rounded-full bg-primary-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-600"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}
