<script>
	import { page } from '$app/stores';
	import { error, redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Navbar from './../../navbar.svelte';
	import RightSide from './../../rightSide.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	const { slug } = $page.params;
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="h-5">
			<div class="flex items-center">
				<Button variant="ghost" href="/{slug}"><ArrowLeft /></Button>
				<span class="text-lg underline underline-offset-4">{slug}</span>
			</div>
			<div class="flex">
				<Button variant="ghost" class="w-1/3">Verified Followers</Button>
				<Button variant="ghost" class="w-1/3">Followers</Button>
				<Button variant="ghost" class="w-1/3 underline decoration-indigo-500 underline-offset-8"
					>Following</Button
				>
			</div>
			<hr />
			This user doesn't exist.
		</div>
	</div>
	<Separator orientation="vertical" />
	<RightSide />
</div>
