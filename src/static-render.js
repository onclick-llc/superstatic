
import escapeHTML from './escape-html'

const voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
  'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']

const isSafe = value => {
  switch (typeof value) {
    case 'boolean': return true
    case 'number': return true
    case 'string': return true
  }
}

const joinChildren = children => {
  let target = ''

  /**
   *
   * WARNING
   *
   * This includes unescaped text in the document. You should protect against
   * XSS before this point.
   *
   */

  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children) === true) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const value = Array.isArray(child) ? child.join('') : child

      if (isSafe(value)) {
        target += value
      }
    }
  }

  return target
}

const joinProps = props => {
  let target = ''

  for (const key in props) {
    const value = props[key]

    if (isSafe(value) === true) {
      target += ' ' + key + '="' + escapeHTML(value) + '"'
    }
  }

  return target
}

export const renderNode = (tag, props, children) => {
  const target = '<' + tag + joinProps(props)

  if (voidTags.includes(tag) === true) {
    return target + '/>'
  }

  return target + '>' + joinChildren(children) + '</' + tag + '>'
}

export const renderText = value => escapeHTML(value)
