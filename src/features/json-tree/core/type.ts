import type { ElkNodeLayoutOptions, IconData, PortData } from 'reaflow'

export interface NodeData<T = Record<string, unknown>> {
  id: string
  disabled?: boolean
  text?: string | [string, string][]
  path?: string
  height?: number
  width?: number
  isParent?: string
  ports?: PortData[]
  icon?: IconData
  nodePadding?: number | [number, number] | [number, number, number, number]
  data?: T & {
    type?: string
    isParent?: boolean
    isEmpty?: boolean
    childrenCount?: number
    objectKeyTargets?: Record<string, string>
  }
  className?: string
  layoutOptions?: ElkNodeLayoutOptions
  selectionDisabled?: boolean
}

export interface EdgeData<T = Record<string, unknown>> {
  id: string
  disabled?: boolean
  text?: unknown
  from?: string
  to?: string
  fromPort?: string
  toPort?: string
  data?: T
  className?: string
  containerClassName?: string
  arrowHeadType?: unknown
  parent?: string
  selectionDisabled?: boolean
}
