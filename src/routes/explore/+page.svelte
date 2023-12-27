<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import Search from './../home/seachResult.svelte';
	import Navbar from './../navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { getCookie, deleteCookie } from '../helper';
	let searchResult, userInput;
	const url = $page.url;
	const hasVal = url.searchParams.has('q');
	const val = url.searchParams.get('q');
	let input;
	function search() {}
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
	<div class="flex space-y-1 w-1/4 flex-col">
		<div class="flex-1">
			<Input
				on:input={() => search()}
				type="search"
				placeholder="search"
				class="max-w-xs"
				bind:value={userInput}
			/>
			<div>
				{#if searchResult != null}
					{#each searchResult as search}
						<Search {search} />
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex-1 justify-between">
			<div class="flex h-5 items-center">Direct Messages</div>
		</div>
	</div>
</div>
