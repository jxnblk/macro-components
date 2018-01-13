
// ideal API

const el = (
  <header>
    <h1 />
    <div>
      <h2 />
    </div>
  </header>
)

const Comp = macro(el)

const inst = (
  <Comp>
    <h1>Hello</h1>
    <h2>Beep</h2>
  </Comp>
)

// implementation
// - final dom structure reflects initial element tree
// - similar elements are merged/cloned
// - how to do this in a performant way...

// - create props object from children
//  const props = createProps(children)
//  {
//    h1: {},
//    h2: {}
//  }
