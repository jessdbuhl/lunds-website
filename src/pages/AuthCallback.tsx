import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured.')
      return
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const hash = window.location.hash
        const isInvite =
          hash.includes('type=invite') || hash.includes('type=magiclink')

        if (isInvite) {
          navigate('/admin/set-password', { replace: true })
        } else {
          navigate('/admin', { replace: true })
        }
      }
    })

    const timeout = setTimeout(() => {
      setError('Authentication timed out. The link may have expired — please request a new invite.')
    }, 10000)

    return () => clearTimeout(timeout)
  }, [navigate])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
        <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-6 shadow-sm text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <a href="/admin/login" className="mt-4 inline-block text-sm text-stone-500 hover:text-stone-700">
            Go to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        <p className="mt-4 text-sm text-stone-500">Completing sign in…</p>
      </div>
    </div>
  )
}
