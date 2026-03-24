function isImageUrl(imageUrl: string): boolean {
  return /(https?:\/\/.*\.(?:png|jpg|gif|webp))/i.test(imageUrl)
}

export function isContentImage(value: string | [string, string][]): boolean {
  if (typeof value !== 'string') return false
  const isBase64 = value.startsWith('data:image/') && value.includes('base64')
  return isImageUrl(value) || isBase64
}

const CHAR_WIDTH = 7.2
const CHAR_HEIGHT = 16
const NODE_TOTAL_PADDING = 20
const WIDTH_OFFSET = 4

const sizeCache = new Map<string, { width: number; height: number }>()

export function calculateNodeSize(
  text: string | [string, string][],
  isParent = false,
  options: { foldNodes?: boolean; imagePreview?: boolean } = {}
): { width: number; height: number } {
  const { foldNodes = false, imagePreview = true } = options
  const isImage = isContentImage(text) && imagePreview
  const cacheKey = [text, isParent, foldNodes].toString()

  const cached = sizeCache.get(cacheKey)
  if (cached) return cached

  let lines: string[] = []
  if (typeof text !== 'string') {
    lines = text.map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
  } else {
    lines.push(text)
  }

  let maxLen = 0
  for (const x of lines) {
    if (x.length > maxLen) maxLen = x.length
  }

  let width = Math.round(CHAR_WIDTH * maxLen + NODE_TOTAL_PADDING + WIDTH_OFFSET)
  let height = CHAR_HEIGHT * lines.length + NODE_TOTAL_PADDING

  if (isImage) {
    width = 80
    height = 80
  }
  if (foldNodes) width = 300
  if (isParent && foldNodes) width = 170
  if (isParent) width += 100
  if (width > 700) width = 700

  const result = { width, height }
  sizeCache.set(cacheKey, result)
  return result
}
