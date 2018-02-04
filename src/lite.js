import React from 'react'

/*
 * This is the original, displayName-based implicit API
 * Keeping this version for posterity & testing
 */

export const macro = template => {
  class Macro extends React.Component {
    render () {
      const children = React.Children.toArray(this.props.children)
        .reduce((a, child, i, arr) => {
          a[child.type] = child
          a[child.type.displayName] = child
          return a
        }, {})
      return template(children, this.props)
    }
  }

  return Macro
}

export const Clone = ({ element, ...props }) => element
  ? React.cloneElement(element, { ...props, ...element.props })
  : false

export default macro
