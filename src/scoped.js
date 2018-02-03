import React from 'react'
import PropTypes from 'prop-types'

export const macro = (components = {}) => template => {
  const componentKeys = Object.keys(components)

  class Macro extends React.Component {
    static propTypes = {
      children: (props, name) => {
        const children = React.Children.toArray(props.children)
        for (let i = 0; i < children.length; i++) {
          const child = children[i]

          if (componentKeys.includes(child.type.macroName)) continue

          return new Error(
            [
              'Invalid child component `',
              child.type,
              '`. ',
              'Must be one of: ',
              componentKeys.join(', ')
            ].join('')
          )
        }
      }
    }

    constructor (props) {
      super()

      this.parseChildren = children =>
        React.Children.toArray(children)
          .reduce((a, child) => {
            a[child.type.macroName] = child
            return a
          }, {})

      this.getElements = anyChildren => {
        const children = this.parseChildren(anyChildren)

        return componentKeys
          .reduce((a, key) => {
            a[key] = children[key]
            return a
          }, {})
      }

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

  for (const key in components) {
    // cloned to keep multiple components mapped properly
    Macro[key] = props => React.createElement(components[key], props)
    Macro[key].macroName = key
  }

  return Macro
}

export const Clone = ({ element, ...props }) => element
  ? React.cloneElement(element, { ...props, ...element.props })
  : false

export default macro
