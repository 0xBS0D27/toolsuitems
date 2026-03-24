import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialStates = {
  lightmode: true,
  hideCollapse: true,
  childrenCount: true,
  imagePreview: true,
  liveTransform: true,
}

export type StoredState = typeof initialStates & {
  setLightTheme: (theme: boolean) => void
  toggleHideCollapse: (value: boolean) => void
  toggleChildrenCount: (value: boolean) => void
  toggleImagePreview: (value: boolean) => void
  toggleLiveTransform: (value: boolean) => void
}

export const useStored = create<StoredState>()(
  persist(
    (set) => ({
      ...initialStates,
      setLightTheme: (lightmode) => set({ lightmode }),
      toggleHideCollapse: (hideCollapse) => set({ hideCollapse }),
      toggleChildrenCount: (childrenCount) => set({ childrenCount }),
      toggleImagePreview: (imagePreview) => set({ imagePreview }),
      toggleLiveTransform: (liveTransform) => set({ liveTransform }),
    }),
    { name: 'toolsuitems-json-tree-config' }
  )
)
