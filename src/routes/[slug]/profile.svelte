<script>
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import Tweets from './Tweets.svelte';
	import { onMount } from 'svelte';
	import { CalendarDays } from 'lucide-svelte';

	import { getCookie } from './../helper';
	import Edit from './editProfile.svelte';
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
	<div class="flex items-center">
		<div class="flex items-center mb-2 me-[30%]">
			<Avatar.Root class="me-2">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			{user.Username}
		</div>
		<div class="flex justify-end">
			{#if user.Username == getCookie('username')}
				<Edit />
			{/if}
		</div>
	</div>

	{user.Bio}a

	<div class="flex items-center mt-2 mb-2">
		<CalendarDays size="20" />
		<span class="ms-1">Joined {joined}</span>
	</div>

	<div class="flex items-center mt-2 mb-3">
		<span class="me-3">{user.Following} Following</span>
		<span>{user.Followers} Followers</span>
	</div>
	<Separator />
	{#if posts != null}
		{#each posts as post}
			<Tweets {post} />
		{/each}
	{:else}
		<h3>Loading...</h3>
	{/if}
</div>
