import type { CSSProperties, ReactNode } from 'react'
import { classNames } from '@/features/json-tree/utility/classNames'

export type ForeignNodeWrapperProps = {
  width: number | undefined
  height: number | undefined
  children?: ReactNode
  isObject: boolean
  nodeId?: string
  isHighlighted?: boolean
  dark?: boolean
}

export function ForeignNodeWrapper(props: ForeignNodeWrapperProps) {
  return (
    <foreignObject
      width={props.width}
      height={props.height}
      style={{ overflow: 'hidden' }}
      {...(props.nodeId && { 'data-node-id': props.nodeId })}
      className={classNames(
        'font-mono text-sm font-medium',
        !props.isObject && 'text-center',
        'pointer-events-none',
        props.isHighlighted && (props.dark ? 'bg-violet-500/20' : 'bg-violet-100')
      )}
    >
      <div
        {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as Record<string, string>)}
        style={{ width: props.width, height: props.height } as CSSProperties}
      >
        {props.children}
      </div>
    </foreignObject>
  )
}
