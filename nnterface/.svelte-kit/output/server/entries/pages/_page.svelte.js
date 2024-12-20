import { Z as ensure_array_like, _ as head, $ as attr, W as escape_html, a0 as stringify } from "../../chunks/index.js";
function _page($$payload) {
  let items = [
    "new",
    "node-connections",
    "chat",
    "heatmap",
    "lens",
    "steering",
    "patching"
  ];
  const each_array = ensure_array_like(items);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>NNterface</title>`;
  });
  $$payload.out += `<div class="flex flex-col w-page h-[100vh] items-center justify-center"><ul class="text-center w-[20vw] z-10"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<li class="text-left my-2 w-full border rounded"><a${attr("href", `/editor/${stringify(item)}`)} class="block w-full h-full p-3 gradient-link relative svelte-aarkcj"><div class="absolute inset-0 gradient-overlay svelte-aarkcj"></div> <span class="relative z-10">${escape_html(item)}</span></a></li>`;
  }
  $$payload.out += `<!--]--></ul></div>`;
}
export {
  _page as default
};
