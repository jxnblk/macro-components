const React = require('react')
const { renderToString } = require('react-dom/server')
const macro = require('..').default

const Card = macro(
  <div className='Card'>
    <img name='image' prop='src' className='Card-image' />
    <h2 name='heading' className='Card-heading' />
    <h3 name='subhead' className='Card-subhead' />
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

const macroProps = () => {
  const html = renderToString(
    <Card
      image='kitten.png'
      heading='Hello'
      subhead='Beep'
    />
  )
}

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
  macroProps,
  macroComposed,
  plainProps,
  plainComposed,
}
