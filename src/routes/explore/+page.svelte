<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import Navbar from './../navbar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { getCookie, deleteCookie, isLoggedin } from '../helper';
	import RightSide from './../rightSide.svelte';
	import Tweets from './../home/Tweets.svelte';
	import Select from './Select.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		isLoggedin();
	});
	let posts;
	const url = $page.url;
	const hasVal = url.searchParams.has('q');
	const val = url.searchParams.get('q');
	const hasSort = url.searchParams.has('sort');
	let sort = url.searchParams.get('sort');
	let input;
	const defaultSort = 'created_at,asc';
	const acceptable = [
		'created_at,asc',
		'created_at,desc',
		'LikesCount,asc',
		'LikesCount,desc',
		'RetweetsCount,asc',
		'RetweetsCount,desc',
		'RepliesCount,asc',
		'RepliesCount,desc'
	];
	if (!acceptable.includes(sort)) sort = defaultSort;
	async function getPost() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/searchTweet/' +
					val +
					'/' +
					getCookie('uid') +
					'/' +
					sort,
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				console.log('json', jsonData);
				posts = jsonData.posts;
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

	if (hasVal) {
		getPost();
	}
	function search() {
		window.location.href = '/explore?q=' + input;
	}
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex">
			<Input bind:value={input} placeholder="search" class="" />
			<Button on:click={() => search()} class="ms-5">Search</Button>
		</div>
		<div>
			{#if hasVal}
				<Select q={val} />
			{/if}
		</div>
		<div>
			{#if hasVal}
				{#if posts != null}
					{#each posts as post}
						<Tweets {post} />
					{/each}
				{/if}
			{/if}
		</div>
	</div>

	<Separator orientation="vertical" />
	<RightSide />
</div>
