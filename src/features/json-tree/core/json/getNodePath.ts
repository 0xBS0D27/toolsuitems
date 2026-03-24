import type { EdgeData, NodeData } from '@/features/json-tree/core/type'

function getAllAncestorIds(_nodes: NodeData[], edges: EdgeData[], nodeId: string): string[] {
  const result: string[] = []
  let current: string | undefined = nodeId
  while (current) {
    const parent = edges.find((e) => e.to === current)
    if (!parent?.from) break
    result.unshift(parent.from)
    current = parent.from
  }
  return result
}

export function getNodePath(
  nodes: NodeData[],
  edges: EdgeData[],
  nodeId: string
): string {
  let resolvedPath = ''
  const path = getAllAncestorIds(nodes, edges, nodeId).concat(nodeId)
  const rootArrayElementIds = ['1']
  const edgesMap = new Map<string, string[]>()

  for (const edge of edges) {
    if (!edge.from) continue
    if (!edgesMap.has(edge.from)) edgesMap.set(edge.from, [])
    if (edge.to) edgesMap.get(edge.from)!.push(edge.to)
  }

  for (let i = 1; i < edges.length; i++) {
    const curNodeId = edges[i].from!
    if (rootArrayElementIds.includes(curNodeId)) continue
    if (!edgesMap.has(curNodeId)) rootArrayElementIds.push(curNodeId)
  }

  if (rootArrayElementIds.length > 1) {
    resolvedPath += `Root[${rootArrayElementIds.findIndex((id) => id === path[0])}]`
  } else {
    resolvedPath += '{Root}'
  }

  for (let i = 1; i < path.length; i++) {
    const curId = path[i]
    const curNode = nodes[+curId - 1]
    if (!curNode) break
    if (curNode.data?.type === 'array') {
      resolvedPath += `.${curNode.text}`
      if (i !== path.length - 1) {
        const toNodeId = path[i + 1]
        const arr = edgesMap.get(curId) ?? []
        const idx = arr.indexOf(toNodeId)
        resolvedPath += `[${idx}]`
      }
    }
    if (curNode.data?.type === 'object') {
      resolvedPath += `.${curNode.text}`
    }
  }

  return resolvedPath
}
