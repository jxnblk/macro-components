import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import macro from './src'

const domEl = (
  <div>
    <h1 name='Heading' />
    <div />
  </div>
)

const Box = props => <div {...props} />
const Text = props => <div {...props} />
const Heading = props => <h2 {...props} />

const componentEl = (
  <div>
    <Heading />
    <Text />
  </div>
)

const nestedEl = (
  <Box>
    <Box>
      <Heading />
    </Box>
    <Text />
  </Box>
)

const anonEl = (
  <div>
    {React.createElement(function () { return 'div' })}
  </div>
)

test('returns a component', t => {
  const Card = macro(domEl)
  t.is(typeof Card, 'function')
  t.true(React.isValidElement(<Card />))
})

test('renders', t => {
  const Card = macro(domEl)
  const json = render(<Card heading='Hello' />).toJSON()
  t.snapshot(json)
})

test('returns subcomponents', t => {
  const { Heading, div } = macro(domEl)
  t.is(typeof Heading, 'function')
  t.is(typeof div, 'function')
  t.true(React.isValidElement(<Heading />))
  t.true(React.isValidElement(<div />))
})

test('renders subcomponents', t => {
  const { Heading } = macro(domEl)
  const json = render(<Heading children='Hello' />).toJSON()
  t.is(json.type, 'h1')
  t.is(json.children[0], 'Hello')
  t.snapshot(json)
})

test('returns a component with React components', t => {
  const Card = macro(componentEl)
  t.is(typeof Card, 'function')
  const el = <Card heading='Hello' text='Beep' />
  t.true(React.isValidElement(el))
  const json = render(el).toJSON()
  t.snapshot(json)
  const [ a, b ] = json.children
  t.is(a.type, 'h2')
  t.is(a.children[0], 'Hello')
  t.is(b.type, 'div')
  t.is(b.children[0], 'Beep')
})

test('returns subcomponent with React components', t => {
  const Card = macro(componentEl)
  t.is(typeof Card.Heading, 'function')
  t.is(typeof Card.Text, 'function')
  const heading = <Card.Heading children='Hello' />
  const text = <Card.Text children='Hello' />
  t.true(React.isValidElement(heading))
  t.true(React.isValidElement(text))
  const a = render(heading).toJSON()
  const b = render(text).toJSON()
  t.snapshot(a)
  t.snapshot(b)
})

test('returns nested subcomponents', t => {
  const Card = macro(nestedEl)
  t.is(typeof Card.Box, 'function')
  t.is(typeof Card.Heading, 'function')
  t.is(typeof Card.Text, 'function')
  const card = <Card heading='Hello' text='Beep' />
  const heading = <Card.Heading children='Hello' />
  const text = <Card.Text children='Hello' />
  t.true(React.isValidElement(card))
  t.true(React.isValidElement(heading))
  t.true(React.isValidElement(text))
  const root = render(card).toJSON()
  const a = render(heading).toJSON()
  const b = render(text).toJSON()
  t.snapshot(root)
  t.snapshot(a)
  t.snapshot(b)
})

test('maps props with option', t => {
  const Card = macro(componentEl, {
    mapProps: props => ({
      heading: props.name,
      text: props.description
    })
  })
  const card = <Card name='Name' description='Description' />
  const json = render(card).toJSON()
  const [ a, b ] = json.children
  t.is(a.children[0], 'Name')
  t.is(b.children[0], 'Description')
})

test('gives a default name for anonymous functions', t => {
  const Card = macro(anonEl)
  t.is(typeof Card.Component, 'function')
  t.is(Card.Component.displayName, 'Component')
})
