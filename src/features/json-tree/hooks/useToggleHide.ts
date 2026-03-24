import { useCallback, useEffect, useMemo } from 'react'
import { useTree } from '@/features/json-tree/store/useTree'

export function useToggleHide() {
  const collapsedNodes = useTree((s) => s.collapsedNodes)
  const collapsedEdges = useTree((s) => s.collapsedEdges)

  const nodeList = useMemo(
    () => collapsedNodes.map((id) => `[id$="node-${id}"]`),
    [collapsedNodes]
  )
  const edgeList = useMemo(
    () => collapsedEdges.map((id) => `[class$="edge-${id}"]`),
    [collapsedEdges]
  )

  const validateHiddenNodes = useCallback(() => {
    document.body.querySelectorAll('.hide_node').forEach((el) => el.classList.remove('hide_node'))
    if (nodeList.length) {
      document.body
        .querySelectorAll(nodeList.join(','))
        .forEach((el) => el.classList.add('hide_node'))
    }
    if (edgeList.length) {
      document.body
        .querySelectorAll(edgeList.join(','))
        .forEach((el) => el.classList.add('hide_node'))
    }
  }, [nodeList, edgeList])

  useEffect(() => {
    validateHiddenNodes()
  }, [validateHiddenNodes])

  return { validateHiddenNodes }
}
