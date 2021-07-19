
import { node, text } from './virtual-nodes'

const FF_STATIC_RENDER = process.env.FF_STATIC_RENDER ?? false

/**
 *
 * NOTES
 *
 * JSX shim function derived from:
 * https://github.com/zaceno/hyperapp-jsx-pragma/blob/main/index.js
 *
 * Learn how to setup JSX with esbuild here:
 * https://esbuild.github.io/content-types/#jsx
 *
 */

const flatten = (children, target = []) => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    if (Array.isArray(child)) {
      flatten(child, target)
    } else {
      target.push(child)
    }
  }

  return target
}

export const jsx = (type, props, ...children) => {
  props ??= {}

  if (typeof type === 'function') {
    return type(props, flatten(children))
  }

  if (FF_STATIC_RENDER) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      children[i] = Array.isArray(child)
        ? child[0]
        : text(child)
    }

    return [
      node(type, props, children)
    ]
  }

  children = flatten(children)

  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    children[i] = typeof child === 'string' || typeof child === 'number'
      ? text(child)
      : child
  }

  return node(type, props, children)
}
