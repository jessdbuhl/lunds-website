export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="text-lg font-semibold text-stone-900">
          Lund's
        </a>
        <nav className="flex items-center gap-6 text-sm text-stone-600">
          <a href="/#product" className="hover:text-stone-900">
            Product
          </a>
          <a href="/#story" className="hover:text-stone-900">
            Our Story
          </a>
        </nav>
      </div>
    </header>
  )
}
