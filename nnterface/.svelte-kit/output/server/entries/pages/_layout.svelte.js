import { T as bind_props, S as pop, Q as push } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  const prerender = true;
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { prerender });
  pop();
}
export {
  _layout as default
};
