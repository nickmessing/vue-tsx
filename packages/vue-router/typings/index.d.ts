import { Component, VueTSX } from '@vue-tsx/vue'
import './vue'

type RComponent = typeof VueTSX.BaseComponent | Promise<typeof VueTSX.BaseComponent>;
type Dictionary<T> = { [key: string]: T };
type ErrorHandler = (err: Error) => void;

export type RouterMode = "hash" | "history" | "abstract";
export type RawLocation = string | Location;
export type RedirectOption = RawLocation | ((to: Route) => RawLocation);
export type NavigationGuard = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: Object) => any) | void) => void
) => any

export declare class Router {
  constructor (options?: RouterOptions);

  app: Object;
  mode: RouterMode;
  currentRoute: Route;

  beforeEach (guard: NavigationGuard): Function;
  beforeResolve (guard: NavigationGuard): Function;
  afterEach (hook: (to: Route, from: Route) => any): Function;
  push (location: RawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  replace (location: RawLocation, onComplete?: Function, onAbort?: ErrorHandler): void;
  go (n: number): void;
  back (): void;
  forward (): void;
  getMatchedComponents (to?: RawLocation | Route): RComponent[];
  onReady (cb: Function, errorCb?: ErrorHandler): void;
  onError (cb: ErrorHandler): void;
  addRoutes (routes: RouteConfig[]): void;
  resolve (to: RawLocation, current?: Route, append?: boolean): {
    location: Location;
    route: Route;
    href: string;
    // backwards compat
    normalizedTo: Location;
    resolved: Route;
  };
}

type Position = { x: number, y: number };
type PositionResult = Position | { selector: string, offset?: Position } | void;

export interface RouterOptions {
  routes?: RouteConfig[];
  mode?: RouterMode;
  fallback?: boolean;
  base?: string;
  linkActiveClass?: string;
  linkExactActiveClass?: string;
  parseQuery?: (query: string) => Object;
  stringifyQuery?: (query: Object) => string;
  scrollBehavior?: (
    to: Route,
    from: Route,
    savedPosition: Position | void
  ) => PositionResult | Promise<PositionResult>;
}

type RoutePropsFunction = (route: Route) => Object;

export interface PathToRegexpOptions {
  sensitive?: boolean;
  strict?: boolean;
  end?: boolean;
}

export interface RouteConfig {
  path: string;
  name?: string;
  component?: RComponent;
  components?: Dictionary<RComponent>;
  redirect?: RedirectOption;
  alias?: string | string[];
  children?: RouteConfig[];
  meta?: any;
  beforeEnter?: NavigationGuard;
  props?: boolean | Object | RoutePropsFunction;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
}

export interface RouteRecord {
  path: string;
  regex: RegExp;
  components: Dictionary<RComponent>;
  instances: Dictionary<Object>;
  name?: string;
  parent?: RouteRecord;
  redirect?: RedirectOption;
  matchAs?: string;
  meta: any;
  beforeEnter?: (
    route: Route,
    redirect: (location: RawLocation) => void,
    next: () => void
  ) => any;
  props: boolean | Object | RoutePropsFunction | Dictionary<boolean | Object | RoutePropsFunction>;
}

export interface Location {
  name?: string;
  path?: string;
  hash?: string;
  query?: Dictionary<string | string[]>;
  params?: Dictionary<string>;
  append?: boolean;
  replace?: boolean;
}

export interface Route {
  path: string;
  name?: string;
  hash: string;
  query: Dictionary<string | string[]>;
  params: Dictionary<string>;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: any;
}

/**
 * `<RouterLink>` is the component for enabling user navigation in a router-enabled app. The target location is specified with the `to` prop. It renders as an `<a>` tag with correct `href` by default, but can be configured with the `tag` prop. In addition, the link automatically gets an active CSS class when the target route is active.
 * `<RouterLink>` is preferred over hard-coded `<a href="...">` for the following reasons:
 * - It works the same way in both HTML5 history mode and hash mode, so if you ever decide to switch mode, or when the router falls back to hash mode in IE9, nothing needs to be changed.
 * - In HTML5 history mode, `RouterLink` will intercept the click event so that the browser doesn't try to reload the page.
 * - When you are using the `base` option in HTML5 history mode, you don't need to include it in `to` prop's URLs.
 */
export class RouterLink extends Component<{
  props: {
    /**
     * Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to `router.push()` internally, so the value can be either a string or a location descriptor object.
     */
    to: string | Location
    /**
     * Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record.
     */
    replace?: boolean
    /**
     * Setting `append` prop always appends the relative path to the current path. For example, assuming we are navigating from `/a` to a relative link `b`, without `append` we will end up at `/b`, but with `append` we will end up at `/a/b`.
     */
    append?: boolean
    /**
     * Sometimes we want `<RouterLink>` to render as another tag, e.g `<li>`. Then we can use `tag` prop to specify which tag to render to, and it will still listen to click events for navigation.
     */
    tag?: string
    /**
     * Configure the active CSS class applied when the link is active. Note the default value can also be configured globally via the `linkActiveClass` router constructor option.
     */
    'active-class'?: string
    /**
     * The default active class matching behavior is **inclusive match**. For example, `<RouterLink to="/a">` will get this class applied as long as the current path starts with `/a/` or is `/a`.
     * One consequence of this is that `<RouterLink to="/">` will be active for every route! To force the link into "exact match mode", use the `exact` prop:
     */
    exact?: boolean
    /**
     * Specify the event(s) that can trigger the link navigation.
     */
    event?: string | string[]
    /**
     * Configure the active CSS class applied when the link is active with exact match. Note the default value can also be configured globally via the `linkExactActiveClass` router constructor option.
     */
    'exact-active-class'?: string
  }
}> {
  render(h: VueTSX.CreateElement): VueTSX.VNode
}

/**
 * The `<RouterView>` component is a functional component that renders the matched component for the given path. Components rendered in `<RouterView>` can also contain its own `<RouterView>`, which will render components for nested paths.
 * Any non-name props will be passed along to the rendered component, however most of the time the per-route data is contained in the route's params.
 */
export class RouterView extends Component<{
  props: {
    /**
     * When a `<RouterView>` has a name, it will render the component with the corresponding name in the matched route record's `components` option. See [Named Views](../guide/essentials/named-views.md) for an example.
     */
    name?: string
  }
}> {
  render(h: VueTSX.CreateElement): VueTSX.VNode
}
