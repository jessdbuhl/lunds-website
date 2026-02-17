type FooterProps = {
  footerText: string
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/80 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-stone-600 sm:px-6">
        {footerText}
      </div>
    </footer>
  )
}
