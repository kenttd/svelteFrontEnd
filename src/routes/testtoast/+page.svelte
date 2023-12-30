<script>
	// import { SvelteToast, toast } from '@zerodevx/svelte-toast/dist';
	// import { onMount } from 'svelte';
	// import { test } from '../helper';
	// onMount(() => {
	// 	const app = new SvelteToast({
	// 		target: document.body,
	// 		props: {}
	// 	});
	// 	toast.push('Hello world!');
	// });
	// let abc = test();
	import { Toaster, toast } from 'svelte-sonner';
</script>

<!-- <button on:click={() => toast.push('hello world')}>click me</button>
<h1>{abc}</h1> -->

<Toaster richColors />
<button on:click={() => toast.success('My first toast')}> Give me a toast </button>
