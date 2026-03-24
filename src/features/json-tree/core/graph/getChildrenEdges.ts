import type { EdgeData, NodeData } from '../type'

export function getChildrenEdges(
  nodes: NodeData[],
  edges: EdgeData[]
): EdgeData[] {
  const nodeIds = new Set(nodes.map((node) => node.id))
  return edges.filter(
    (edge) =>
      (edge.from && nodeIds.has(edge.from)) || (edge.to && nodeIds.has(edge.to))
  )
}
