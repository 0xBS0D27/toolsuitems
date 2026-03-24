import type { NodeData, EdgeData } from '../type'

export type Graph = {
  nodes: NodeData[]
  edges: EdgeData[]
}

export type ParserOptions = {
  foldNodes?: boolean
  imagePreview?: boolean
}

export type States = {
  parentName: string
  bracketOpen: { id: string; type: string }[]
  objectsFromArray: number[]
  objectsFromArrayId: number
  notHaveParent: string[]
  brothersNode: [string, string][]
  brothersParentId: string | undefined
  brotherKey: string
  brothersNodeProps: {
    id: string
    parentId: string | undefined
    objectsFromArrayId: number | undefined
  }[]
  graph: Graph
  parserOptions?: ParserOptions
}
