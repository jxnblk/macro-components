import React from 'react'
import { renderToString } from 'react-dom/server'
import macro from '../src'
import scopedMacro from '../src/scoped'
import slotMacro, { Slot } from '../src/slots'

const img = 'img'
const h2 = 'h2'
const h3 = 'h3'

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

const Scoped = scopedMacro({
  img,
  h2,
  h3
})(({ img, h2, h3 }) => (
  <div className='Card'>
    {img}
    {h2}
    {h3}
  </div>
))

const Slotted = slotMacro(
  <div className='Card'>
    <Slot component='img' />
    <Slot component='h2' />
    <Slot component='h3' />
  </div>
)

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

const macroScopedComposed = () => {
  const html = renderToString(
    <Scoped>
      <Scoped.img src='kitten.png' />
      <Scoped.h2>Hello</Scoped.h2>
      <Scoped.h3>Beep</Scoped.h3>
    </Scoped>
  )
}

const macroSlotComposed = () => {
  const html = renderToString(
    <Slotted>
      <img src='kitten.png' />
      <h2>Hello</h2>
      <h3>Beep</h3>
    </Slotted>
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
  macroScopedComposed,
  macroSlotComposed,
  plainProps,
  plainComposed,
}
