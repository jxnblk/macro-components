import React from 'react'

export const macro = template => {
  class Macro extends React.Component {
    constructor (props) {
      super()

      this.getElements = children =>
        React.Children.toArray(children)
          .map(child => ({
            key: getName(child),
            type: child.type,
            element: child
          }))
          .reduce((a, b) => ({
            ...a,
            [b.key]: b.element,
            [b.type]: b.element
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
