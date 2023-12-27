<script>
	import { SvelteToast, toast } from '@zerodevx/svelte-toast/dist';
	import { onMount } from 'svelte';
	import { test } from '../helper';
	onMount(() => {
		const app = new SvelteToast({
			target: document.body,
			props: {}
		});
		toast.push('Hello world!');
	});
	let abc = test();
</script>

<button on:click={() => toast.push('hello world')}>click me</button>
<h1>{abc}</h1>
