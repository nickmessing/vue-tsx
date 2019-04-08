import RealVue from 'vue'

const lifecycleHooks = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
]

class Component {
  static get $_TSX_component() {
    if (!this.$_TSX_componentOptions) {
      this.$_buildComponent()
    }
    return this.$_TSX_componentOptions
  }

  static $_buildComponent() {
    console.log('building component')
    const options = {
      methods: {},
      computed: {},
    }

    const descriptor = Object.getOwnPropertyDescriptors(this.prototype)

    for (let key in descriptor) {
      if (key === 'render') {
        console.log('building render')
        options.render = transformRenderFn(this.prototype.render)
      } else if (key !== 'constructor') {
        if (descriptor[key].value) {
          options.methods[key] = descriptor[key].value

          if (lifecycleHooks.includes(key)) {
            options[key] = descriptor[key].value
          }
        } else {
          options.computed[key] = {
            get: descriptor[key].get,
            set: descriptor[key].set,
          }
        }
      }
    }

    options.name = this.prototype.constructor.name
    options.data = () => {
      const a = new this()
      a.__proto__ = null
      return a
    }

    const dummy = new this()

    if (dummy.$_watch) {
      options.watch = dummy.$_watch
    }

    this.$_TSX_componentOptions = options
  }
}
export const transformComponent = tag => {
  return tag !== null && tag.$_TSX_component
    ? tag.$_TSX_component
    : tag
}
const transformCreateElement = createElement =>
  function(tag, ...args) {
    return createElement.call(this, transformComponent(tag), ...args)
  }
const transformRenderFn = fn =>
  function(h, ...args) {
    return fn.call(this, transformCreateElement(h), ...args)
  }
class Vue extends RealVue {
  constructor(options) {
    const opts = {
      ...Object.keys(options).reduce(
        (obj, key) => ({
          ...obj,
          [key]: !options[key] ? options[key] : options[key].$_TSX_infer ? options[key].$_TSX_infer : options[key],
        }),
        {},
      ),
      render: transformRenderFn(options.render),
    }
    super(opts)
  }
  static use(plugin, ...args) {
    RealVue.use(plugin.$_TSX_plugin, ...args)
  }
}

function Watch(path, options) {
  return function(target, key) {
    if (!target.__proto__.$_watch) {
      Object.defineProperty(target.__proto__, '$_watch', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: {},
      })
    }
    if (!target.__proto__.$_watch[path]) {
      target.__proto__.$_watch[path] = {
        ...(options || {}),
        handler: key,
      }
    }
  }
}

export { Component, Vue, Watch }
