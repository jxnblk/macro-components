import React from 'react'
import PropTypes from 'prop-types'

const getName = el => typeof el.type === 'function'
  ? el.props.name || el.type.displayName || el.type.name || 'Component'
  : el.type

const swapChildren = (tree, dict) => {
  return React.Children.toArray(tree)
    .map(child => {
      if (typeof child === 'string') return child
      const name = getName(child)
      const children = child.props && child.props.children
        ? swapChildren(child.props.children, dict)
        : undefined
      if (dict[name]) {
        if (Array.isArray(dict[name])) {
          const i = dict[name]._index = typeof dict[name]._index === 'number'
            ? dict[name]._index : 0
          const el = dict[name][i]

          if (!el) return React.cloneElement(child, { children })

          dict[name]._index++
          return React.cloneElement(child, {
            children,
            ...el.props
          })
        }
        return React.cloneElement(child, {
          children,
          ...dict[name].props,
        })
      } else if (!children) {
        return false
      }
      return React.cloneElement(child, { children })
    })
}

const mapChildrenToTree = (tree, children) => {
  const arr = Array.isArray(children) ? children : React.Children.toArray(children)
  const dict = arr.reduce((acc, child) => {
    const name = getName(child)
    if (acc[name]) {
      const values = Array.isArray(acc[name]) ? acc[name] : [ acc[name] ]
      acc[name] = [
        ...values,
        child
      ]
      return acc
    }
    return { ...acc, [name]: child }
  }, {})
  const swapped = swapChildren(tree, dict)
  return swapped
}

const compose = el => props =>
  React.cloneElement(el, {
    ...props,
    children: mapChildrenToTree(el.props.children, props.children)
  })

export default compose
