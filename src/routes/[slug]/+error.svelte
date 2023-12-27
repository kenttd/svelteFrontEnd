<script>
	import { page } from '$app/stores';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Search from './../home/seachResult.svelte';
	import Navbar from './../navbar.svelte';
	let userInput, searchResult;
	function search() {}
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex items-center space-x-4">
			<Skeleton class="h-20 w-20 rounded-full mt-4" />
			<div class="space-y-2">
				user not found
				<Skeleton class="h-4 w-[250px] my-4" />
				<Skeleton class="h-4 w-[200px] my-4" />
			</div>
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
