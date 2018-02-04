import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import sys from 'system-components'
import macro, { Clone } from '../src'

injectGlobal`
  * { box-sizing: border-box }
  body {
    margin: 0;
  }
`

const Font = styled('div')`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
`

const Box = sys(
  'space',
  'fontSize',
  'width',
  'color'
)

// Box.displayName = 'Box'

const Flex = sys({
  align: 'center',
},
  'space',
  'alignItems',
  'justifyContent',
  'flexWrap',
  'flexDirection',
  'color',
  'display:flex;'
)

const Text = sys(
  'space',
  'fontSize',
  'textAlign',
  'color'
)

// Text.displayName = 'Text'

const Heading = sys({
  is: 'h2',
  m: 0,
  fontSize: [ 5, 6 ],
  lineHeight: 1.125,
  fontWeight: 'bold'
},
  'space',
  'fontSize',
  'lineHeight',
  'textAlign',
  'color'
)

// Heading.displayName = 'Heading'

const Subhead = props => <Heading {...props} fontWeight={600} />
// Subhead.displayName = 'Subhead'

const Pre = sys({
  is: 'pre',
  m: 0,
  fontSize: 13,
}, `
  font-family: Menlo, monospace;
  overflow: auto;
`)

// Pre.displayName = 'Pre'

const Container = sys({
  // maxWidth: 1024,
  mx: 'auto'
}, 'max-width: 1024px;')

const Header = macro({
  Heading,
  Subhead,
  Pre
}, ({
  Heading,
  Subhead,
  Pre,
}, {
  bg = 'seafoam'
}) => (
  <Box
    bg={bg}
    color='text'
    px={3}
    py={[ 4, 5 ]}>
    <Container>
      <Flex wrap>
        <Box width={[ 1, 1, 2/3 ]}>
          <Clone
            element={Heading}
            mb={2}
          />
          {Subhead}
        </Box>
        <Box mx='auto' />
        <Box>
          <Clone
            element={Pre}
            py={3}
          />
        </Box>
      </Flex>
    </Container>
  </Box>
))

const space = [
  0, 4, 8, 16, 32, 64, 128, 256
]

const colors = {
  seafoam: '#0fa',
  text: '#053',
}

const theme = {
  space,
  colors
}

const App = props => (
  <React.Fragment>
    <title>macro-components</title>
    <ThemeProvider theme={theme}>
      <Font>
        <Header>
          <Header.Heading>macro-components</Header.Heading>
          <Header.Subhead>
            Create flexible layout and composite UI components without the need to define arbitrary custom props.
          </Header.Subhead>
          <Header.Pre>npm i macro-components</Header.Pre>
        </Header>
      </Font>
    </ThemeProvider>
  </React.Fragment>
)

export default App
