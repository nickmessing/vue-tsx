# Vue TSX

This Repository aims to add full TSX support to the existing [vuejs/jsx](https://github.com/vuejs/jsx) Babel preset.

# Installation

Install the package and babel preset with:

```bash
npm install @vue-tsx/vue @vue/babel-preset-jsx
```

Then add the preset to `.babelrc`:

```json
{
  "presets": ["@vue/babel-preset-jsx"]
}
```

# Getting Started

**Content**

- [Mounting your app](#Mounting-your-app)
- [Creating Class Component](#Creating-Class-Component)
- [Define Component Props](#Define-Component-Props)
- [Use Component in TSX](#Use-Component-in-TSX)
- [Watch Methode](#Watch-Methode)
- [Implement Router](#Implement-Router)

### Mounting your app

```tsx
// import Vue Class
import { Vue } from 'vue-tsx';

new Vue({
  // pass root element
  el: document.getElementById('app'),

  // implement render method
  render() {
    return <p>Hello World<p>
  },
})
```

---
### Creating Class Component

```tsx
// import Component Class
import { Component } from 'vue-tsx';

// extend Abstract Component
export class Hello extends Component {

  // defined data
  private text = 'Hello World'

  // implement render method
  render() {
    return <div>
        <h1>{this.text}</h1>
        <input vModel={this.text} />
    </div>
  }
}
```

---
### Define Component Props

```tsx
import { Component } from 'vue-tsx';

// defined Props interface
interface Props {
  myText: string
}

// add Props Interface to Component Type Generics
export class Hello extends Component<{Props}> {

  // access Props using $attrs
  private text = this.$attrs.myText

  render() {
    return <h1>{this.text}</h1>
  }
}
```

---
### Use Component in TSX

```tsx
import { Vue } from 'vue-tsx';
import { Hello } from './components/Hello'

new Vue({
  el: document.getElementById('app'),

  render() {
    // insert Component
    return <Hello myText="Hallo Welt" />
  },
})
```

---
### Watch Methode

```tsx
import { Component, Watch } from 'vue-tsx';

export class Hello extends Component {

  // implement Watch using Decorator
  @Watch('text', { deep: true })
  myMethod(val: string, oldVal: string) {
    console.log('data Changed', val, oldVal)
  }

  private text = 'Hello World'

  render() {
    return <div>...</div>
  }
}
```

---
### Implement Router

```tsx
import { Vue, Router } from 'vue-tsx';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: View1,
    },
    {
      path: '/second',
      component: View2,
    },
  ],
})

Vue.use(Router)

new Vue({
  el: document.getElementById('app'),
  router,

  render(h) {
    return <div>
      <div>
        <RouterLink to="/">Home</RouterLink>
      </div>

      <div>
        <RouterLink to="/second">Second</RouterLink>
      </div>

      <hr />

      <RouterView />
    </div>
  },
})
```

# Compatibility

This repo is only compatible with:

- **Babel 7+**. For Babel 6 support, use [vuejs/babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)
- **Vue 2+**. JSX is not supported for older versions.

# Notes

Keep in mind that this project is currently beeing developed.
Expect bug and unexpected behavior. DONT USE THIS IN PRODUCTION.

Please feel free open a Issue if you encounter problems, have a feature request or questions about the future of this project.

Vue + TSX = ♥️

---

[more syntax information](https://github.com/vuejs/jsx#syntax)

[more directives information](https://github.com/vuejs/jsx/tree/dev/packages/babel-plugin-transform-vue-jsx#vue-directives)