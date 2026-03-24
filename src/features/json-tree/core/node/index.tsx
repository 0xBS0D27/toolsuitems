import React from 'react'
import { Node, type NodeProps } from 'reaflow'
import { ObjectNode } from './ObjectNode'
import { TextNode } from './TextNode'
import type { NodeData } from '@/features/json-tree/core/type'

const rootProps = { rx: 50, ry: 50 }

export interface CustomNodeProps extends NodeProps {
  isLightMode: boolean
}

export function CustomNode(nodeProps: CustomNodeProps) {
  const { text, data } = nodeProps.properties ?? {}
  const isLightMode = nodeProps.isLightMode ?? true

  return (
    <Node
      {...nodeProps}
      rx={5}
      ry={5}
      {...(data?.isEmpty && rootProps)}
      label={<React.Fragment />}
      className={isLightMode ? '!fill-[#f6f8fa]' : '!fill-[#2B2C3E]'}
    >
      {({ node, x, y }) => {
        const nd = node as NodeData
        if (Array.isArray(text)) {
          return <ObjectNode node={nd} x={x} y={y} />
        }
        return (
          <TextNode
            node={nd}
            hasCollapse={!!(nd.data?.childrenCount && nd.data.childrenCount > 0)}
            x={x}
            y={y}
          />
        )
      }}
    </Node>
  )
}
