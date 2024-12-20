import * as universal from '../entries/pages/editor/_project_/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/editor/_project_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/editor/[project]/+page.ts";
export const imports = ["_app/immutable/nodes/3.CsyL6KZv.js","_app/immutable/chunks/control.sEjVnBi_.js","_app/immutable/chunks/runtime.BbabJvLM.js","_app/immutable/chunks/utils.Ld0X06MT.js","_app/immutable/chunks/disclose-version.CMVJmgCU.js","_app/immutable/chunks/render.Dy3VoRHy.js","_app/immutable/chunks/index-client.Cls-ZtQZ.js","_app/immutable/chunks/store.Bcrh0o6h.js","_app/immutable/chunks/attributes.CmJ-IjgN.js","_app/immutable/chunks/legacy.llymPctR.js","_app/immutable/chunks/lifecycle.Dvpf1fQb.js","_app/immutable/chunks/snippet.mC5RdH35.js"];
export const stylesheets = ["_app/immutable/assets/3.Ajj3G4Zd.css"];
export const fonts = [];
