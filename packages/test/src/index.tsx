import { Component, Vue, Mount, Watch } from '@vue-tsx/vue'

type Props =
  | {
      a: number
      b: string
    }
  | { c: [number, string] }

interface Events {
  event1: string
  event2?: number
  event3: void
}

class MyComponent extends Component<{
  props: Props
  events: Events
}> {
  text = 'test'

  render(h: Vue.CreateElement) {
    return (
      <div>
        <input
          value={this.text}
          on={{
            input: ($event: any) => {
              this.text = $event.currentTarget.value
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

class Cmp extends Component {
  data = 'Something here'

  beforeCreate() {
    console.log(this)
  }

  @Watch('data', {deep: true})
  myMethod(val: string, oldVal: string) {
    console.log('data Changed', val, oldVal)
  }

  render(h: Vue.CreateElement) {
    return (
      <div>
        {this.data}
        <br />
        <input
          value={this.data}
          on={{
            input: $event => {
              this.data = $event.currentTarget.value
            },
          }}
        />
        <br/>
        Comp1:
        <MyComponent a={2} b="text" />
        Comp2:
        <MyComponent
          c={[3, 'alpha']}
          style={{
            color: 'red',
          }}
        />
      </div>
    )
  }
}

new Mount({
  el: document.getElementById('app'),
  render(h) {
    return <Cmp />
  },
})
