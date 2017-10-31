
# macro-components

Create flexible composite UI components with styled-components and other React components

[![Build Status][build-badge]][build]
[![Coverage][coverage-badge]][coverage]

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

const Card = macro(
  <Box p={2} bg='gray'>
    <Heading />
    <Text />
  </Box>
)

const App = props => (
  <div>
    <Card
      heading='Hello'
      text='This is the Card used as a monolithic component'
    />
    <Card>
      <Card.Text>
        But you can also use it in a more composable way
      </Card.Text>
      <Card.Heading>
        Hello
      </Card.Heading>
    </Card>
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
that can be destructured and used as their individual components.

[composition]: https://reactjs.org/docs/composition-vs-inheritance.html
[thinking-in-react]: https://reactjs.org/docs/thinking-in-react.html
[bootstrap]: https://getbootstrap.com

## API

`macro(reactElement, options)`

Returns a React component with a props API based on the subcomponents' names.
Additionally, it creates subcomponents for each part of the given element.

Note:
- The first argument is a React element, not a component
- `props` are *not* available to the React element

## Naming Subcomponents

By default, macro-components uses a component's `displayName`
as the name of the returned subcomponent and a lowercased version as a prop key.
When using the same component multiple times within a composite component,
use the `name` prop to provide a custom component name and prop key for a given element.

```jsx
const Banner = macro(
  <Box p={3} color='white' bg='blue'>
    <Heading />
    <Heading name='Subhead' fontSize={3} />
  </Box>
)
```

MIT License
