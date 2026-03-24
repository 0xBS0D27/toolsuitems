type GetKeyColor = {
  parent?: boolean
  type?: string
  objectKey?: boolean
  dark?: boolean
}

export function getKeyColor(p: GetKeyColor): string {
  if (p.dark) {
    if (p.parent) {
      if (p.type === 'array') return 'text-orange-400'
      return 'text-sky-400'
    }
    if (p.objectKey) return 'text-sky-300'
    return 'text-gray-200'
  }
  if (p.parent) {
    if (p.type === 'array') return 'text-[orangered]'
    return 'text-blue-600'
  }
  if (p.objectKey) return 'text-[crimson]'
  return 'text-gray-900'
}

export function getValueColor(value: string, dark = false): string {
  if (dark) {
    if (!Number.isNaN(Number(value))) return 'text-green-400'
    if (value === 'true') return 'text-lime-400'
    if (value === 'false') return 'text-red-400'
    if (value === 'null') return 'text-gray-400'
    return 'text-slate-300'
  }
  if (!Number.isNaN(Number(value))) return 'text-green-700'
  if (value === 'true') return 'text-blue-600'
  if (value === 'false') return 'text-red-600'
  if (value === 'null') return 'text-gray-500'
  return 'text-[darkblue]'
}
