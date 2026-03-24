import { create } from 'zustand'
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import type { EdgeData, NodeData } from '@/features/json-tree/core/type'

export type CanvasDirection = 'LEFT' | 'RIGHT' | 'DOWN' | 'UP'
import { getChildrenEdges } from '@/features/json-tree/core/graph/getChildrenEdges'
import { getOutgoers } from '@/features/json-tree/core/graph/getOutgoers'
import { parser } from '@/features/json-tree/core/json/jsonParser'
import { useJson } from '@/features/json-tree/store/useJson'
import { useStored } from '@/features/json-tree/store/useStored'

const initialStates = {
  zoomPanPinch: null as ReactZoomPanPinchRef | null,
  direction: 'RIGHT' as CanvasDirection,
  loading: true,
  graphCollapsed: false,
  foldNodes: false,
  fullscreen: false,
  nodes: [] as NodeData[],
  edges: [] as EdgeData[],
  collapsedNodes: [] as string[],
  collapsedEdges: [] as string[],
  collapsedParents: [] as string[],
  selectedNode: {} as NodeData,
  path: '',
  hoveredNodeId: null as string | null,
}

export type GraphState = typeof initialStates

interface GraphActions {
  setGraph: (json?: string) => void
  setLoading: (loading: boolean) => void
  setDirection: (direction: CanvasDirection) => void
  setZoomPanPinch: (ref: ReactZoomPanPinchRef) => void
  setSelectedNode: (nodeData: NodeData) => void
  setHoveredNodeId: (nodeId: string | null) => void
  expandNodes: (nodeId: string) => void
  expandGraph: () => void
  collapseNodes: (nodeId: string) => void
  collapseGraph: () => void
  toggleFold: (value: boolean) => void
  toggleFullscreen: (value: boolean) => void
  zoomIn: () => void
  zoomOut: () => void
  centerView: () => void
  centerOnNode: (nodeId: string) => void
  clearGraph: () => void
}

export const useTree = create<GraphState & GraphActions>()((set, get) => ({
  ...initialStates,
  clearGraph: () => set({ nodes: [], edges: [], loading: false }),
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setHoveredNodeId: (hoveredNodeId) => set({ hoveredNodeId }),
  setGraph: (data) => {
    const json = data ?? useJson.getState().json
    const foldNodes = get().foldNodes
    const imagePreview = useStored.getState().imagePreview
    const { nodes, edges } = parser(json, { foldNodes, imagePreview })
    set({
      nodes,
      edges,
      collapsedParents: [],
      collapsedNodes: [],
      collapsedEdges: [],
      graphCollapsed: false,
      loading: true,
      hoveredNodeId: null,
    })
  },
  setDirection: (direction = 'RIGHT') => {
    set({ direction })
    setTimeout(() => get().centerView(), 200)
  },
  setLoading: (loading) => set({ loading }),
  expandNodes: (nodeId) => {
    const [childrenNodes, matchingNodes] = getOutgoers(
      nodeId,
      get().nodes,
      get().edges,
      get().collapsedParents
    )
    const childrenEdges = getChildrenEdges(childrenNodes, get().edges)
    const nodesConnectedToParent = childrenEdges.reduce((acc: string[], edge) => {
      if (edge.from && !acc.includes(edge.from)) acc.push(edge.from)
      if (edge.to && !acc.includes(edge.to)) acc.push(edge.to)
      return acc
    }, [])
    const matchingNodesConnectedToParent = matchingNodes.filter((id) =>
      nodesConnectedToParent.includes(id)
    )
    const nodeIds = childrenNodes.map((n) => n.id).concat(matchingNodesConnectedToParent)
    const edgeIds = childrenEdges.map((e) => e.id)
    set({
      collapsedParents: get().collapsedParents.filter((cp) => cp !== nodeId),
      collapsedNodes: get().collapsedNodes.filter((id) => !nodeIds.includes(id)),
      collapsedEdges: get().collapsedEdges.filter((id) => !edgeIds.includes(id)),
      graphCollapsed: get().collapsedNodes.filter((id) => !nodeIds.includes(id)).length > 0,
    })
  },
  collapseNodes: (nodeId) => {
    const [childrenNodes] = getOutgoers(nodeId, get().nodes, get().edges)
    const childrenEdges = getChildrenEdges(childrenNodes, get().edges)
    const nodeIds = childrenNodes.map((n) => n.id)
    const edgeIds = childrenEdges.map((e) => e.id)
    set({
      collapsedParents: get().collapsedParents.concat(nodeId),
      collapsedNodes: get().collapsedNodes.concat(nodeIds),
      collapsedEdges: get().collapsedEdges.concat(edgeIds),
      graphCollapsed: true,
    })
  },
  collapseGraph: () => {
    const edges = get().edges
    const tos = edges.map((e) => e.to)
    const froms = edges.map((e) => e.from)
    const parentNodesIds = froms.filter((id): id is string => !!id && !tos.includes(id))
    const secondDegreeNodesIds = edges
      .filter((e) => e.from && parentNodesIds.includes(e.from))
      .map((e) => e.to)
      .filter(Boolean) as string[]
    const collapsedParents = get().nodes
      .filter((n) => !parentNodesIds.includes(n.id) && n.data?.isParent)
      .map((n) => n.id)
    const collapsedNodes = get().nodes
      .filter(
        (n) =>
          !parentNodesIds.includes(n.id) && !secondDegreeNodesIds.includes(n.id)
      )
      .map((n) => n.id)
    set({
      collapsedParents,
      collapsedNodes,
      collapsedEdges: get().edges
        .filter((e) => e.from && !parentNodesIds.includes(e.from))
        .map((e) => e.id),
      graphCollapsed: true,
    })
  },
  expandGraph: () =>
    set({
      collapsedNodes: [],
      collapsedEdges: [],
      collapsedParents: [],
      graphCollapsed: false,
    }),
  zoomIn: () => {
    const ref = get().zoomPanPinch
    if (ref?.state != null)
      ref.setTransform(
        ref.state.positionX,
        ref.state.positionY,
        ref.state.scale + 0.4
      )
  },
  zoomOut: () => {
    const ref = get().zoomPanPinch
    if (ref?.state != null)
      ref.setTransform(
        ref.state.positionX,
        ref.state.positionY,
        ref.state.scale - 0.4
      )
  },
  centerView: () => {
    const ref = get().zoomPanPinch
    const canvas = document.querySelector('.jsontree-canvas') as HTMLElement
    if (ref && canvas) ref.zoomToElement(canvas)
  },
  centerOnNode: (nodeId) => {
    const ref = get().zoomPanPinch
    const el = document.querySelector(`[data-node-id="${nodeId}"]`) as HTMLElement
    if (ref && el) ref.zoomToElement(el)
    const node = get().nodes.find((n) => n.id === nodeId)
    if (node) get().setSelectedNode(node)
  },
  toggleFold: (foldNodes) => {
    set({ foldNodes })
    get().setGraph()
  },
  toggleFullscreen: (fullscreen) => set({ fullscreen }),
  setZoomPanPinch: (zoomPanPinch) => set({ zoomPanPinch }),
}))
