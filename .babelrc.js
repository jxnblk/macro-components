const { NODE_ENV, BABEL_ENV } = process.env

const modules = BABEL_ENV === 'cjs' || NODE_ENV === 'test' ? 'commonjs' : false

module.exports = {
  presets: [
    ['env', { modules, loose: true }],
    'stage-0',
    'react'
  ]
}
