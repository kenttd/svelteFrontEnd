<script>
	import Profile from './profile.svelte';

	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Navbar from './../../navbar.svelte';
	import RightSide from './../../rightSide.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let user = data.data.user;
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex h-5">
			<Profile {user} />
		</div>
	</div>
	<Separator orientation="vertical" />
	<RightSide />
</div>
