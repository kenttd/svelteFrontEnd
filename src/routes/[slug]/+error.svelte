<script>
	import { page } from '$app/stores';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Navbar from './../navbar.svelte';
	import RightSide from './../rightSide.svelte';
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
	<RightSide />
</div>
