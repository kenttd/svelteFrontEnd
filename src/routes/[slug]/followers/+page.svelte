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
	console.log('data', data.data.follower);
	let follower = data.data.follower;
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
				<Button variant="ghost" class="w-1/3" href="/{slug}/verified_followers"
					>Verified Followers</Button
				>
				<Button variant="ghost" class="w-1/3 underline decoration-indigo-500 underline-offset-8"
					>Followers</Button
				>
				<Button variant="ghost" class="w-1/3" href="/{slug}/following">Following</Button>
			</div>
			<hr />
			{#if follower != null}
				{#each follower as f}
					<div class="flex items-center my-3">
						<Avatar.Root class="me-2">
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<Button variant="link" href="/{f.follower.Username}" class=""
							>{f.follower.Username}</Button
						>
					</div>
				{/each}
				{#if follower.length == 0}
					no one follows this user
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
