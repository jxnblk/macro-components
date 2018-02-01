import React from 'react'
import PropTypes from 'prop-types'

export const macro = (components = {}, template, opts = {}) => {
  const componentsArray = Object.keys(components).map(key => components[key])

  class Macro extends React.Component {
    static propTypes = {
      children: (props, name) => {
        if (name !== 'children') return console.log('wutf?', name)
        const children = React.Children.toArray(props.children)
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          if (componentsArray.includes(child.type)) continue
          return new Error(
            'Invalid child component `' + child.type + '`'
          )
        }
      }
    }

    constructor (props) {
      super()

      this.getElements = anyChildren => {
        const children = React.Children.toArray(anyChildren)

        return Object.keys(components)
          .reduce((a, key) => ({
            ...a,
            [key]: children.find(child => child.type.macroName === key)
          }), {})
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
