import { create } from 'zustand'
import debounce from 'lodash.debounce'
import { useJson } from '@/features/json-tree/store/useJson'
import { useStored } from '@/features/json-tree/store/useStored'
import { JSON_TEMPLATE } from '@/features/json-tree/constants/json'

type SetContents = {
  contents?: string
  hasChanges?: boolean
  skipUpdate?: boolean
}

const initialState = {
  contents: JSON_TEMPLATE,
  error: null as string | null,
  hasChanges: false,
}

const debouncedUpdateJson = debounce((value: object) => {
  useJson.getState().setJson(JSON.stringify(value, null, 2))
}, 800)

export type AppState = typeof initialState & {
  getContents: () => string
  getHasChanges: () => boolean
  setError: (error: string | null) => void
  setHasChanges: (hasChanges: boolean) => void
  setContents: (data: SetContents) => void
  clear: () => void
}

export const useApp = create<AppState>()((set, get) => ({
  ...initialState,
  clear: () => {
    set({ contents: '' })
    useJson.getState().clear()
  },
  getContents: () => get().contents,
  getHasChanges: () => get().hasChanges,
  setContents: (data) => {
    const { contents, hasChanges = true, skipUpdate = false } = data
    if (contents !== undefined) {
      set((s) => ({ ...s, contents, hasChanges, error: null }))
    } else {
      set((s) => ({ ...s, hasChanges, error: null }))
    }
    try {
      const json = JSON.parse(get().contents)
      if (!useStored.getState().liveTransform && skipUpdate) return
      if (hasChanges === false) {
        useJson.getState().setJson(JSON.stringify(json, null, 2))
      } else {
        debouncedUpdateJson(json)
      }
    } catch {
      set((s) => ({ ...s, error: 'Invalid JSON' }))
    }
  },
  setError: (error) => set({ error }),
  setHasChanges: (hasChanges) => set({ hasChanges }),
}))
