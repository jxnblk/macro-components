import React from 'react'
import { renderToString } from 'react-dom/server'
import macro from '../src'

const Card = macro(({
  img,
  h2,
  h3
}) => (
  <div className='Card'>
    {img}
    {h2}
    {h3}
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
      <img src='kitten.png' />
      <h2>Hello</h2>
      <h3>Beep</h3>
    </Card>
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
  plainProps,
  plainComposed,
}
