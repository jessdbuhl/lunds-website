export interface SiteContentRow {
  id: string
  key: string
  value: string | number | boolean | Record<string, unknown> | null
  updated_at: string
}

export interface SiteContentMap {
  hero_headline: string
  hero_subhead: string
  hero_image_url: string
  product_title: string
  product_description: string
  product_image_url: string
  cta_button_text: string
  amazon_url: string
  story_title: string
  story_text: string
  footer_text: string
  meta_title: string
  meta_description: string
}

export const DEFAULT_CONTENT: SiteContentMap = {
  hero_headline: "Lund's Swedish Pancake Mix",
  hero_subhead: "Authentic Scandinavian flavor. Just add water, mix & make—pancakes in minutes.",
  hero_image_url: '',
  product_title: "Lund's Swedish Pancake Mix",
  product_description: "Our flagship mix brings the taste of Sweden to your table. Simple ingredients, no fuss—just add water for light, delicious Swedish-style pancakes. Perfect for breakfast or anytime.",
  product_image_url: '',
  cta_button_text: 'Buy on Amazon',
  amazon_url: 'https://www.amazon.com',
  story_title: "Our Story",
  story_text: "Lund's has been part of Scandinavian food tradition for generations. Noon Hour Food Products is proud to bring Lund's Swedish Pancake Mix to American tables—quality you can taste.",
  footer_text: "Lund's Swedish Pancake Mix · Noon Hour Food Products · Chicago, IL",
  meta_title: "Lund's Swedish Pancake Mix | Authentic Scandinavian Pancakes",
  meta_description: "Authentic Lund's Swedish Pancake Mix. Just add water for delicious Scandinavian-style pancakes. Available on Amazon.",
}

export function getString(value: unknown, fallback: string): string {
  if (value == null) return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return fallback
}
