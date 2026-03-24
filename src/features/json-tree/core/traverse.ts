import type { Node, NodeType } from 'jsonc-parser'
import type { Graph, States } from '@/features/json-tree/core/json/jsonParserTypes'
import { addEdgeToGraph } from '@/features/json-tree/core/addEdgeToGraph'
import { addNodeToGraph } from '@/features/json-tree/core/addNodeToGraph'
import { calculateNodeSize } from '@/features/json-tree/core/calculateNodeSize'

type PrimitiveOrNullType = 'boolean' | 'string' | 'number' | 'null'

const isPrimitiveOrNullType = (type: unknown): type is PrimitiveOrNullType =>
  ['boolean', 'string', 'number', 'null'].includes(type as string)

const alignChildren = (nodeA: Node, nodeB: Node): number => {
  const aChildType = nodeA?.children?.[1]?.type
  const bChildType = nodeB?.children?.[1]?.type
  if (!isPrimitiveOrNullType(aChildType) && isPrimitiveOrNullType(bChildType)) return 1
  if (isPrimitiveOrNullType(aChildType) && !isPrimitiveOrNullType(bChildType)) return -1
  return 0
}

const getOpts = (states: States) => states.parserOptions ?? {}

function handleNoChildren(
  value: string | undefined,
  states: States,
  graph: Graph,
  myParentId?: string,
  parentType?: string,
  nextType?: string
): void {
  if (value === undefined) return
  if (
    parentType === 'property' &&
    nextType !== 'object' &&
    nextType !== 'array'
  ) {
    states.brothersParentId = myParentId
    if (nextType === undefined) {
      states.brothersNode.push([states.brotherKey, value])
    } else {
      states.brotherKey = value
    }
  } else if (parentType === 'array') {
    const nodeFromArrayId = addNodeToGraph({ graph, text: String(value), ...getOpts(states) })
    if (myParentId) addEdgeToGraph(graph, myParentId, nodeFromArrayId)
  }
  if (
    nextType &&
    parentType !== 'array' &&
    (nextType === 'object' || nextType === 'array')
  ) {
    states.parentName = value
  }
}

function handleHasChildren(
  type: NodeType,
  states: States,
  graph: Graph,
  children: Node[],
  myParentId?: string,
  parentType?: string
): void {
  let parentId: string | undefined
  let savedParentKey: { name: string; type: string } | null = null
  const opts = getOpts(states)

  if (type !== 'property' && states.parentName !== '') {
    if (states.brothersNode.length > 0) {
      const findBrothersNode = states.brothersNodeProps.find(
        (e) =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
      )
      if (findBrothersNode) {
        const findNodeIndex = graph.nodes.findIndex((e) => e.id === findBrothersNode?.id)
        if (findNodeIndex !== -1) {
          const modifyNodes = [...graph.nodes]
          const foundNode = modifyNodes[findNodeIndex]
          if (foundNode && Array.isArray(foundNode.text)) {
            foundNode.text = foundNode.text.concat(states.brothersNode)
            const { width, height } = calculateNodeSize(foundNode.text, false, opts)
            foundNode.width = width
            foundNode.height = height
          }
          graph.nodes = modifyNodes
          states.brothersNode = []
        }
      } else {
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode, ...opts })
        states.brothersNode = []
        if (states.brothersParentId) {
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId)
        } else {
          states.notHaveParent.push(brothersNodeId)
        }
        states.brothersNodeProps.push({
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        })
      }
    }

    savedParentKey = { name: states.parentName, type }
    parentId = addNodeToGraph({ graph, type, text: states.parentName, ...opts })
    if (parentId) {
      states.bracketOpen.push({ id: parentId, type })
    }
    states.parentName = ''

    const brothersProps = states.brothersNodeProps.filter(
      (e) =>
        e.parentId === myParentId &&
        e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
    )
    if (
      (brothersProps.length > 0 &&
        states.bracketOpen[states.bracketOpen.length - 2]?.type !== 'object') ||
      (brothersProps.length > 0 && states.bracketOpen.length === 1)
    ) {
      const lastId = brothersProps[brothersProps.length - 1].id
      if (parentId && lastId) addEdgeToGraph(graph, lastId, parentId)
    } else if (myParentId && parentId) {
      addEdgeToGraph(graph, myParentId, parentId)
    } else {
      states.notHaveParent.push(parentId)
    }
  } else if (parentType === 'array') {
    states.objectsFromArray = [...states.objectsFromArray, states.objectsFromArrayId++]
  }

  const traverseObject = (objectToTraverse: Node, nextType: string) => {
    traverse({
      states,
      objectToTraverse,
      parentType: type,
      myParentId: states.bracketOpen[states.bracketOpen.length - 1]?.id,
      nextType,
    })
  }
  const traverseArray = () => {
    children.forEach((objectToTraverse, index, array) => {
      const nextType = array[index + 1]?.type
      traverseObject(objectToTraverse, nextType)
    })
  }
  if (type === 'object') {
    children.sort(alignChildren)
    traverseArray()
  } else {
    traverseArray()
  }

  if (type !== 'property') {
    if (states.brothersNode.length > 0) {
      const findBrothersNode = states.brothersNodeProps.find(
        (e) =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
      )
      if (findBrothersNode) {
        const modifyNodes = [...graph.nodes]
        const findNodeIndex = modifyNodes.findIndex((e) => e.id === findBrothersNode?.id)
        if (modifyNodes[findNodeIndex]) {
          const t = modifyNodes[findNodeIndex].text
          modifyNodes[findNodeIndex].text = Array.isArray(t)
            ? t.concat(states.brothersNode)
            : states.brothersNode
          const { width, height } = calculateNodeSize(modifyNodes[findNodeIndex].text, false, opts)
          modifyNodes[findNodeIndex].width = width
          modifyNodes[findNodeIndex].height = height
          graph.nodes = modifyNodes
          states.brothersNode = []
        }
      } else {
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode, ...opts })
        states.brothersNode = []
        if (states.brothersParentId) {
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId)
        } else {
          states.notHaveParent.push(brothersNodeId)
        }
        states.brothersNodeProps.push({
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        })
      }
    }

    if (parentType === 'array') {
      if (states.objectsFromArray.length > 0) states.objectsFromArray.pop()
    } else {
      if (states.bracketOpen.length > 0) states.bracketOpen.pop()
    }

    if (parentId) {
      const myChildren = graph.edges.filter((edge) => edge.from === parentId)
      const childrenCount = myChildren.length
      const parentIndex = graph.nodes.findIndex((node) => node.id === parentId)
      graph.nodes = graph.nodes.map((node, index) =>
        index === parentIndex
          ? { ...node, data: { ...node.data, childrenCount } }
          : node
      )

      if (savedParentKey) {
        const edgeToParent = graph.edges.find((e) => e.to === parentId)
        const broIndex =
          edgeToParent?.from != null
            ? graph.nodes.findIndex((n) => n.id === edgeToParent.from)
            : -1
        if (broIndex !== -1 && Array.isArray(graph.nodes[broIndex].text)) {
          const suffix =
            savedParentKey.type === 'object' ? `{${childrenCount}}` : `[${childrenCount}]`
          graph.nodes[broIndex].text.push([savedParentKey.name, suffix])
          const firstChildEdge = graph.edges.find((e) => e.from === parentId)
          const targetNodeId = firstChildEdge?.to ?? parentId
          const bro = graph.nodes[broIndex]
          bro.data = {
            ...bro.data,
            objectKeyTargets: {
              ...(bro.data?.objectKeyTargets || {}),
              [savedParentKey.name]: targetNodeId,
            },
          }
          const { width, height } = calculateNodeSize(graph.nodes[broIndex].text, false, opts)
          graph.nodes[broIndex].width = width
          graph.nodes[broIndex].height = height
        }
      }
    }
  }
}

export type TraverseParams = {
  states: States
  objectToTraverse: Node
  parentType?: string
  myParentId?: string
  nextType?: string
}

export function traverse(params: TraverseParams): void {
  const { objectToTraverse, states, myParentId, nextType, parentType } = params
  const graph = states.graph
  const { type, children, value } = objectToTraverse
  if (!children) {
    handleNoChildren(value, states, graph, myParentId, parentType, nextType)
  } else {
    handleHasChildren(type, states, graph, children, myParentId, parentType)
  }
}
