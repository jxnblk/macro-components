import React from 'react'
import PropTypes from 'prop-types'

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
