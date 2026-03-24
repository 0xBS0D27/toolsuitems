import { useCallback, useRef } from 'react'

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const fnRef = useRef(fn)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  fnRef.current = fn

  const debounced = useCallback(
    (...args: Args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args)
        timeoutRef.current = null
      }, delay)
    },
    [delay]
  )

  return debounced
}
