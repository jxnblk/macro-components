
# macro-components

Create flexible composite UI components with styled-components and other React components

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

const Box = styled.div`${space} ${fontSize} ${color}`
Box.displayName = 'Box'

const Heading = styled.h2`${space} ${fontSize} ${color}`
Heading.displayName = 'Heading'

const Text = styled.div`${space} ${fontSize} ${color}`
Text.displayName = 'Text'

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

## Motivation

Most of the time it's best to use [React composition][composition] and `props.children`
to create UI that is composed of multiple elements,
but sometimes you might want to create larger composite components
that map to data structures
(as described in [Thinking in React][thinking-in-react])
or create [Bootstrap][bootstrap]-like UI components
such as panels, cards, or alerts.
This library lets you create composite components
with encapsulated DOM structures
that work just like any other React composition.

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
To ensure correct placement or for when there are multiples of the same component type,
use the `name` prop to specify which child element is inserted in a particular location in the tree.

```jsx
<Banner>
  <Heading>Hello</Heading>
  <Heading name='Subhead'>Subhead</Heading>
</Banner>
```

### Props passed to the root component

TK

### Clone Component

TK

---

- *MediaObject* example based on: [The media object saves hundreds of lines of code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)

MIT License
