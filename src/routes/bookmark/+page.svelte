<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Navbar from './../navbar.svelte';
	import Tweets from './Tweets.svelte';
	import { onMount } from 'svelte';
	import { isLoggedin } from '../helper';
	import RightSide from './../rightSide.svelte';

	let username = '';
	onMount(() => {
		isLoggedin();
		username = getCookie('username');
		getBookmarkPost();
	});
	import * as Avatar from '$lib/components/ui/avatar';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getCookie, deleteCookie } from '../helper';
	let userInput,
		searchResult,
		posts = null;
	async function getBookmarkPost() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/getBookmark/' + getCookie('uid'),
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				// console.log(jsonData);
				posts = jsonData.posts;
				console.log(posts);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			// Make the next long poll request after a delay (e.g., 1 second)
			// setTimeout(getBookmarkPost, 1000);
		}
	}
	function search() {}
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="font-bold text-2xl">Bookmarks</div>
		<div class="font-light text-base">@{username}</div>
		<Separator />
		<div class="mt-4">
			{#if posts != null}
				{#each posts as post}
					<Tweets bookmark={post} />
				{/each}
			{/if}
		</div>
	</div>

	<Separator orientation="vertical" />
	<RightSide />
</div>
