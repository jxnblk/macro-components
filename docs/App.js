import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import {
  space,
  width,
  fontSize,
  textAlign,
  color
} from 'styled-system'
import macro from '../src/lite'

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

const Box = styled('div')`
  ${space}
  ${fontSize}
  ${width}
  ${color}
`

Box.displayName = 'Box'

const Flex = Box.extend`
  display: flex;
  align-items: center;
`

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

const Pre = styled('pre')`
  font-family: Menlo, monospace;
  font-size: 13px;
  margin: 0;
  overflow: auto;
  ${space}
`

Pre.displayName = 'Pre'

const Container = styled('div')`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = macro(
  <Box bg='#0af' p={3}>
    <Flex>
      <Box>
        <Heading
          f={6}
          color='white'
        />
        <Heading />
      </Box>
      <Pre ml='auto' />
    </Flex>
  </Box>
)

const Card = macro(
  <Box bg='#eee'>
    <img width='128' height='128' />
    <Heading />
    <Heading name='subhead' />
  </Box>
)

const App = props => (
  <Font>
    <Header>
      <Heading>Hello</Heading>
      <Heading>Subhead</Heading>
      <Pre>npm i macro-components</Pre>
    </Header>

    <Flex>
      <Card p={1}>
        <img src='http://jxnblk.com/avatar/avatar-640.png' />
        <Heading>Hello Card</Heading>
      </Card>
    </Flex>

    {/* required name prop to work properly
    <Header
      heading='Monolithic mode'
      pre='Beep boop'
    />
    */}
  </Font>
)

//const Header = macro(
//  <Box p={3} bg='#0fa'>
//    <Heading />
//    <Heading
//      name='Subhead'
//      fontSize={3}
//      color='rgba(0, 0, 0, .5)'
//    />
//    <Box p={2} mt={2} bg='white'>
//      <Pre />
//    </Box>
//  </Box>
//)

/*
const App = props => (
  <Font>
    <Container>
      <Box p={3}>
        <Header
          heading='macro-components'
          subhead='Hello'
          text='Create flexible composite UI components with styled-components and other React components'
          pre='npm i macro-components'
        />
      </Box>
      <Box p={3}>
        <Header>
          <Header.Subhead>
            Subhead
          </Header.Subhead>
          <Header.Heading>
            Decomposed component example
          </Header.Heading>
        </Header>
      </Box>
      <Box p={3}>
        <Header>
          <Heading>
            Hello
          </Heading>
          <Header.Subhead>
            Beep
          </Header.Subhead>
          <Pre>Hello</Pre>
        </Header>
      </Box>
    </Container>
  </Font>
)
*/

export default App
