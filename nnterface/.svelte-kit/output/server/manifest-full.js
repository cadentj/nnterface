export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "nnterface/_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BFo0-yyp.js","app":"_app/immutable/entry/app.E0_5Oc2Q.js","imports":["_app/immutable/entry/start.BFo0-yyp.js","_app/immutable/chunks/entry.Ch9-XYfj.js","_app/immutable/chunks/runtime.BbabJvLM.js","_app/immutable/chunks/control.sEjVnBi_.js","_app/immutable/chunks/utils.Ld0X06MT.js","_app/immutable/entry/app.E0_5Oc2Q.js","_app/immutable/chunks/runtime.BbabJvLM.js","_app/immutable/chunks/render.Dy3VoRHy.js","_app/immutable/chunks/disclose-version.CMVJmgCU.js","_app/immutable/chunks/index-client.Cls-ZtQZ.js","_app/immutable/chunks/store.Bcrh0o6h.js","_app/immutable/chunks/utils.Ld0X06MT.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/editor/[project]",
				pattern: /^\/editor\/([^/]+?)\/?$/,
				params: [{"name":"project","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
