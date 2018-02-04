import React from 'react'
import { renderToString } from 'react-dom/server'
import Macro from '../src'
import lite from '../src/lite'

const Img = props => <img {...props} />
const H2 = props => <h2 {...props} />
const H3 = props => <h3 {...props} />

Img.displayName = 'Img'
H2.displayName = 'H2'
H3.displayName = 'H3'

const macro = Macro({ Img, H2, H3 })

const Card = macro(({
  Img,
  H2,
  H3
}) => (
  <div className='Card'>
    {Img}
    {H2}
    {H3}
  </div>
))

const LiteCard = lite(({
  Img,
  H2,
  H3
}) => (
  <div className='Card'>
    {Img}
    {H2}
    {H3}
  </div>
))

const PlainCard = ({
  image,
  heading,
  subhead,
}) => (
  <div className='Card'>
    <img
      src={image}
      className='Card-image'
    />
    <h2 className='Card-heading'>{heading}</h2>
    <h3 className='Card-subhead'>{subhead}</h3>
  </div>
)

const macroComposed = () => {
  const html = renderToString(
    <Card>
      <Card.Img src='kitten.png' />
      <Card.H2>Hello</Card.H2>
      <Card.H3>Beep</Card.H3>
    </Card>
  )
}

const macroLiteComposed = () => {
  const html = renderToString(
    <LiteCard>
      <Img src='kitten.png' />
      <H2>Hello</H2>
      <H3>Beep</H3>
    </LiteCard>
  )
}

const plainProps = () => {
  const html = renderToString(
    <PlainCard
      image='kitten.png'
      heading='Hello'
      subhead='Beep'
    />
  )
}

const plainComposed = () => {
  const html = renderToString(
    <div>
      <img src='kitten.png' />
      <h2>Hello</h2>
      <h3>Beep</h3>
    </div>
  )
}

module.exports = {
  macroComposed,
  macroLiteComposed,
  plainProps,
  plainComposed,
}
