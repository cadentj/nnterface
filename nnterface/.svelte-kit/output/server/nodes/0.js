

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DgeP8_wd.js","_app/immutable/chunks/disclose-version.CMVJmgCU.js","_app/immutable/chunks/runtime.BbabJvLM.js","_app/immutable/chunks/snippet.mC5RdH35.js"];
export const stylesheets = ["_app/immutable/assets/0.B6RamJLR.css"];
export const fonts = [];
