import { useCallback, useState } from 'react'
import { checkPasswordBreach, type BreachCheckResult } from '../utils/breachUtils'

export function useBreachCheck() {
  const [result, setResult] = useState<BreachCheckResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const check = useCallback(async (password: string) => {
    if (!password) {
      setResult(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await checkPasswordBreach(password)
      setResult(res)
    } catch {
      setError('No se pudo verificar la contraseña. Intenta nuevamente.')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { check, result, loading, error }
}
