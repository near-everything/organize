import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Main = lazy(() => import("../pages/Main"));
const ItemDeck = lazy(() => import("../pages/ItemDeck"));
const Item = lazy(() => import("../pages/Item"));
const RequestDeck = lazy(() => import("../pages/RequestDeck"));
const Request = lazy(() => import("../pages/Request"));
const Page404 = lazy(() => import("../pages/404"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/items",
    component: ItemDeck,
  },
  {
    path: "/item/:itemId",
    component: Item,
  },
  {
    path: "/requests",
    component: RequestDeck,
  },
  {
    path: "/request/:requestId",
    component: Request,
  },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
