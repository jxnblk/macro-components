import React from 'react'
import styled from 'styled-components'
import {
  space,
  width,
  fontSize,
  textAlign,
  color
} from 'styled-system'
import compose from '../src'

const Font = styled('div')`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
`

const Box = styled('div')`
  ${space}
  ${fontSize}
  ${width}
  ${color}
`

Box.displayName = 'Box'

const Text = styled('div')`
  ${space}
  ${fontSize}
  ${textAlign}
  ${color}
`

Text.displayName = 'Text'

const Heading = styled('h2')`
  line-height: 1.25;
  ${space}
  ${fontSize}
  ${textAlign}
  ${color}
`

Heading.displayName = 'Heading'

Heading.defaultProps = {
  m: 0
}

const Header = compose(<Box p={3} bg='tomato'>
  <Heading />
  <Heading name='Subhead' fontSize={3} color='rgba(0, 0, 0, .75)' />
  <Box p={2} bg='white'>
    <Text name='Nested' />
  </Box>
</Box>)

console.log(Object.keys(Header) )
const App = props => (
  <Font>
    <Header
      heading='Hello composed component'
      subhead='Subhead'
      text='Hello there Text component'
      nested='nested'
    />
    <br />
    <Header>
      <Header.Subhead>
        Subhead
      </Header.Subhead>
      <Header.Heading>
        Hello decomposed component
      </Header.Heading>
      <Header.Box>
        Box (white?)
      </Header.Box>
      <Header.Nested>Nested</Header.Nested>
    </Header>
  </Font>
)

export default App
