
import { renderNode, renderText } from './static-render'

const FF_STATIC_RENDER = process.env.FF_STATIC_RENDER ?? false

/**
 *
 * NOTES
 *
 * Virtual node functions derived from:
 * https://github.com/jorgebucaran/superfine/blob/main/index.js
 *
 */

const EMPTY_ARR = []
const EMPTY_OBJ = {}

const virtualNode = (tag, props, children) => ({
  tag,
  props,
  key: props.key,
  children: children == null ? EMPTY_ARR : children
})

const virtualText = value => ({
  tag: value,
  props: EMPTY_OBJ,
  children: EMPTY_ARR,
  type: 3
})

export const node = FF_STATIC_RENDER ? renderNode : virtualNode
export const text = FF_STATIC_RENDER ? renderText : virtualText

export const h = type => (props, children) => {
  const staticProps = FF_STATIC_RENDER && typeof props === 'string'

  return Array.isArray(props) || props == null || staticProps
    ? node(type, EMPTY_OBJ, props)
    : node(type, props, children)
}
