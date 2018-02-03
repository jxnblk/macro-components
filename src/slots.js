import React from 'react'
import PropTypes from 'prop-types'

export const contextTypes = {
  elements: PropTypes.array.isRequired
}

export const macro = template => {
  class macro extends React.Component {
    static childContextTypes = contextTypes

    getChildContext () {
      return {
        elements: React.Children.toArray(this.props.children)
      }
    }

    render () {
      return template
    }
  }

  return macro
}

export class Slot extends React.Component {
  static contextTypes = contextTypes

  render () {
    const { component, ...props } = this.props
    const { elements } = this.context
    const element = elements.find(el => el.type === component)

    if (!element) return false

    return element
  }
}

export default macro
