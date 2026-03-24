import type { FC } from 'react'
import { memo } from 'react'
import { UnfoldVertical, FoldVertical } from 'lucide-react'
import type { NodeData } from '@/features/json-tree/core/type'
import { ForeignNodeWrapper } from './ForeignNodeWrapper'
import { TextRenderer } from './TextRenderer'
import { getKeyColor } from './getColors'
import { classNames } from '@/features/json-tree/utility/classNames'
import { useTree } from '@/features/json-tree/store/useTree'
import { useStored } from '@/features/json-tree/store/useStored'
import { isContentImage } from '@/features/json-tree/core/calculateNodeSize'

export type CustomNodeProps = {
  node: NodeData
  x: number
  y: number
  hasCollapse?: boolean
}

const TextNodeInner: FC<CustomNodeProps> = ({
  node,
  x,
  y,
  hasCollapse = false,
}) => {
  const {
    id,
    text,
    width,
    height,
    data: { isParent, childrenCount = 0, type } = {},
  } = node
  const hideCollapse = useStored((s) => s.hideCollapse)
  const showChildrenCount = useStored((s) => s.childrenCount)
  const expandNodes = useTree((s) => s.expandNodes)
  const collapseNodes = useTree((s) => s.collapseNodes)
  const isExpanded = useTree((s) => s.collapsedParents.includes(id))
  const hoveredNodeId = useTree((s) => s.hoveredNodeId)
  const imagePreview = useStored((s) => s.imagePreview)
  const isImage = imagePreview && typeof text === 'string' && isContentImage(text)
  const dark = !useStored((s) => s.lightmode)

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!isExpanded) collapseNodes(id)
    else expandNodes(id)
  }

  return (
    <ForeignNodeWrapper
      width={width}
      height={height}
      isObject={false}
      nodeId={id}
      isHighlighted={hoveredNodeId === id}
      dark={dark}
    >
      {isImage ? (
        <div className="p-1">
          <img
            height={70}
            width={70}
            src={text as string}
            alt=""
            className="object-contain"
          />
        </div>
      ) : (
        <span
          data-x={x}
          data-y={y}
          data-key={JSON.stringify(text)}
          className="flex h-full items-center justify-between px-1"
        >
          <span
            className={classNames(
              'flex h-full w-full items-center justify-center',
              getKeyColor({ parent: isParent, type, dark })
            )}
          >
            <TextRenderer
              classNames={classNames(isParent ? 'text-xs' : 'text-[10px]')}
              innerText={JSON.stringify(text).replace(/"/g, '')}
            />
          </span>
          <span className="flex h-full items-center gap-1 text-gray-400">
            {isParent && childrenCount > 0 && showChildrenCount && (
              <span className="px-1 text-xs">
                {type === 'array' ? `[${childrenCount}]` : `{${childrenCount}}`}
              </span>
            )}
            {isParent && hasCollapse && hideCollapse && (
              <button
                type="button"
                className={classNames(
                  'pointer-events-auto flex h-7 w-7 items-center justify-center rounded',
                  dark
                    ? 'bg-zinc-600 hover:bg-zinc-500 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300'
                )}
                onClick={handleExpand}
                aria-label={isExpanded ? 'Expand' : 'Collapse'}
              >
                {isExpanded ? (
                  <UnfoldVertical className="h-3.5 w-3.5" />
                ) : (
                  <FoldVertical className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </span>
        </span>
      )}
    </ForeignNodeWrapper>
  )
}

export const TextNode = memo(TextNodeInner)
