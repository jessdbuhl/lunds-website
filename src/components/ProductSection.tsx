type ProductSectionProps = {
  title: string
  description: string
  imageUrl: string
}

export function ProductSection({ title, description, imageUrl }: ProductSectionProps) {
  return (
    <section id="product" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              {description}
            </p>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="max-h-80 w-auto rounded-2xl object-contain shadow-lg"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-stone-200 text-stone-500">
                Product image
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
