export interface BreachCheckResult {
  breached: boolean
  count: number
}

export async function sha1(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

export async function checkPasswordBreach(password: string): Promise<BreachCheckResult> {
  if (!password) {
    return { breached: false, count: 0 }
  }

  const hash = await sha1(password)
  const prefix = hash.slice(0, 5)
  const suffix = hash.slice(5)

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    method: 'GET',
    headers: {
      // Mejora de privacidad recomendada por HIBP para respuestas con relleno uniforme.
      'Add-Padding': 'true',
    },
    cache: 'no-store',
    referrerPolicy: 'no-referrer',
  })

  if (!res.ok) {
    throw new Error(`Breach check failed with status ${res.status}`)
  }

  const text = await res.text()
  const lines = text.split('\n')

  for (const line of lines) {
    const [hashSuffixRaw, countRaw] = line.trim().split(':')
    if (!hashSuffixRaw || !countRaw) continue

    if (hashSuffixRaw === suffix) {
      return {
        breached: true,
        count: Number.parseInt(countRaw, 10) || 0,
      }
    }
  }

  return {
    breached: false,
    count: 0,
  }
}
