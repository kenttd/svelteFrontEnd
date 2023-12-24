<script>
	import { Separator } from '$lib/components/ui/separator';
	import Tweets from './Tweets.svelte';
	import Test from './test.svelte';
	import { onMount } from 'svelte';
	export let user;
	let posts;
	onMount(() => {
		getUserPost();
	});

	const userjoindate = new Date(user.created_at);
	const dateString = userjoindate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

	// Splitting the string into month and day
	const [month, day] = dateString.split(' ');
	const joined = `${month} ${day}`;
	// Displaying the result
	function getUserPost() {
		return fetch('https://quacker-1fcd875a5802.herokuapp.com/api/getpost/' + user.UserID, {
			method: 'GET'
		})
			.then((response) => {
				// Check if the request was successful (status code 2xx)
				if (response.ok) {
					return response.json();
				} else {
					console.error('Error:', response.statusText);
					throw new Error(response.statusText);
				}
			})
			.then((jsonData) => {
				console.log('json');
				console.log(jsonData);
				posts = jsonData.tweets;
				console.log('asli');
				console.log(posts);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<div>
	{user.Username}
	<div class="flex">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class="bi bi-calendar3"
			viewBox="0 0 16 16"
		>
			<path
				d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
			/>
			<path
				d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
			/>
		</svg>
		<span class="ms-1">{joined}</span>
	</div>
	<Separator />
	<Test />
	{#if posts != null}
		{#each posts as post}
			<Tweets {post} />
		{/each}
	{:else}
		<h3>Loading...</h3>
	{/if}
</div>
