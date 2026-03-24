import { useCallback, useMemo, useState } from 'react'
import { Canvas, Edge } from 'reaflow'
import type { EdgeProps, NodeProps } from 'reaflow'
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useTree } from '@/features/json-tree/store/useTree'
import { useToggleHide } from '@/features/json-tree/hooks/useToggleHide'
import { useElementSize } from '@/features/json-tree/hooks/useElementSize'
import { useStored } from '@/features/json-tree/store/useStored'
import { CustomNode } from '@/features/json-tree/core/node'

export function TreeEditor() {
  const loading = useTree((s) => s.loading)
  const { validateHiddenNodes } = useToggleHide()
  const setLoading = useTree((s) => s.setLoading)
  const setZoomPanPinch = useTree((s) => s.setZoomPanPinch)
  const centerView = useTree((s) => s.centerView)
  const lightmode = useStored((s) => s.lightmode)
  const direction = useTree((s) => s.direction)
  const nodes = useTree((s) => s.nodes)
  const edges = useTree((s) => s.edges)

  const [paneWidth, setPaneWidth] = useState(2000)
  const [paneHeight, setPaneHeight] = useState(2000)
  const [editorContainerRef, editorSize] = useElementSize<HTMLDivElement>()

  const initialCanvasScale = useMemo(() => {
    if (typeof window === 'undefined') return 0.4
    return window.matchMedia('(max-width: 767px)').matches ? 0.52 : 0.4
  }, [])

  const onInit = useCallback(
    (ref: ReactZoomPanPinchRef) => setZoomPanPinch(ref),
    [setZoomPanPinch]
  )

  const onLayoutChange = useCallback(
    (layout: { width?: number; height?: number }) => {
      if (layout.width != null && layout.height != null) {
        setPaneWidth(layout.width + 50)
        setPaneHeight(layout.height + 50)
        setTimeout(() => {
          setLoading(false)
          validateHiddenNodes()
          requestAnimationFrame(() => centerView())
        })
      }
    },
    [centerView, setLoading, validateHiddenNodes]
  )

  const memoizedNode = useCallback(
    (props: NodeProps<unknown>) => (
      <CustomNode {...props} isLightMode={lightmode} />
    ),
    [lightmode]
  )

  const memoizedEdge = useCallback(
    (props: EdgeProps) => (
      <Edge {...props} containerClassName={`edge-${props.id}`} />
    ),
    []
  )

  return (
    <>
      {loading && (
        <div
          className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center ${
            lightmode ? 'bg-white' : 'bg-zinc-900'
          }`}
        >
          <span
            className={lightmode ? 'text-base text-gray-900' : 'text-base text-gray-200'}
          >
            Construyendo gráfico...
          </span>
        </div>
      )}
      <div
        id="tree-editor"
        ref={editorContainerRef}
        onContextMenu={(e) => e.preventDefault()}
        className={`absolute h-full w-full ${!lightmode ? 'bg-zinc-900' : ''}`}
      >
        <div
          className={`absolute right-1 top-1 z-20 hidden rounded p-1 text-xs sm:block ${
            lightmode ? 'bg-white/80 text-gray-600' : 'bg-zinc-800 text-gray-400'
          }`}
        >
          {editorSize.width} × {editorSize.height}
        </div>
        <TransformWrapper
          maxScale={2}
          minScale={0.05}
          initialScale={initialCanvasScale}
          wheel={{ step: 0.04 }}
          onInit={onInit}
        >
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: loading ? 'none' : 'block',
            }}
          >
            <Canvas
              className="jsontree-canvas"
              nodes={nodes}
              edges={edges}
              maxHeight={paneHeight}
              maxWidth={paneWidth}
              height={paneHeight}
              width={paneWidth}
              direction={direction}
              onLayoutChange={onLayoutChange}
              node={memoizedNode}
              edge={memoizedEdge}
              key={direction}
              pannable={false}
              zoomable={false}
              animated={false}
              readonly
              dragEdge={null}
              dragNode={null}
              fit
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  )
}
