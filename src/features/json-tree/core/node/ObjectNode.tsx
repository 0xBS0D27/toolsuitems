import type { FC } from 'react'
import { memo } from 'react'
import type { NodeData } from '@/features/json-tree/core/type'
import { ForeignNodeWrapper } from './ForeignNodeWrapper'
import { TextRenderer } from './TextRenderer'
import { getValueColor } from './getColors'
import { classNames } from '@/features/json-tree/utility/classNames'
import { useStored } from '@/features/json-tree/store/useStored'

export type CustomNodeProps = { node: NodeData; x: number; y: number }

const ObjectNodeInner: FC<CustomNodeProps> = ({ node, x, y }) => {
  const { text, width, height, data } = node
  const dark = !useStored((s) => s.lightmode)
  if (data?.isEmpty) return null
  if (!Array.isArray(text)) return null

  return (
    <ForeignNodeWrapper isObject width={width} height={height} dark={dark}>
      <span className="flex h-full items-center">
        <span className="flex flex-col text-xs">
          {text.map((val: [string, string], idx: number) => {
            const keyStr = JSON.stringify(val[0]).replace(/"/g, '')
            const valStr = String(val[1])
            return (
              <span
                key={idx}
                data-key={JSON.stringify(val)}
                data-type={JSON.stringify(val[1])}
                data-x={x}
                data-y={y + idx * 17.8}
                className="block overflow-hidden text-ellipsis whitespace-nowrap px-3"
              >
                <span
                  className={classNames(
                    'inline overflow-hidden text-ellipsis whitespace-nowrap',
                    dark ? 'text-sky-300' : 'text-[crimson]'
                  )}
                >
                  {keyStr}:{' '}
                </span>
                <TextRenderer
                  classNames={classNames(getValueColor(valStr, dark))}
                  innerText={valStr}
                />
              </span>
            )
          })}
        </span>
      </span>
    </ForeignNodeWrapper>
  )
}

export const ObjectNode = memo(ObjectNodeInner)
