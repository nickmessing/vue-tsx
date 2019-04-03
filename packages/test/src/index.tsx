import { Component, VueTSX, Vue, Watch } from '@vue-tsx/vue'
import { Router, RouterLink, RouterView } from '@vue-tsx/vue-router'

type Props =
  | {
      a: number
      b: string
    }
  | { c: [number, string] }

interface Events {
  event1: string
  event2: number
}

class MyComponent extends Component<{
  props: Props
  events: Events
}> {
  text = 'test'
  counter = 1

  render(h: VueTSX.CreateElement) {
    return (
      <div>
        <input
          value={this.text}
          on={{
            input: ($event: any) => {
              this.text = $event.currentTarget.value
              this.$emit('event1', this.text)
              this.$emit('event2', ++this.counter)
            },
          }}
        />
        {this.text}
        <pre>{JSON.stringify(this.$attrs)}</pre>
        <a href="test">Hello</a>
      </div>
    )
  }
}

class SSComponent extends Component<{
  scopedSlots: {
    default?: [string, number?]
  }
}> {
  render(h: VueTSX.CreateElement) {
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default('a', 1)
    }
    return <div>No slot :(</div>
  }
}

class View1 extends Component {
  data = 'Something here'

  beforeCreate() {
    console.log('beforeCreate', this)
  }

  @Watch('data', { deep: true })
  myMethod(val: string, oldVal: string) {
    console.log('data Changed', val, oldVal)
  }

  render(h: VueTSX.CreateElement) {
    return (
      <div>
        {this.data}
        <br />
        <input vModel={this.data} />
        <br />
        Comp1:
        <MyComponent
          a={2}
          b="text"
          on={{
            event2: data => {
              console.log(data)
            },
          }}
        />
        Comp2:
        <MyComponent
          c={[3, 'alpha']}
          style={{
            color: 'red',
          }}
        />
        <hr />
        <SSComponent />
        <hr />
        <SSComponent
          scopedSlots={{
            default: (arg1, arg2) => <div>This is a scoped slot {JSON.stringify({ arg1, arg2 })}</div>,
          }}
        />
      </div>
    )
  }
}
class View2 extends Component {
  render(h: VueTSX.CreateElement) {
    return (
      <div>
        Second page :P
        <button on={{ click: () => this.$router.push('/') }}>Go Home</button>
      </div>
    )
  }
}

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
    return (
      <div>
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/second">Second</RouterLink>
          </li>
        </ul>
        <hr />
        <RouterView />
      </div>
    )
  },
})
