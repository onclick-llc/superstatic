
import { renderNode, renderText } from './static-render'

const EMPTY_ARR = []
const EMPTY_OBJ = {}

/**
 *
 * NOTES
 *
 * Virtual node functions derived from:
 * https://github.com/jorgebucaran/superfine/blob/main/index.js
 *
 */

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

export const node = process.env.STATIC ? renderNode : virtualNode
export const text = process.env.STATIC ? renderText : virtualText

export const h = type => (props, children) => {
  const staticProps = process.env.STATIC && typeof props === 'string'

  return Array.isArray(props) || props == null || staticProps
    ? node(type, EMPTY_OBJ, props)
    : node(type, props, children)
}
