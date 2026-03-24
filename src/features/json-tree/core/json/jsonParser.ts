import { parseTree } from 'jsonc-parser'
import { addEdgeToGraph } from '../addEdgeToGraph'
import { addNodeToGraph } from '../addNodeToGraph'
import { traverse } from '../traverse'
import { getNodePath } from './getNodePath'
import type { Graph, States, ParserOptions } from './jsonParserTypes'

function initializeStates(parserOptions?: ParserOptions): States {
  return {
    parentName: '',
    bracketOpen: [],
    objectsFromArray: [],
    objectsFromArrayId: 0,
    notHaveParent: [],
    brothersNode: [],
    brothersParentId: undefined,
    brotherKey: '',
    brothersNodeProps: [],
    graph: { nodes: [], edges: [] },
    parserOptions: parserOptions ?? { foldNodes: false, imagePreview: true },
  }
}

export function parser(jsonStr: string, parserOptions?: ParserOptions): Graph {
  try {
    const states = initializeStates(parserOptions)
    const parsedJsonTree = parseTree(jsonStr)
    if (!parsedJsonTree) throw new Error('Invalid document')

    traverse({ states, objectToTraverse: parsedJsonTree })

    const { notHaveParent, graph } = states
    if (notHaveParent.length > 1 && parsedJsonTree.type !== 'array') {
      const emptyId = addNodeToGraph({
        graph,
        text: '',
        isEmpty: true,
        ...parserOptions,
      })
      notHaveParent.forEach((childId) => addEdgeToGraph(graph, emptyId, childId))
    }

    if (states.graph.nodes.length === 0) {
      if (parsedJsonTree.type === 'array') {
        addNodeToGraph({ graph: states.graph, text: '[]', ...parserOptions })
      } else {
        addNodeToGraph({ graph: states.graph, text: '{}', ...parserOptions })
      }
    }

    states.graph.nodes = states.graph.nodes.map((node) => ({
      ...node,
      path: getNodePath(states.graph.nodes, states.graph.edges, node.id),
    }))

    return states.graph
  } catch {
    return { nodes: [], edges: [] }
  }
}
