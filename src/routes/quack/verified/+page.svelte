<script>
	import { getCookie } from '../../helper';
	import Error403 from './403.svelte';
	import { onMount } from 'svelte';
	import Navbar from '../../navbar.svelte';
	import RightSide from '../../rightSide.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Tweets from './../../home/Tweets.svelte';
	let role,
		error = false,
		posts;
	let username = '';
	onMount(() => {
		role = getCookie('isVerified') == true || getCookie('isStaff') == true ? 'verified' : 'not';
		username = getCookie('username');

		// role = 'npt';
		getVerifiedPost();
	});
	async function getVerifiedPost() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/getVerifiedPost/' +
					getCookie('uid') +
					'/' +
					role,
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				console.log(jsonData);
				posts = jsonData.posts;
				console.log(posts);
			} else {
				console.error('Error a:', response.statusText);
				if (response.status == 403) {
					console.log('success');
					error = true;
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

{#if error}
	<Error403 />
{:else}
	<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
		<Navbar />
		<Separator orientation="vertical" />
		<div class="space-y-1 w-1/2">
			<div class="font-bold text-2xl">Verified Posts</div>
			<div class="font-light text-base">@{username}</div>
			<Separator />
			<div class="mt-4">
				{#if posts != null}
					{#each posts as post}
						<Tweets {post} />
					{/each}
				{/if}
			</div>
		</div>

		<Separator orientation="vertical" />
		<RightSide />
	</div>
{/if}
