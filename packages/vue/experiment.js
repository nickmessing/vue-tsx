class Component {
  static get $_component() {
    console.log('getting')
    if (!this.$_componentOptions) {
      this.$_buildComponent()
    }
    return this.$_componentOptions
  }

  static $_buildComponent() {
    console.log('building component')
    const options = {}
    options.render = transformRenderFn(this.prototype.render)
    this.$_componentOptions = options
    console.log(options)
  } 
}

class Cmp1 extends Component {
  render(h) {
    console.log('render called?')
    return h('span', 'woops')
  }
}
class Cmp2 extends Component {
  render(h) {
    return h('ul', [h('li', [h(Cmp1)]), h('li', [h(Cmp1)]), h('li', [h(Cmp1)]), h('li', [h(Cmp1)])])
  }
}

const transformCreateElement = createElement =>
  function(tag, ...args) {
    return createElement.call(
      this,
      typeof tag === 'function' && tag !== null && tag.prototype instanceof Component ? tag.$_component : tag,
      ...args,
    )
  }
const transformRenderFn = fn =>
  function(h, ...args) {
    return fn.call(this, transformCreateElement(h), ...args)
  }

class App extends Vue {
  constructor(options) {
    const opts = {
      ...options,
      render: transformRenderFn(options.render),
    }
    super(opts)
  }
}

new App({
  el: '#app',
  render: h => h(Cmp2),
})
