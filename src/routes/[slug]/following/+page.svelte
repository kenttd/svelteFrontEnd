<script>
	import { page } from '$app/stores';
	import { error, redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import Navbar from './../../navbar.svelte';
	import RightSide from './../../rightSide.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	import * as Avatar from '$lib/components/ui/avatar';

	const { slug } = $page.params;
	onMount(() => {});
	export let data;
	console.log('data', data.data.following);
	let following = data.data.following;
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
				<Button variant="ghost" class="w-1/3" href="">Verified Followers</Button>
				<Button variant="ghost" class="w-1/3" href="/{slug}/followers">Followers</Button>
				<Button variant="ghost" class="w-1/3 underline decoration-indigo-500 underline-offset-8"
					>Following</Button
				>
			</div>
			<hr />
			{#if following != null}
				{#each following as f}
					<div class="flex items-center my-3">
						<Avatar.Root class="me-2">
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<Button variant="link" href="/{f.following.Username}" class=""
							>{f.following.Username}</Button
						>
					</div>
				{/each}
				{#if following.length == 0}
					this user doesnt follow anyone
				{/if}
			{:else}
				loading...
			{/if}
		</div>
	</div>
	<Separator orientation="vertical" />
	<RightSide />
</div>
<!-- hiiiii {slug} -->
