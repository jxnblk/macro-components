import React from 'react'
import lowerFirst from 'lodash.lowerfirst'

const getName = el => typeof el.type === 'function'
  ? el.type.displayName || el.type.name || 'component'
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
        children: subComponents
          ? subComponents.map(comp => comp.Component(props))
          : props.children || props[key]
      })
      components.push({ name, key, Component, subComponents })
    })

  return components
}

const createChildrenFunction = childComponents => props => childComponents
  .map(child => child.Component(props))

const compose = (el, opts) => {
  const childComponents = createChildComponents(el.props.children)
  const children = createChildrenFunction(childComponents)

  const Comp = props => React.cloneElement(el, {
    children: props.children || children(props)
  })

  const childComponentsObject = childComponents
    .reduce((a, child) => [ ...a, child, ...(child.subComponents || []) ], [])
    .reduce((a, child) => Object.assign(a, {
      [child.name]: child.Component
    }), {})

  return Object.assign(Comp,
    childComponentsObject
  )
}

export default compose
