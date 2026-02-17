import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { STORAGE_BUCKET } from '../lib/supabase'
import type { SiteContentMap } from '../types/content'
import { DEFAULT_CONTENT } from '../types/content'

const CONTENT_KEYS: (keyof SiteContentMap)[] = [
  'hero_headline',
  'hero_subhead',
  'hero_image_url',
  'product_title',
  'product_description',
  'product_image_url',
  'cta_button_text',
  'amazon_url',
  'story_title',
  'story_text',
  'footer_text',
  'meta_title',
  'meta_description',
]

export function AdminDashboard() {
  const navigate = useNavigate()
  const [content, setContent] = useState<SiteContentMap>(DEFAULT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login?redirect=/admin', { replace: true })
        return
      }
      loadContent()
    })
  }, [navigate])

  async function loadContent() {
    if (!supabase) {
      setLoading(false)
      return
    }
    try {
      const { data, error } = await supabase.from('site_content').select('key, value')
      if (error) throw error
      const map = { ...DEFAULT_CONTENT }
      if (data) {
        for (const row of data) {
          const key = row.key as keyof SiteContentMap
          if (key in map && row.value != null) {
            const val = row.value
            ;(map as Record<string, unknown>)[key] =
              typeof val === 'object' && val !== null && 'value' in val
                ? (val as { value: unknown }).value
                : val
          }
        }
      }
      setContent(map as SiteContentMap)
    } catch {
      setMessage({ type: 'error', text: 'Failed to load content.' })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase is not configured.' })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      for (const key of CONTENT_KEYS) {
        const value = content[key]
        await supabase.from('site_content').upsert(
          { key, value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        )
      }
      setMessage({ type: 'success', text: 'Content saved.' })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(key: 'hero_image_url' | 'product_image_url', file: File) {
    if (!supabase) return
    const ext = file.name.split('.').pop() || 'jpg'
    const path = `${key.replace('_url', '')}-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })
    if (error) {
      setMessage({ type: 'error', text: error.message })
      return
    }
    const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(data.path)
    setContent((prev) => ({ ...prev, [key]: urlData.publicUrl }))
  }

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    )
  }

  const textFields: { key: keyof SiteContentMap; label: string; multiline?: boolean }[] = [
    { key: 'hero_headline', label: 'Hero headline' },
    { key: 'hero_subhead', label: 'Hero subhead' },
    { key: 'product_title', label: 'Product title' },
    { key: 'product_description', label: 'Product description', multiline: true },
    { key: 'cta_button_text', label: 'CTA button text' },
    { key: 'amazon_url', label: 'Amazon URL' },
    { key: 'story_title', label: 'Story title' },
    { key: 'story_text', label: 'Story text', multiline: true },
    { key: 'footer_text', label: 'Footer text' },
    { key: 'meta_title', label: 'Meta title (SEO)' },
    { key: 'meta_description', label: 'Meta description (SEO)', multiline: true },
  ]

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold text-stone-900">Edit site content</h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              Preview site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <form onSubmit={handleSave} className="space-y-8">
          {message && (
            <p
              className={`rounded-lg p-3 text-sm ${
                message.type === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message.text}
            </p>
          )}

          <section className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="text-base font-semibold text-stone-900">Hero</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Hero image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-stone-600 file:mr-2 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1 file:text-primary-700"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleImageUpload('hero_image_url', f)
                  }}
                />
                {content.hero_image_url && (
                  <img
                    src={content.hero_image_url}
                    alt="Hero"
                    className="mt-2 h-24 w-auto rounded object-cover"
                  />
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="text-base font-semibold text-stone-900">Product</h2>
            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-700">Product image</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full text-sm text-stone-600 file:mr-2 file:rounded file:border-0 file:bg-primary-50 file:px-3 file:py-1 file:text-primary-700"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleImageUpload('product_image_url', f)
                }}
              />
              {content.product_image_url && (
                <img
                  src={content.product_image_url}
                  alt="Product"
                  className="mt-2 h-24 w-auto rounded object-cover"
                />
              )}
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-6">
            <h2 className="text-base font-semibold text-stone-900">All text fields</h2>
            <div className="mt-4 space-y-4">
              {textFields.map(({ key, label, multiline }) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-stone-700">
                    {label}
                  </label>
                  {multiline ? (
                    <textarea
                      id={key}
                      value={content[key]}
                      onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
                      rows={3}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  ) : (
                    <input
                      id={key}
                      type="text"
                      value={content[key]}
                      onChange={(e) => setContent((c) => ({ ...c, [key]: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-primary-500 px-6 py-2 font-medium text-white transition hover:bg-primary-600 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save all content'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
