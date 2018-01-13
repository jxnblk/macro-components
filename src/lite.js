// prototype lite version
import React, {
  Children,
  createElement,
  cloneElement
} from 'react'

const getName = el => typeof el.type === 'function'
  ? el.props.name || el.type.displayName || el.type.name || 'Component'
  : el.type

const swap = (tree, dict) => Children.toArray(tree)
  .map(child => {
    if (!child || typeof child === 'string') return child
    const name = getName(child)
    const children = child.props && child.props.children
      ? swap(child.props.children, dict)
      : undefined

    if (dict[name]) return createElement(child.type, { ...child.props, children, ...dict[name] })
    if (!children) return false

    return createElement(child.type, { ...child.props, children })
  })

const createChildren = (tree, children) => {
  const arr = Children.toArray(children)
  const dict = {}
  arr.forEach(child => {
    const name = getName(child)
    dict[name] = child.props
  })
  return swap(tree, dict)
}

// alternate
const createChildrenDict = children => {}

const createStructure = tree => {
  // create some function
  const renderTree = (props, el = tree) => Children.toArray(el)
    .map(child => {
      if (!child || typeof child === 'string') return child
      const name = getName(child)
      const children = child.props && child.props.children
        ? renderTree(props, child.props.children)
        : undefined
      if (props[name]) return cloneElement(child, { children, ...props[name] })
      if (!children) return false
      return cloneElement(child, { children })
    })

  return children => {
    const props = {}
    Children.toArray(children)
      .forEach(child => {
        const name = getName(child)
        props[name] = child.props
      })
    return renderTree(props)
  }
}
// const renderChildren = createStructure(tree)



const traverse = (obj, fn) => {
  for (const key in obj) {
    fn(key, obj[key])
    if (obj[key] !== null && typeof obj[key] === 'object') traverse(obj[key], fn)
  }
}


const macro = (tree, opts = {}) => {
  // const chx = createStructure(tree)

  class Macro extends React.Component {
    render () {
      const children = createChildren(tree, this.props.children)

      // const children = chx(this.props.children)
      // const dict = {}
      // Children.toArray(this.props.children)
      //   .forEach(child => {
      //     const name = getName(child)
      //     dict[name] = child.props
      //   })

      // const children = Object.assign({}, this.props.children)
      // traverse(children, (key, val) => { console.log(key, val) })

      return (
        <div>
          {children}
        </div>
      )

      // return cloneElement(tree, { children })
    }
  }

  return Macro
}

export default macro
