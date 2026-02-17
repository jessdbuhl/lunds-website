import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  type SiteContentMap,
  DEFAULT_CONTENT,
  getString,
} from '../types/content'

export function useSiteContent(): {
  content: SiteContentMap
  loading: boolean
  error: Error | null
} {
  const [content, setContent] = useState<SiteContentMap>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const client = supabase
    async function fetchContent() {
      if (!client) return
      try {
        const { data, error: e } = await client
          .from('site_content')
          .select('key, value')

        if (e) throw e

        const map = { ...DEFAULT_CONTENT }
        if (data) {
          for (const row of data) {
            const key = row.key as keyof SiteContentMap
            if (key in map && row.value != null) {
              ;(map as Record<string, unknown>)[key] =
                typeof row.value === 'object' && row.value !== null && 'value' in row.value
                  ? (row.value as { value: unknown }).value
                  : row.value
            }
          }
        }
        setContent({
          hero_headline: getString(map.hero_headline, DEFAULT_CONTENT.hero_headline),
          hero_subhead: getString(map.hero_subhead, DEFAULT_CONTENT.hero_subhead),
          hero_image_url: getString(map.hero_image_url, DEFAULT_CONTENT.hero_image_url),
          product_title: getString(map.product_title, DEFAULT_CONTENT.product_title),
          product_description: getString(map.product_description, DEFAULT_CONTENT.product_description),
          product_image_url: getString(map.product_image_url, DEFAULT_CONTENT.product_image_url),
          cta_button_text: getString(map.cta_button_text, DEFAULT_CONTENT.cta_button_text),
          amazon_url: getString(map.amazon_url, DEFAULT_CONTENT.amazon_url),
          story_title: getString(map.story_title, DEFAULT_CONTENT.story_title),
          story_text: getString(map.story_text, DEFAULT_CONTENT.story_text),
          footer_text: getString(map.footer_text, DEFAULT_CONTENT.footer_text),
          meta_title: getString(map.meta_title, DEFAULT_CONTENT.meta_title),
          meta_description: getString(map.meta_description, DEFAULT_CONTENT.meta_description),
        })
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}
