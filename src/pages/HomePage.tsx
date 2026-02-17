import { useSiteContent } from '../hooks/useSiteContent'
import { DEFAULT_CONTENT } from '../types/content'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/Hero'
import { ProductSection } from '../components/ProductSection'
import { CTAAmazon } from '../components/CTAAmazon'
import { StorySection } from '../components/StorySection'
import { useEffect } from 'react'

export function HomePage() {
  const { content, loading, error } = useSiteContent()

  useEffect(() => {
    document.title = content.meta_title || "Lund's Swedish Pancake Mix"
    const metaDesc = document.querySelector('meta[name="description"]')
    if (content.meta_description) {
      if (!metaDesc) {
        const m = document.createElement('meta')
        m.name = 'description'
        m.content = content.meta_description
        document.head.appendChild(m)
      } else {
        metaDesc.setAttribute('content', content.meta_description)
      }
    }
  }, [content.meta_title, content.meta_description])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    )
  }

  const displayContent = error ? DEFAULT_CONTENT : content

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          headline={displayContent.hero_headline}
          subhead={displayContent.hero_subhead}
          imageUrl={displayContent.hero_image_url}
          ctaText={displayContent.cta_button_text}
          amazonUrl={displayContent.amazon_url}
        />
        <ProductSection
          title={displayContent.product_title}
          description={displayContent.product_description}
          imageUrl={displayContent.product_image_url}
        />
        <CTAAmazon buttonText={displayContent.cta_button_text} amazonUrl={displayContent.amazon_url} />
        <StorySection title={displayContent.story_title} text={displayContent.story_text} />
      </main>
      <Footer footerText={displayContent.footer_text} />
    </div>
  )
}
