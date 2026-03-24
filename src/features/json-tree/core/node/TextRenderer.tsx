import type { CSSProperties } from 'react'

export type TextRendererProps = {
  innerText: string
  style?: CSSProperties
  classNames?: string
}

export function TextRenderer(props: TextRendererProps) {
  return (
    <span style={props.style} className={props.classNames}>
      {props.innerText}
    </span>
  )
}
