type CTAAmazonProps = {
  buttonText: string
  amazonUrl: string
}

export function CTAAmazon({ buttonText, amazonUrl }: CTAAmazonProps) {
  return (
    <section className="bg-primary-500 py-16 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to try Lund's?
        </h2>
        <p className="mt-2 text-primary-100">
          Order on Amazon and have authentic Swedish pancakes at home.
        </p>
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-primary-600 shadow transition hover:bg-primary-50"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}
