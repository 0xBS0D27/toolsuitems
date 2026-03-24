import { useCallback, useRef } from 'react'

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): T {
  const fnRef = useRef(fn)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  fnRef.current = fn

  const debounced = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args)
        timeoutRef.current = null
      }, delay)
    }) as T,
    [delay]
  )

  return debounced
}
