import React from 'react'
import PropTypes from 'prop-types'

export const macro = (template, childTypes) => {
  class Macro extends React.Component {
    static propTypes = {
      children: Array.isArray(childTypes)
        ? (props, name) => {
          const children = React.Children.toArray(props.children)
          for (let i = 0; i < children.length; i++) {
            const child = children[i]
            if (childTypes.includes(child.type)) continue
            return new Error(
              'Invalid child component `' + child.type + '`'
            )
          }
        }
        : PropTypes.node
    }

    constructor (props) {
      super()

      this.getElements = children =>
        React.Children.toArray(children)
          .map(child => ({
            key: getName(child),
            element: child
          }))
          .reduce((a, b) => ({
            ...a,
            [b.key]: b.element
          }), {})

      this.state = {
        elements: this.getElements(props.children)
      }
    }

    componentWillReceiveProps (next) {
      if (next.children === this.props.children) return
      const elements = this.getElements(next.children)
      this.setState({ elements })
    }

    render () {
      const { elements } = this.state
      return template(elements, this.props)
    }
  }

  return Macro
}

export const getName = el => el.props.name
  ? el.props.name
  : typeof el.type === 'function'
    ? el.type.displayName || el.type.name
    : el.type

export const Clone = ({ element, ...props }) => element
  ? React.cloneElement(element, { ...props, ...element.props })
  : false

export default macro
