import test from 'ava'
import React from 'react'
import TestRenderer, { create as render } from 'react-test-renderer'
import util from 'util'
import macro from './src'

/*
const domEl = (
  <div>
    <h1 name='Heading' />
    <div />
  </div>
)
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
*/

const Box = props => <div {...props} />
const Text = props => <div {...props} />
const Heading = props => <h2 {...props} />

test('returns a component', t => {
  const Card = macro(({ h1, div }) => (
    <div>
      {h1}
      {div}
    </div>
  ))
  t.is(typeof Card, 'function')
  t.true(React.isValidElement(<Card />))
})

test('renders', t => {
  const Card = macro(({ h1, div }) => (
    <div>
      {h1}
      {div}
    </div>
  ))
  const json = render(
    <Card>
      <h1>Hello</h1>
    </Card>
  ).toJSON()
  t.snapshot(json)
})

test('returns a component with React components', t => {
  const Card = macro(({ Heading, Text }) => (
    <div>
      {Heading}
      {Text}
    </div>
  ))
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
  const Nested = macro(({ Heading, Text }) => (
    <Box>
      <Box>
        {Heading}
      </Box>
      {Text}
    </Box>
  ))
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

test('handles string children', t => {
  const Card = macro(({ Heading }) => (
    <div>
      {Heading}
      Hello text
    </div>
  ))
  const json = render(
    <Card>
      <Heading>Hi</Heading>
    </Card>
  ).toJSON()
  t.is(json.children[1], 'Hello text')
})

test('accepts a name prop to map to arguments', t => {
  const Card = macro(({ heading, subhead }) => (
    <div>
      {heading}
      {subhead}
    </div>
  ))
  const json = render(
    <Card>
      <Heading name='heading'>Hello</Heading>
      <Heading name='subhead'>Beep</Heading>
    </Card>
  ).toJSON()
  t.is(json.children[0].type, 'h2')
  t.is(json.children[0].children[0], 'Hello')
  t.is(json.children[1].type, 'h2')
  t.is(json.children[1].children[0], 'Beep')
})

test('updates template on children update', t => {
  const Card = macro(({ heading, subhead }) => (
    <div>
      {heading}
      {subhead}
    </div>
  ))
  const card = TestRenderer.create(
    <Card>
      <Heading name='heading'>Nope</Heading>
      <Heading name='subhead'>Nope</Heading>
    </Card>
  )
  card.update(
    <Card>
      <Heading name='heading'>Hello</Heading>
      <Heading name='subhead'>Beep</Heading>
    </Card>
  )
  const json = card.toJSON()
  // card.
  t.is(json.children[0].type, 'h2')
  t.is(json.children[0].children[0], 'Hello')
  t.is(json.children[1].type, 'h2')
  t.is(json.children[1].children[0], 'Beep')
})

test('skips template update', t => {
  const Card = macro(({ Heading }) => (
    <div>
      {Heading}
    </div>
  ))
  const children = (
    <Heading>Hello</Heading>
  )
  const card = TestRenderer.create(
    <Card>
      {children}
    </Card>
  )
  card.update(
    <Card>
      {children}
    </Card>
  )
  const json = card.toJSON()
  t.is(json.children[0].type, 'h2')
  t.is(json.children[0].children[0], 'Hello')
})


/*
// from old api
// maybe this is a feature?
test.skip('handles multiple duplicate elements', t => {
  const Multiples = macro(({ Heading }) => (
    <div>
      {Heading[0]}
      <div>
        {Heading[1]}
        {Heading[2]}
      </div>
    </div>
  ))
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

// maybe this is a feature?
test.skip('handles multiple duplicate children', t => {
  const Card = macro(({ Heading }) => (
    <div>
      {Heading}
    </div>
  ))
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
*/
