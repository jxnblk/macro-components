import React from 'react'
import PropTypes from 'prop-types'
import lowerFirst from 'lodash.lowerfirst'

const getName = el => typeof el.type === 'function'
  ? el.type.displayName || el.type.name || 'Component'
  : el.type

const createChildComponents = children => {
  const components = []

  React.Children.toArray(children)
    .filter(child => typeof child !== 'string')
    .forEach(child => {
      const name = child.props.name || getName(child)
      const key = lowerFirst(name)
      const subComponents = child.props.children
        ? createChildComponents(child.props.children)
        : null
      const Component = props => React.cloneElement(child, {
        [child.props.prop || 'children']: subComponents
          ? subComponents.map(comp => comp.Component(props))
          : props.children || props[key]
      })
      Component.displayName = name
      components.push({ name, key, Component, subComponents })
    })

  return components
}

const createChildrenFunction = childComponents => props => childComponents
  .map(child => child.Component(props))

const swapChildren = (tree, dict) => {
  return React.Children.toArray(tree)
    .map(child => {
      if (typeof child === 'string') return child
      const name = child.props.name || getName(child)
      // console.log('child', child, child.type, dict, dict[name])
      if (!child.props || !child.props.children) {
        return dict[name]
          ? React.cloneElement(child, dict[name].props)
          : child
      }
      const children = child.props && child.props.children
        ? swapChildren(child.props.children, dict)
        : undefined
      return dict[name]
        ? React.cloneElmeent(child, {
          ...dict[name].props,
          children
        })
        : child
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
  return swapChildren(tree, dict)
}

const compose = (el, opts = {}) => {
  const { mapProps = (p => p) } = opts
  const childComponents = createChildComponents(el.props.children)
  const children = createChildrenFunction(childComponents)

  const Comp = props => React.cloneElement(el, {
    children: props.children
      ? mapChildrenToTree(el.props.children, props.children)
      : children(mapProps(props))
  })

  Comp.propTypes = Object.keys(childComponents)
    .map(key => ({ [key]: PropTypes.node }))
    .reduce((a, b) => ({ ...a, ...b }), {})

  const childComponentsObject = childComponents
    .reduce((a, child) => [ ...a, child, ...(child.subComponents || []) ], [])
    .reduce((a, child) => ({
      ...a,
      [child.name]: child.Component
    }), {})

  return Object.assign(Comp,
    childComponentsObject
  )
}

export default compose
