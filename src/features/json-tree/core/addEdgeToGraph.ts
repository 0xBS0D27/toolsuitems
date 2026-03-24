import type { Graph } from '@/features/json-tree/core/json/jsonParserTypes'

export function addEdgeToGraph(graph: Graph, from: string, to: string): void {
  graph.edges.push({
    id: `e${from}-${to}`,
    from,
    to,
  })
}
