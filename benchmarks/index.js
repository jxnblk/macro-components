const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

const {
  macroComposed,
  plainProps,
  plainComposed
} = require('./cases')

suite
  .add('macro composed', macroComposed)
  .add('plain react props', plainProps)
  .add('plain react composed', plainComposed)
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function () {
    const top = this.filter('fastest').map('name')
    console.log(`Fastest is ${top}`)
  })
  .run({
    async: true
  })

