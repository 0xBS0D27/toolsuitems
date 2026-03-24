import type { Graph } from '@/features/json-tree/core/json/jsonParserTypes'
import { calculateNodeSize } from '@/features/json-tree/core/calculateNodeSize'
import type { NodeData } from '@/features/json-tree/core/type'

type Props = {
  graph: Graph
  text: [string, string][] | string
  isEmpty?: boolean
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null'
  foldNodes?: boolean
  imagePreview?: boolean
}

export function addNodeToGraph(props: Props): string {
  const {
    graph,
    text,
    type = 'null',
    isEmpty = false,
    foldNodes = false,
    imagePreview = true,
  } = props
  const id = String(graph.nodes.length + 1)
  const isParent = type === 'array' || type === 'object'
  const { width, height } = calculateNodeSize(text, isParent, {
    foldNodes,
    imagePreview,
  })

  const node: NodeData = {
    id,
    text,
    width,
    height,
    data: {
      type,
      isParent,
      isEmpty,
      childrenCount: isParent ? 1 : 0,
    },
  }

  graph.nodes.push(node)
  return id
}
