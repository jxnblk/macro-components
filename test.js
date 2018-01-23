import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import util from 'util'
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

test('returns a component', t => {
  const Card = macro(domEl)
  t.is(typeof Card, 'function')
  t.true(React.isValidElement(<Card />))
})

test('renders', t => {
  const Card = macro(domEl)
  const json = render(
    <Card>
      <h1>Hello</h1>
    </Card>
  ).toJSON()
  t.snapshot(json)
})

test('returns a component with React components', t => {
  const Card = macro(componentEl)
  t.is(typeof Card, 'function')
  const el = (
    <Card>
      <Heading>Hello</Heading>
      <Text>Beep</Text>
    </Card>
  )
  t.true(React.isValidElement(el))
  const json = render(el).toJSON()
  t.snapshot(json)
  const [ a, b ] = json.children
  t.is(a.type, 'h2')
  t.is(a.children[0], 'Hello')
  t.is(b.type, 'div')
  t.is(b.children[0], 'Beep')
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

test('handles multiple duplicate elements', t => {
  const Multiples = macro(
    <div>
      <Heading />
      <div>
        <Heading />
        <Heading />
      </div>
    </div>
  )
  const json = render(
    <Multiples>
      <Heading>One</Heading>
      <Heading>Two</Heading>
    </Multiples>
  ).toJSON()
  t.is(json.children[0].type, 'h2')
  t.is(json.children[0].children[0], 'One')
  t.is(json.children[1].children[0].type, 'h2')
  t.is(json.children[1].children[0].children[0], 'Two')
})

test('handles multiple duplicate children', t => {
  const Card = macro(
    <div>
      <Heading />
    </div>
  )
  const json = render(
    <Card>
      <Heading>One</Heading>
      <Heading>Two</Heading>
      <Heading>Three</Heading>
    </Card>
  ).toJSON()
  t.is(json.children[0].type, 'h2')
  t.is(json.children[0].children[0], 'One')
  t.is(json.children[1], undefined)
})

test('handles string children', t => {
  const Card = macro(
    <div>
      <Heading />
      Hello text
    </div>
  )
  const json = render(
    <Card>
      <Heading>Hi</Heading>
    </Card>
  ).toJSON()
  t.is(json.children[1], 'Hello text')
})
