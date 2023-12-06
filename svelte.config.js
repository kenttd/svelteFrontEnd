import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
// import adapter from '@sveltejs/adapter-dynamic';
// was "@sveltejs/adapter-auto"

// const dev = 'production' === 'development';

// /** @type {import(""@sveltejs/kit").Config} */
// const config = {
// 	kit: {
// 		adapter: adapter({
// 			pages: 'docs',
// 			assets: 'docs'
// 		}),
// 		// paths: {
// 		// 	// change below to your repo name
// 		// 	base: dev ? '' : '/svelteFrontEnd'
// 		// }
// 		// hydrate the <div id="svelte"> element in src/app.html
// 	},

// 	preprocess: [vitePreprocess({})]
// };

// import adapter from '@sveltejs/adapter-node';
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     adapter: adapter(),
//     prerender: {
//       enabled: false,
//       entries: ['*'],
//     },
//     // ...other options...
//   },
// };
// export default config;
