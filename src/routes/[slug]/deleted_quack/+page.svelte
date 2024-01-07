<script>
	import { getCookie } from '../../helper';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Navbar from '../../navbar.svelte';
	import RightSide from '../../rightSide.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
	import Tweets from './Tweets.svelte';
	import Error from './+error.svelte';
	const { slug } = $page.params;

	let role,
		posts,
		allowed = true;
	onMount(() => {
		role = getCookie('isVerified') == true || getCookie('isStaff') == true ? 'verified' : 'not';
		getDeletedPost();
	});
	async function getDeletedPost() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/getDeletedTweet/' + slug + '/' + role,
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				console.log(jsonData);
				posts = jsonData.posts;
			} else {
				allowed = false;
				console.error('Error a:', response.statusText);
				if (response.status == 403) {
					console.log('success');
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

{#if allowed}
	<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
		<Navbar />
		<Separator orientation="vertical" />
		<div class="space-y-1 w-1/2">
			<div class="flex items-center mb-2">
				<Button variant="ghost" on:click={() => (window.location.href = '/' + slug)}
					><ArrowLeft /></Button
				>

				<p class="text-xl">{slug}'s deleted quack</p>
			</div>
			{#if posts != null}
				{#each posts as post}
					<Tweets {post} />
				{/each}
			{:else}
				loading...
			{/if}
			<div class="flex h-4/6"></div>
		</div>
		<Separator orientation="vertical" />
		<RightSide />
	</div>
{:else}
	<Error />
{/if}
