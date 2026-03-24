import { useCallback, useMemo, useState } from 'react'
import {
  buildCharset,
  calculateEntropy,
  generatePassword,
  getStrengthLevel,
  type PasswordOptions,
} from '../utils/passwordUtils'

const DEFAULT_OPTIONS: PasswordOptions = {
  lower: true,
  upper: true,
  numbers: true,
  symbols: true,
}

export function usePasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS)
  const [autoCopy, setAutoCopy] = useState(false)
  const [password, setPassword] = useState('')
  const [isMasked, setIsMasked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [version, setVersion] = useState(0)

  const charset = useMemo(() => buildCharset(options), [options])
  const entropy = useMemo(() => calculateEntropy(password, charset.length), [password, charset.length])
  const strength = useMemo(() => getStrengthLevel(entropy), [entropy])

  const copyPassword = useCallback(async () => {
    if (!password) return false
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
      return true
    } catch {
      return false
    }
  }, [password])

  const generate = useCallback(async () => {
    const next = generatePassword(length, options)
    setPassword(next)
    setVersion((v) => v + 1)

    if (autoCopy && next) {
      try {
        await navigator.clipboard.writeText(next)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      } catch {
        // No-op: clipboard can fail in restricted contexts.
      }
    }
  }, [length, options, autoCopy])

  const toggleOption = useCallback((key: keyof PasswordOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  return {
    length,
    setLength,
    options,
    toggleOption,
    autoCopy,
    setAutoCopy,
    password,
    generate,
    copied,
    copyPassword,
    isMasked,
    setIsMasked,
    entropy,
    strength,
    version,
    charsetLength: charset.length,
  }
}
