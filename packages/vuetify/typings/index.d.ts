import { Component, VueTSX } from '@vue-tsx/vue'
import { RawLocation } from '@vue-tsx/vue-router'

export namespace Vuetify {
  type Message = string | string[]
  type Size = number | string
  type RuleValidations<Value> = (RuleValidator<Value> | string)[]
  type RuleValidator<Value> = (value: Value) => string | false
  type PerPage = (number | { text: string; value: number })[]
  type CSSOrElement = string | HTMLElement
  type PropertyParser<Item, Result> = string | (string | number)[] | ((item: Item, fallback?: Result) => Result)

  type PositionableKeys = 'absolute' | 'bottom' | 'fixed' | 'left' | 'right' | 'top'

  type Base = {
    props: any
    events: any
    scopedSlots: any
  }
  type Empty = {
    props: {}
    events: {}
    scopedSlots: {}
  }
  type Mix<
    M1 extends Base = Empty,
    M2 extends Base = Empty,
    M3 extends Base = Empty,
    M4 extends Base = Empty,
    M5 extends Base = Empty,
    M6 extends Base = Empty
  > = {
    props: M1['props'] & M2['props'] & M3['props'] & M4['props'] & M5['props'] & M6['props']
    events: M1['events'] & M2['events'] & M3['events'] & M4['events'] & M5['events'] & M6['events']
    scopedSlots: M1['scopedSlots'] &
      M2['scopedSlots'] &
      M3['scopedSlots'] &
      M4['scopedSlots'] &
      M5['scopedSlots'] &
      M6['scopedSlots']
  }

  namespace Mixins {
    type Applicationable = Mix<
      Positionable<'absolute' | 'fixed'>,
      {
        props: {
          /**
           * Designates the component as part of the application layout.
           * Used for dynamically adjusting content sizing
           *
           * Default: `false`
           */
          app?: boolean
        }
        events: {}
        scopedSlots: {}
      }
    >
    type BaseItemGroup = Mix<
      Proxyable,
      Themeable,
      {
        props: {
          /**
           * The class used when item is active
           *
           * Default: `'v-item--active'`
           */
          activeClass?: string
          /**
           * Specifies that a value must be present or the first available will be selected
           *
           * Default: `false`
           */
          mandatory?: boolean
          /**
           * Default: `null`
           */
          max?: Size
          /**
           * Allow multiple selections. **value** prop accepts array
           *
           * Default: `false`
           */
          multiple?: boolean
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Bootable = Mix<
      Toggleable,
      {
        props: {
          /**
           * Conditionally renders content on mounted. Will only render content if activated
           *
           * Default: `false`
           */
          lazy?: boolean
        }
        events: {}
        scopedSlots: {}
      }
    >
    type ButtonGroup = Mix<
      BaseItemGroup,
      {
        props: {
          /**
           * The class used when button is active
           *
           * Default: `'v-btn--active'`
           */
          activeClass?: string
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Colorable = {
      props: {
        /**
         * Applies specified color to the control - it can be the name of material color
         * (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`)
         *
         * Default: `undefined`
         */
        color?: string
      }
      events: {}
      scopedSlots: {}
    }
    type Comparable = {
      props: {
        /**
         * Comparator function
         *
         * Default: `deepEqual`
         */
        valueComparator?: <T>(a: T, b: T) => boolean
      }
      events: {}
      scopedSlots: {}
    }
    type DataIterable<Item, Search = string> = Mix<
      Filterable,
      Loadable,
      Themeable,
      {
        props: {
          /**
           * Designates the table as containing rows that are expandable
           *
           * Default: `false`
           */
          expand?: boolean
          /**
           * Hide the table actions
           *
           * Default: `false`
           */
          hideActions?: boolean
          /**
           * Disable default sorting on initial render
           *
           * Default: `false`
           */
          disableInitialSort?: boolean
          /**
           * Forces at least one column to always be sorted instead of toggling between
           * **sorted ascending** / **sorted descending** / **unsorted** states
           *
           * Default: `false`
           */
          mustSort?: boolean
          /**
           * Display text when there are no filtered results
           *
           * Default: `'$vuetify.dataIterator.noResultsText'`
           */
          noResultsText?: string
          /**
           * The displayed icon for forcing pagination to the next page
           *
           * Default: `'$vuetify.icons.next'`
           */
          nextIcon?: string
          /**
           * The displayed icon for forcing pagination to the previous page
           *
           * Default: `'$vuetify.icons.prev'`
           */
          prevIcon?: string
          /**
           * The default values for the rows-per-page dropdown
           *
           * Default: `[5, 10, 25, { text: '$vuetify.dataIterator.rowsPerPageAll', value : -1}]`
           */
          rowsPerPageItems?: PerPage
          /**
           * The default rows per page text
           *
           * Default: `'$vuetify.dataIterator.rowsPerPageText'`
           */
          rowsPerPageText?: string
          /**
           * Adds header row select all checkbox. Can either be a String which specifies which color
           * is applied to the button, or a Boolean (which uses the default color)
           *
           * Default: `false`
           */
          selectAll?: boolean | string
          /**
           * The search model for filtering results
           *
           * Default: `undefined`
           */
          search?: Search
          /**
           * The function used for filtering items
           *
           * Default:
           * ```js
           * (val, search) => {
           *   return val != null &&
           *     typeof val !== 'boolean' &&
           *     val.toString().toLowerCase().indexOf(search) !== -1
           * }
           */
          filter?: (val: Item, search: Search) => boolean
          /**
           * Custom search filter
           *
           * Default:
           * ```js
           * (items, search, filter) => {
           *   search = search.toString().toLowerCase()
           *   if (search.trim() === '') return items
           *
           *   return items.filter(i => (
           *     Object.keys(i).some(j => filter(i[j], search))
           *   ))
           * }
           * ```
           */
          customFilter?: (items: Item[], search: Search, filter: (val: Item, search: Search) => boolean) => Item[]
          /**
           * Custom sort filter
           *
           * Default:
           * ```js
           * (items, index, isDescending) => {
           *   if (index === null) return items
           *
           *   return items.sort((a, b) => {
           *     let sortA = getObjectValueByPath(a, index)
           *     let sortB = getObjectValueByPath(b, index)
           *
           *     if (isDescending) {
           *       [sortA, sortB] = [sortB, sortA]
           *     }
           *
           *     // Check if both are numbers
           *     if (!isNaN(sortA) && !isNaN(sortB)) {
           *       return sortA - sortB
           *     }
           *
           *     // Check if both cannot be evaluated
           *     if (sortA === null && sortB === null) {
           *       return 0
           *     }
           *
           *     [sortA, sortB] = [sortA, sortB]
           *       .map(s => (
           *         (s || '').toString().toLocaleLowerCase()
           *       ))
           *
           *     if (sortA > sortB) return 1
           *     if (sortA < sortB) return -1
           *
           *     return 0
           *   })
           * }
           * ```
           */
          customSort?: (items: Item[], index: string, isDescending: boolean) => Item[]
          /**
           * Selected row items
           *
           * Default: `[]`
           */
          value?: Item[]
          /**
           * The array of table rows
           *
           * Default: `[]`
           */
          items?: Item[]
          /**
           * Manually sets total number of row items, which disables built-in sort and pagination.
           * Used together with pagination prop to enable server-side sort and pagination
           *
           * Default: `undefined`
           */
          totalItems?: number
          /**
           * The field in the item object that designates a unique key
           *
           * Default: `'id'`
           */
          itemKey?: string
          /**
           * Used to control pagination and sorting from outside the data table.
           * Can also be used to set default sorted column
           *
           * Default:
           * ```js
           * {
           *   descending: false,
           *   page: 1,
           *   rowsPerPage: 5, // -1 for all
           *   sortBy: null,
           *   totalItems: 0
           * }
           * ```
           */
          pagination?: {
            descending?: boolean
            page?: number
            rowsPerPage?: number
            sortBy?: string
            totalItems?: number
          }
        }
        events: {
          /**
           * The updated bound model
           */
          input: Item[]
          /**
           * The `pagination.sync` update event
           */
          'update:pagination': {
            descending: boolean
            page: number
            rowsPerPage: number
            sortBy: string
            totalItems: number
          }
        }
        scopedSlots: {
          /**
           * Slot to put custom elements after the actions in the footer.
           */
          'actions-append'?: []
          /**
           * Slot to put custom elements before the actions in the footer.
           */
          'actions-prepend'?: []
          /**
           * Slot to specify an extra footer.
           */
          footer?: []
          /**
           * Displayed when there are no items (takes precedence over `no-results`)
           */
          noData?: []
          /**
           * Displayed when there are no filtered items
           */
          noResults?: []
          /**
           * Slot to specify how items are rendered
           */
          items?: [
            {
              item: Item
              index: number
              selected: boolean
              expanded: boolean
            }
          ]
          /**
           * Slot to customize the page text region of the pagination controls.
           */
          pageText?: [
            {
              pageStart: number
              pageStop: number
              itemsLength: number
            }
          ]
        }
      }
    >
    type Delayable = {
      props: {
        /**
         * Milliseconds to wait before opening component
         *
         * Default: `0`
         */
        openDelay?: number
        /**
         * Milliseconds to wait before closing component
         *
         * Default: `0`
         */
        closeDelay?: number
      }
      events: {}
      scopedSlots: {}
    }
    type Dependent = {
      props: {}
      events: {}
      scopedSlots: {}
    }
    type Detachable = Mix<
      Bootable,
      {
        props: {
          /**
           * Specifies which DOM element that this component should detach to.
           * Use either a CSS selector string or an object reference to the element.
           *
           * Default: `undefined`
           */
          attach?: CSSOrElement
          /**
           * Applies a custom class to the detached element.
           * This is useful because the content is moved to the end of the app and is not targettable by
           * classes passed directly on the component.
           *
           * Default: `''`
           */
          contentClass?: string
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Elevatable = {
      props: {
        /**
         * Designates an elevation between 0 and 24
         *
         * Default: `undefined`
         */
        elevation?: number | string
      }
      events: {}
      scopedSlots: {}
    }
    type Filterable = {
      props: {
        /**
         * Display text when there is no data
         *
         * Default: `'$vuetify.noDataText'`
         */
        noDataText?: string
      }
      events: {}
      scopedSlots: {
        /**
         * Displayed when there are no filtered items
         */
        noData?: []
      }
    }
    type Groupable = {
      props: {
        /**
         * The class used when item is active
         *
         * Default: `undefined`
         */
        activeClass?: string
        /**
         * Disables the item from changing value from the toggle method
         *
         * Default: `false`
         */
        disabled?: boolean
      }
      events: {}
      scopedSlots: {}
    }
    type Loadable = {
      props: {
        /**
         * Displays linear progress bar. Can either be a String which specifies which color is applied to the
         * progress bar (any materia color or theme color - **primary**, **secondary**, **success**, **info**,
         * **warning**, **error**) or a Boolean which uses the component **color** (set by color prop - if it's
         * supported by the component) or the primary color
         *
         * Default: `false`
         */
        loading?: boolean | string
      }
      events: {}
      scopedSlots: {}
    }
    type Maskable<Value> = {
      props: {
        /**
         * Disables the automatic character display when typing
         *
         * Default: `false`
         */
        dontFillMaskBlanks?: boolean
        /**
         * Apply a custom character mask to the input.
         * See mask table below for more information.
         * https://vuetifyjs.com/en/components/text-fields
         *
         * Default: `undefined`
         */
        mask?: string
        /**
         * Returns the unmodified masked string
         *
         * Default: `undefined`
         */
        returnMaskedValue?: boolean
        /**
         * Returns the unmodified masked string
         *
         * Default: `undefined`
         */
        value?: Value
      }
      events: {}
      scopedSlots: {}
    }
    type Measurable = {
      props: {
        /**
         * Sets the component height
         *
         * Default: `undefined`
         */
        height?: Size
        /**
         * Sets the maximum height for the content
         *
         * Default: `undefined`
         */
        maxHeight?: Size
        /**
         * Sets the maximum width for the content
         *
         * Default: `undefined`
         */
        maxWidth?: Size
        /**
         * Sets the minimum height for the content
         *
         * Default: `undefined`
         */
        minHeight?: Size
        /**
         * Sets the minimum width for the content
         *
         * Default: `undefined`
         */
        minWidth?: Size
        /**
         * Sets the component width
         *
         * Default: `undefined`
         */
        width?: Size
      }
      events: {}
      scopedSlots: {}
    }
    type Menuable = Mix<
      Positionable,
      Stackable,
      Themeable,
      {
        props: {
          /**
           * Designate a custom activator when the activator slot is not used.
           * String can be any valid querySelector and Object can be any valid Node
           *
           * Default: `null`
           */
          activator?: CSSOrElement
          /**
           * Removes overflow re-positioning for the content
           *
           * Default: `false`
           */
          allowOverflow?: boolean
          /**
           * Sets a new activator target for the detached element.
           * Use when placing detachable items in `VInput` slots
           *
           * Default: `false`
           */
          inputActivator?: boolean
          /**
           * Sets the maximum width for the content
           *
           * Default: `'auto'`
           */
          maxWidth?: Size
          /**
           * Sets the minimum width for the content
           *
           * Default: `undefined`
           */
          minWidth: Size
          /**
           * Nudge the content to the bottom
           *
           * Default: `0`
           */
          nudgeBottom?: Size
          /**
           * Nudge the content to the left
           *
           * Default: `0`
           */
          nudgeLeft?: Size
          /**
           * Nudge the content to the right
           *
           * Default: `0`
           */
          nudgeRight?: Size
          /**
           * Nudge the content to the top
           *
           * Default: `0`
           */
          nudgeTop?: Size
          /**
           * Nudge the content width
           *
           * Default: `0`
           */
          nudgeWidth?: Size
          /**
           * Causes the component to flip to the opposite side when repositioned due to overflow
           *
           * Default: `false`
           */
          offsetOverflow?: boolean
          /**
           * Used to position the content when not using an activator slot
           *
           * Default: `null`
           */
          positionX?: number
          /**
           * Used to position the content when not using an activator slot
           *
           * Default: `null`
           */
          positionY?: number
          /**
           * The z-index used for the component
           *
           * Default: `null`
           */
          zIndex?: number
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Overlayable = Mix<
      Toggleable,
      Stackable,
      {
        props: {
          /**
           * Hides the display of the overlay
           *
           * Default: `false`
           */
          hideOverlay?: boolean
        }
        events: {}
        scopedSlots: {}
      }
    >
    type PickerButton = Mix<
      Colorable,
      {
        props: {}
        events: {}
        scopedSlots: {}
      }
    >
    type Picker = Mix<
      Colorable,
      Themeable,
      {
        props: {
          /**
           * Forces 100% width
           *
           * Default: `false`
           */
          fullWidth?: boolean
          /**
           * Defines the header color. If not specified it will use the color defined by `color` prop or
           * the default picker color
           *
           * Default: `undefined`
           */
          headerColor?: string
          /**
           * Orients picker horizontal
           *
           * Default: `false`
           */
          landscape?: boolean
          /**
           * Hide the picker title
           *
           * Default: `false`
           */
          noTitle?: boolean
          /**
           * The width of the content
           *
           * Default: `290`
           */
          width?: Size
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Positionable<T extends PositionableKeys = PositionableKeys> = {
      props: { [key in T]?: boolean }
      events: {}
      scopedSlots: {}
    }
    type Proxyable<T = any> = {
      props: {
        value?: T
      }
      events: {
        change: T
      }
      scopedSlots: {}
    }
    type Registrable = {
      props: {}
      events: {}
      scopedSlots: {}
    }
    type Returnable<Value> = {
      props: {
        returnValue?: Value
      }
      events: {
        'update:returnValue': Value
      }
      scopedSlots: {}
    }
    type Rippleable = {
      props: {
        /**
         * Applies the `vRipple` directive
         *
         * Default: `false`
         */
        ripple?: boolean
      }
      events: {}
      scopedSlots: {}
    }
    type Routable = Mix<
      Rippleable,
      {
        props: {
          /**
           * Class bound when component is active. **warning** Depending upon the component,
           * this could cause side effects. If you need to add a custom class on top of a default,
           * just do `activeClass=\"default-class your-class\"`
           *
           * Default `undefined`
           */
          activeClass?: string
          /**
           * Vue Router `<RouterLink />` prop
           *
           * Default `false`
           */
          append?: boolean
          /**
           * Route item is disabled
           *
           * Default `false`
           */
          disabled?: boolean
          /**
           * Exactly match the link. Without this, '/' will match every route
           *
           * Default `false`
           */
          exact?: boolean
          /**
           * Vue Router `<RouterLink />` prop
           *
           * Default `undefined`
           */
          exactActiveClass?: string
          /**
           * Will designate the component tag to `<a>`
           *
           * Default `undefined`
           */
          href?: string
          /**
           * Will designate the component tag to `<RouterLink />`
           *
           * Default `undefined`
           */
          to?: RawLocation
          /**
           * Specifies the link is a nuxt-link
           *
           * Default `false`
           */
          nuxt?: boolean
          /**
           * Vue Router `<RouterLink />` prop
           *
           * Default `false`
           */
          replace?: boolean
          /**
           * Specify a custom tag to use on the component
           *
           * Default `undefined`
           */
          tag?: string
          /**
           * Specify the target attribute
           *
           * Default `undefined`
           */
          target?: string
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Selectable<Value, TrueValue, FalseValue> = Mix<
      ComponentsDecriptors.VInput,
      Rippleable,
      Comparable,
      Colorable,
      {
        props: {
          /**
           * Sets the DOM id on the component
           *
           * Default: `undefined`
           */
          id?: string
          inputValue?: Value
          falseValue?: FalseValue
          trueValue?: TrueValue
          multiple?: boolean
          label?: string
        }
        events: {}
        scopedSlots: {}
      }
    >
    type Sizeable = {
      props: {
        /**
         * Makes the icon large **(36px)**
         *
         * Default: `false`
         */
        large?: boolean
        /**
         * Makes the icon medium **(28px)**
         *
         * Default: `false`
         */
        medium?: boolean
        /**
         * Makes the icon small **(16px)**
         *
         * Default: `false`
         */
        small?: boolean
        /**
         * Makes the icon extra large **(40px)**
         *
         * Default: `false`
         */
        xLarge?: boolean
        /**
         * Specifies a custom font size for the icon
         *
         * Default: `undefined`
         */
        size?: Size
      }
      events: {}
      scopedSlots: {}
    }
    type Stackable = {
      props: {}
      events: {}
      scopedSlots: {}
    }
    type Themeable = {
      props: {
        /**
         * Applies the dark theme variant
         *
         * Default: `undefined`
         */
        dark?: boolean
        /**
         * Applies the light theme variant
         *
         * Default: `undefined`
         */
        light?: boolean
      }
      events: {}
      scopedSlots: {}
    }
    type Toggleable = {
      props: {
        /**
         * Controls visibility
         *
         * Default: `undefined`
         */
        value?: boolean
      }
      events: {
        input: boolean
      }
      scopedSlots: {}
    }
    type Transitionable = {
      props: {
        /**
         * Sets the transition mode (does not apply to transition-group) vue docs
         *
         * Default: `undefined`
         */
        mode?: string
        /**
         * Sets the transition origin
         *
         * Default: `undefined`
         */
        origin?: string
        /**
         * Sets the component transition. Can be one of the built in transitions or your own.
         *
         * Default: `undefined`
         */
        transition?: string
      }
      events: {}
      scopedSlots: {}
    }
    type Validatable<Value> = {
      props: {
        /**
         * Disable the input
         *
         * Default: `false`
         */
        disabled?: boolean
        /**
         * Puts the input in a manual error state
         *
         * Default: `false`
         */
        error?: boolean
        /**
         * The total number of errors that should display at once
         *
         * Default: `1`
         */
        errorCount?: number
        /**
         * Puts the input in an error state and passes through custom error messsages.
         * Will be combined with any validations that occur from the **rules** prop.
         * This field will not trigger validation
         *
         * Default: `[]`
         */
        errorMessages?: Message
        /**
         * Displays a list of messages or message if using a string
         *
         * Default: `[]`
         */
        messages?: Message
        /**
         * Puts input in readonly state
         *
         * Default: `false`
         */
        readonly?: boolean
        /**
         * Accepts an array of functions that return either False or a String with an error message
         *
         * Default: `[]`
         */
        rules?: RuleValidations<Value>
        /**
         * Puts the input in a manual success state
         *
         * Default: `false`
         */
        success?: boolean
        /**
         * Puts the input in a success state and passes through custom success messsages.
         *
         * Default: `[]`
         */
        successMessages?: Message
        /**
         * Delays validation until blur event
         *
         * Default: `false`
         */
        validateOnBlur?: boolean
        /**
         * Value
         */
        value?: Value
      }
      events: {
        /**
         * The `error.sync` event
         */
        'update:error': boolean
      }
      scopedSlots: {}
    }
  }
  namespace ComponentsDecriptors {
    type VAAA = Mix<
      Mixins.Colorable,
      {
        props: {}
        events: {}
        scopedSlots: {}
      }
    >
    type VAlert = Mix<
      Mixins.Colorable,
      Mixins.Toggleable,
      Mixins.Transitionable,
      {
        props: {
          dismissible?: boolean
          icon?: string
          outline?: boolean
          type?: 'info' | 'error' | 'success' | 'warning'
        }
        events: {
          input: boolean
        }
        scopedSlots: {}
      }
    >
    type VApp = Mix<
      Mixins.Themeable,
      {
        props: {
          id?: string
        }
        events: {}
        scopedSlots: {}
      }
    >
    type VAutocomplete<Item> = Mix<
      VSelect<Item>,
      {
        props: {}
        events: {}
        scopedSlots: {}
      }
    >
    type VInput = Mix<
      Mixins.Colorable,
      Mixins.Themeable,
      Mixins.Validatable<string>,
      Mixins.Loadable,
      {
        props: {
          /**
           * Appends an icon to the component, uses the same syntax as `VIcon`
           *
           * Default: `undefined`
           */
          appendIcon?: string
          /**
           * Changes the background-color of the input
           *
           * Default: `''`
           */
          backgroundColor?: string
          /**
           * Hides hint, validation errors
           *
           * Default: `false`
           */
          hideDetails?: boolean
          /**
           * Hint text
           *
           * Default: `undefined`
           */
          hint?: string
          /**
           * Sets input label
           *
           * Default: `undefined`
           */
          label?: string
          /**
           * Forces hint to always be visible
           *
           * Default: `false`
           */
          persistentHint?: boolean
          /**
           * Sets the input's placeholder text
           *
           * Default: `undefined`
           */
          placeholder?: string
          /**
           * Prepends an icon to the component, uses the same syntax as `VIcon`
           *
           * Default: `undefined`
           */
          prependIcon?: string
          /**
           * Designates the input as required; Adds an asertisk to the end of the label;
           * Does not perform any validation.
           *
           * Default: `false`
           */
          required?: boolean
          /**
           * Tabindex of input
           *
           * Default: `undefined`
           */
          tabindex?: number
          /**
           * Array of key codes that will toggle the input (if it supports toggling)
           *
           * Default: `[]`
           */
          toggleKeys?: number[]
          /**
           * Input value
           *
           * Default: `undefined`
           */
          value?: string
        }
        events: {
          /**
           * Emitted when the input is blurred
           */
          blur: VueTSX.FocusEvent<HTMLElement>
          /**
           * Emitted when the input is changed by user interaction
           */
          change: string
          /**
           * Emitted when appended icon is clicked
           */
          'click:append': VueTSX.MouseEvent<HTMLElement>
          /**
           * Emitted when prepended icon is clicked
           */
          'click:prepend': VueTSX.MouseEvent<HTMLElement>
        }
        scopedSlots: {
          /**
           * Adds an item after input content
           */
          append?: []
          /**
           * Adds an item before input content
           */
          prepend?: []
        }
      }
    >
    type VSelect<Item> = Mix<
      VTextField,
      Mixins.Comparable,
      Mixins.Filterable,
      Mixins.Detachable,
      {
        props: {
          cacheItems?: boolean
          chips?: boolean
          deletableChips?: boolean
          dense?: boolean
          hideSelected?: boolean
          items?: Item[]
          itemAvatar?: PropertyParser<Item, boolean>
          itemDisabled?: PropertyParser<Item, boolean>
          itemText?: PropertyParser<Item, string>
          itemValue?: PropertyParser<Item, string>
          menuProps?: string | any[] | Object
          multiple?: boolean
          openOnClear?: boolean
          searchInput?: string
          smallChips?: boolean
          returnObject?: boolean
        }
        events: {
          blur: undefined
          focus: undefined
          change: Item | string
        }
        scopedSlots: {
          item?: [
            {
              parent: any
              item: Item
              tile: any
            }
          ]
          selection?: [
            {
              parent: any
              item: Item
              index: number
              selected: boolean
              disabled: boolean
            }
          ]
        }
      }
    >
    type VSelectList<Item> = Mix<
      Mixins.Colorable,
      Mixins.Themeable,
      {
        props: {
          action?: boolean
          dense?: boolean
          hideSelected?: boolean
          items?: Item[]
          itemAvatar?: PropertyParser<Item, boolean>
          itemDisabled?: PropertyParser<Item, boolean>
          itemText?: PropertyParser<Item, string>
          itemValue?: PropertyParser<Item, string>
          noDataText?: string
          noFilter?: boolean
          searchInput?: string
          selectedItems?: Item[]
        }
        events: {
          select: Item
        }
        scopedSlots: {
          item?: [
            {
              parent: any
              item: Item
              tile: any
            }
          ]
        }
      }
    >
    type VTextField = Mix<
      VInput,
      Mixins.Maskable<string>,
      Mixins.Loadable,
      {
        props: {
          appendOuterIcon?: string
          autofocus?: boolean
          box?: boolean
          browserAutocomplete?: string
          clearable?: boolean
          clearIcon?: string
          color?: string
          counter?: boolean | number | string
          flat?: boolean
          fullWidth?: boolean
          label?: string
          outline?: boolean
          placeholder?: string
          prefix?: string
          prependInnerIcon?: string
          reverse?: boolean
          singleLine?: boolean
          solo?: boolean
          soloInverted?: boolean
          suffix?: string
          type?: string
        }
        events: {
          change: string
          'click:append': VueTSX.MouseEvent<HTMLElement>
          'click:append-outer': VueTSX.MouseEvent<HTMLElement>
          'click:clear': VueTSX.MouseEvent<HTMLElement>
          'click:prepend': VueTSX.MouseEvent<HTMLElement>
          'click:prepend-inner': VueTSX.MouseEvent<HTMLElement>
          'update:error': any
        }
        scopedSlots: {
          append: []
          'append-outer': []
          prepend: []
          'prepend-inner': []
        }
      }
    >
  }
  namespace Components {
    class VInput extends Component<ComponentsDecriptors.VInput> {}
  }
}

export const VInput: typeof Vuetify.Components.VInput
