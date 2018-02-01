
# macro-components

Create flexible layout and composite UI components without the need to define arbitrary custom props.


[![Build Status][build-badge]][build]
<!-- cant log in so nope
[![Coverage][coverage-badge]][coverage]
-->

[build-badge]: https://img.shields.io/travis/jxnblk/macro-components/master.svg?style=flat-square
[build]: https://travis-ci.org/jxnblk/macro-components
[coverage-badge]: https://img.shields.io/codecov/c/github/jxnblk/macro-components.svg?style=flat-square
[coverage]: https://codecov.io/github/jxnblk/macro-components

```
npm i macro-components
```

```jsx
import React from 'react'
import styled from 'styled-components'
import macro from 'macro-components'
import { space, fontSize, color } from 'styled-system'

// Define some styled-components
const Box = styled.div`${space} ${fontSize} ${color}`

// Ensure components have a `displayName`
Box.displayName = 'Box'

const Heading = styled.h2`${space} ${fontSize} ${color}`
Heading.displayName = 'Heading'

const Text = styled.div`${space} ${fontSize} ${color}`
Text.displayName = 'Text'

// Create a macro-component
const MediaObject = macro(({
  Image,
  Heading,
  Text
}) => (
  <Flex p={2} align='center'>
    <Box width={128}>
      {Image}
    </Box>
    <Box>
      {Heading}
      {Text}
    </Box>
  </Flex>
))

// Use the macro-component by passing the components as children
const App = props => (
  <div>
    <MediaObject>
      <Image src='kitten.png' />
      <Heading>
        Hello
      </Heading>
      <Text>
        This component keeps its tree structure but still allows for regular composition.
      </Text>
    </MediaObject>
  </div>
)
```

## Features

- Single component creator
- Intended for use with libraries like [styled-components][sc] & [glamorous][glamorous]
- Encapsulate layout structure in composable components
- Help keep your component API surface area to a minimum
- Works with *any* other React components

## Motivation

Often it's best to use [React composition][composition] and `props.children`
to create UI that is composed of multiple elements,
but sometimes you might want to create larger composite components
with encapsulated tree structures for layout
or create [Bootstrap][bootstrap]-like UI components
such as panels, cards, or alerts.
This library lets you create composite components
with encapsulated DOM structures
without the need to define arbitrary props APIs
and that work just like any other React composition.

This can help ensure that your component API surface area remains small
and easier to maintain.

If you find yourself creating composite React components that don't map to data structures,
as described in [Thinking in React][thinking-in-react],
then this module is intended for you.

[composition]: https://reactjs.org/docs/composition-vs-inheritance.html
[thinking-in-react]: https://reactjs.org/docs/thinking-in-react.html
[bootstrap]: https://getbootstrap.com

## Usage

`macro(elementFunction)`

Returns a React component with a composable API that keeps tree layout structure.

```jsx
const Banner = macro(({
  Heading,
  Subhead
}) => (
  <Box p={3} color='white' bg='blue'>
    {Heading}
    {Subhead}
  </Box>
)
```

By default, the `elementFunction` argument is called with an object of elements based on the element type or component `displayName`.
Using the Banner component above would look something like the following.

```jsx
<Banner>
  <Heading>Hello</Heading>
  <Subhead>Subhead</Subhead>
</Banner>
```

To ensure correct placement or for when there are multiples of the same child component type,
use the `name` prop to specify which child element is inserted in a particular location in the tree.

```jsx
<Banner>
  <Heading>Hello</Heading>
  <Heading name='Subhead'>Subhead</Heading>
</Banner>
```

### Using component type

For stricter usage, use the component type as a key when defining the macro-component.

```jsx
import Heading from './Heading'
import Subhead from './Subhead'

const Banner = macro(elements => (
  <Box p={3} color='white' bg='blue'>
    {elements[Heading]}
    {elements[Subhead]}
  </Box>
))
```

This ensures that **only** the components that are intended to be used with the macro component can be passed as children.

**elementFunction**

The element function is similar to a React component, but receives an elements object as its first argument and props as its second one.
The elements object is created from its children and is intended to make encapsulating composition and element structures easier.

Within the macro component, the element function is called with the elements object and props: `elementFunction(elementsObject, props)`.

```jsx
// example
const elFunc = ({ Heading, Text, }, props) => (
  <header>
    {Heading}
    {Text}
  </header>
)

const SectionHeader = macro(elFunc)
```

### Omitting children

For any element not passed as a child to the macro component,
the element function will render `undefined` and React will not render that element.
This is useful for conditionally omitting optional children

```jsx
const Message = macro({
  Icon,
  Text,
  CloseButton
}) => (
  <Flex p={2} bg='lightYellow'>
    {Icon}
    {Text}
    <Box mx='auto' />
    {CloseButton}
  </Flex>
)

// Omitting the Icon child element will render Message without an icon.
<Message>
  <Text>{props.message}</Text>
  <CloseButton
    onClick={props.dismissMessage}
  />
</Message>
```

### Props passed to the root component

The second argument passed to the element function allows you to pass props to the root element or any other element within the component.

```jsx
const Card = macro(({
  Image,
  Text
}, props) => (
  <Box p={2} bg={props.bg}>
    {Image}
    {Text}
  </Box>
))

// example usage
<Card bg='tomato'>
  <Image src='kittens.png' />
  <Text>Meow</Text>
</Card>
```

### Clone Component

To apply default props to the elements passed in as children, use the Clone component in an element function.

```jsx
import macro, { Clone } from 'macro-components'

const Header = macro(({ Heading, Text }) => (
  <Box p={2}>
    <Clone
      element={Heading}
      fontSize={6}
      mb={2}
    />
    <Clone
      element={Text}
      fontSize={3}
    />
  </Box>
))
```

---

#### Related

- [styled-components][sc]
- [glamorous][glamorous]
- [emotion][emotion]
- [styled-system](https://github.com/jxnblk/styled-system)
- [system-components](https://github.com/jxnblk/system-components)
- *MediaObject* example based on: [The media object saves hundreds of lines of code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

[sc]: https://github.com/styled-components/styled-components
[glamorous]: https://github.com/paypal/glamorous
[emotion]: https://github.com/emotion-js/emotion

[MIT License](LICENSE.md)
