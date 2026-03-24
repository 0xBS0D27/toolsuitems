export interface PasswordOptions {
  lower: boolean
  upper: boolean
  numbers: boolean
  symbols: boolean
}

export type PasswordStrengthLevel = 'Debil' | 'Media' | 'Fuerte' | 'Muy fuerte'

const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+'

export function buildCharset(options: PasswordOptions): string {
  let charset = ''

  if (options.lower) charset += LOWER
  if (options.upper) charset += UPPER
  if (options.numbers) charset += NUMS
  if (options.symbols) charset += SYMBOLS

  return charset
}

export function generatePassword(length: number, options: PasswordOptions): string {
  const charset = buildCharset(options)
  if (!charset.length) return ''

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  return Array.from(array)
    .map((x) => charset[x % charset.length])
    .join('')
}

function inferCharsetLength(password: string): number {
  if (!password) return 0
  let length = 0

  if (/[a-z]/.test(password)) length += LOWER.length
  if (/[A-Z]/.test(password)) length += UPPER.length
  if (/[0-9]/.test(password)) length += NUMS.length
  if (/[^a-zA-Z0-9]/.test(password)) length += SYMBOLS.length

  return length
}

export function calculateEntropy(password: string, charsetLength?: number): number {
  if (!password.length) return 0

  const effectiveCharset = charsetLength ?? inferCharsetLength(password)
  if (effectiveCharset <= 1) return 0

  return password.length * Math.log2(effectiveCharset)
}

export function getStrengthLevel(entropy: number): PasswordStrengthLevel {
  if (entropy < 40) return 'Debil'
  if (entropy <= 60) return 'Media'
  if (entropy <= 80) return 'Fuerte'
  return 'Muy fuerte'
}
