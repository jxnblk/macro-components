
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
import Macro from 'macro-components'
import { space, fontSize, color } from 'styled-system'

// Define some styled-components
const Box = styled.div`${space} ${fontSize} ${color}`
Box.displayName = 'Box'

const Image = styled.img`
  max-width: 100%;
  height: auto;
  ${space}
`
Image.displayName = 'Image'

const Heading = styled.h2`${space} ${fontSize} ${color}`
Heading.displayName = 'Heading'

const Text = styled.div`${space} ${fontSize} ${color}`
Text.displayName = 'Text'

// create a macro function with the UI components you intend to use
const macro = Macro({
  Image,
  Heading,
  Text
})

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
```

```jsx
import MediaObject from './MediaObject'

// get the macro component's child components
const { Image, Heading, Text } = MediaObject

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

**Note:** Macro components are intended to *only* work with specific child components. If you're wanting to define *slots*, see the [Alternatives](#alternatives) section below.

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

## Alternatives

The main drawback of this API is that it is somewhat implicit and relies on the components
having the right `displayName`. This couples the "layout" components and the "child" components
[very tightly](https://github.com/jxnblk/macro-components/issues/3#issuecomment-361997713)
because a change in the API of the "layout" component will require changes in
the source of the child components passed to it.

This API also doesn't work if the component relies on a `name`
prop itself (because the library overloads its meaning).

Note that it's entirely possible to use a similar pattern without this library in pure
React by passing React elements as props (they don't have to be named `children`). Check out
an example in [this comment](https://github.com/jxnblk/macro-components/issues/3#issuecomment-361971573)
and see whether this works better for you.

## Usage

`Macro(componentsObject)(elementFunction)`

Returns a React component with a composable API that keeps tree layout structure.

```jsx
const Banner = Macro({
  // pass a components object
  Heading,
  Subhead
})(({
  // the element function receives child elements
  // named according to the components object
  Heading,
  Subhead
}) => (
  <Box p={3} color='white' bg='blue'>
    {Heading}
    {Subhead}
  </Box>
)
```

The `elementFunction` argument is called with an object of elements
based on the `componentsObject` passed to the Macro function.
Using the Banner component above would look something like the following.

```jsx
import Banner from './Banner'

const App = () => (
  <Banner>
    <Banner.Heading>Hello</Banner.Heading>
    <Banner.Subhead>Subhead</Banner.Subhead>
  </Banner>
)
```

### componentsObject

The components object is used to defined which components the macro component will accept as children.

### elementFunction

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

const Heading = styled.h2``
const Text = styled.div``

const componentsObj = {
  Heading,
  Text
}

const SectionHeader = Macro(componentsObj)(elFunc)
```

### Omitting children

For any element not passed as a child to the macro component,
the element function will render `undefined` and React will not render that element.
This is useful for conditionally omitting optional children

```jsx
const macro = Macro({ Icon, Text, CloseButton })

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
```

```jsx
import Message from './Message'

const { Text, CloseButton } = Message

// Omitting the Icon child element will render Message without an icon.
const message = (
  <Message>
    <Text>{props.message}</Text>
    <CloseButton
      onClick={props.dismissMessage}
    />
  </Message>
)
```

### Props passed to the root component

The second argument passed to the element function allows you to pass props to the root element or any other element within the component.

```jsx
const macro = Macro({ Image, Text })

const Card = macro(({
  Image,
  Text
}, props) => (
  <Box p={2} bg={props.bg}>
    {Image}
    {Text}
  </Box>
))
```

```jsx
// example usage
<Card bg='tomato'>
  <Card.Image src='kittens.png' />
  <Card.Text>Meow</Card.Text>
</Card>
```

### Clone Component

To apply default props to the elements passed in as children, use the Clone component in an element function.

```jsx
import Macro, { Clone } from 'macro-components'
import { Heading, Text } from './ui'

const macro = Macro({ Heading, Text })

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

### Using a Component Multiple Times

To use the same component twice, give it a unique key in the componentsObject.

```jsx
import React from 'react'
import Macro from 'macro-components'
import { Heading } from './ui'

const macro = Macro({
  Heading: Heading,
  Subhead: Heading
})

const Header = macro(({ Heading, Subhead }) => (
  <Box p={2}>
    {Heading}
    {Subhead}
  </Box>
))
```

```jsx
<Header>
  <Header.Heading>Hello</Header.Heading>
  <Header.Subhead>Subhead</Header.Subhead>
</Header>
```

---

### Alternatives

To create layout components that are **not** coupled to specific child components, using props or ordered children is probably a simpler approach.

The solutions below allow you to pass any arbitrary components as props or children.

See [this discussion](https://github.com/jxnblk/macro-components/issues/3) for more.

```jsx
// using custom props
const MyLayout = ({
  left,
  right
}) => (
  <Flex>
    <Box width={128}>
      {left}
    </Box>
    <Box width={1}>
      {right}
    </Box>
  </Flex>
)

<MyLayout
  left={(
    <Image src='kitten.png' />
  )}
  right={(
    <Text>Meow</Text>
  )}
/>
```

```jsx
// using ordered children
const Header = props => {
  const [ first, second ] = React.Children.toArray(props.children)
  return (
    <Box p={3}>
      {first}
      {second}
    </Box>
  )
}

<Header>
  <Heading>First</Heading>
  <Text>Second</Text>
</Header>
```

```jsx
// using a children object
const Header = ({
  children: {
    left,
    right
  }
}) => (
  <Flex>
    <Box>
      {left}
    </Box>
    <Box width={1}>
      {right}
    </Box>
  </Flex>
)

<Header>
  {{
    left: (
      <Image src='kitten.png' />
    ),
    right: (
      <Text>Meow</Text>
    )
  }}
</Header>
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
