<script>
	import Profile from './profile.svelte';

	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';

	/** @type {import('./$types').PageData} */

	export let data;
	let user = data.data.user;
</script>

<Button on:click={toggleMode} variant="outline" size="icon">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
<div class="flex space-x-4 text-sm justify-evenly h-screen">
	<div class="justify-end">
		<div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Home</div>
		<div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Explore</div>
		<div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">
			Bookmark
		</div>
		<div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Profile</div>
	</div>
	<Separator orientation="vertical" />
	<div class="space-y-1">
		<div class="flex h-5">
			<Profile {user} />
		</div>
	</div>
	<Separator orientation="vertical" />
	<div class="space-y-1">
		<div class="flex h-5 items-center">Direct Messages</div>
	</div>
</div>
