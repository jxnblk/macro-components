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

test('uses props.prop to map values to a prop key', t => {
  const Card = macro(<div>
    <img prop='src' />
  </div>)
  const card = <Card img='hello.png' />
  const json = render(card).toJSON()
  t.is(json.children[0].props.src, 'hello.png')
  t.is(json.children[0].props.children, undefined)
})

test('swaps out nested child elements', t => {
  const Nested = macro(nestedEl)
  const json = render(
    <Nested>
      <Heading>Hello</Heading>
      <Text>Text</Text>
    </Nested>
  ).toJSON()
  t.is(json.children[0].children[0].type, 'h2')
  t.is(json.children[0].children[0].children[0], 'Hello')
  t.is(json.children[1].type, 'div')
  t.is(json.children[1].children[0], 'Text')
})
