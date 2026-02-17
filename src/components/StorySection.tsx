type StorySectionProps = {
  title: string
  text: string
}

export function StorySection({ title, text }: StorySectionProps) {
  return (
    <section id="story" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900">
          {title}
        </h2>
        <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-stone-600">
          {text}
        </p>
      </div>
    </section>
  )
}
