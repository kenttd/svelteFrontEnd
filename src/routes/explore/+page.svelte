<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import Navbar from './../navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { getCookie, deleteCookie } from '../helper';
	import RightSide from './../rightSide.svelte';

	let searchResult, userInput;
	const url = $page.url;
	const hasVal = url.searchParams.has('q');
	const val = url.searchParams.get('q');
	let input;
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex">
			<Input bind:value={input} placeholder="search" class="" />
			<Button href={'/explore?q=' + input} class="ms-5">Search</Button>
		</div>
		<div>
			{#if hasVal}
				{val}
			{/if}
		</div>
	</div>

	<Separator orientation="vertical" />
	<RightSide />
</div>
