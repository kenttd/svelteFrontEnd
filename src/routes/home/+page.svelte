<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Sun, Moon, LogOut } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import Tweets from './Tweets.svelte';
	import Search from './seachResult.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Textarea } from '$lib/components/ui/textarea';
	onMount(() => {
		// Your code here
		// console.log('test');
		toggleMode();
		// longPoll();
		getpost();
		console.log('uid:' + getCookie('uid'));
		// if (!document.cookie.includes('uid')) {
		// 	window.location.href = '/';
		// }
	});
	let posts;
	let searchResult;
	let userInput;
	let quackText; // variable buat dapet kalau mau tweet

	async function getpost() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/post/' + getCookie('uid'),
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
				// let uid = jsonData.UserID;
				// makecookie('uid', uid, 3);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	async function quack() {
		// posts = null;
		// console.log(posts);
		const formData = new FormData();
		formData.append('TweetContent', quackText);
		formData.append('uid', getCookie('uid'));

		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/quack', {
				method: 'POST',
				body: formData
			});

			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				console.log(jsonData);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	function longPoll() {
		fetch('https://quacker-1fcd875a5802.herokuapp.com/api/post/' + getCookie('uid'))
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				posts = data.posts;
				longPoll();
			})
			.catch((error) => {
				// Handle errors
				console.error('Error during long poll:', error);
				// Optional: You might want to introduce a delay before retrying
				// setTimeout(longPoll, 1000); // retry after 1 second
			});
	}

	function getCookie(cname) {
		let name = cname + '=';
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}
	function deleteCookie(cname) {
		const d = new Date();
		d.setTime(d.getTime() - 3600);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=;' + expires + ';path=/';
	}
	const debouncedAPICall = debounce(callAPI, 500); // Adjust the delay as needed
	async function callAPI() {
		if (userInput == '') {
			searchResult = null;
			return;
		}
		console.log('API called with:', userInput);
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/search/' + userInput,
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				searchResult = jsonData.list;
				// let uid = jsonData.UserID;
				// makecookie('uid', uid, 3);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	function search() {
		debouncedAPICall();
	}

	function debounce(func, delay) {
		let timeoutId;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func.apply(context, args), delay);
		};
	}

	if (typeof document !== 'undefined') {
		console.log(getCookie('uid'));
	}
</script>

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<div class="justify-end w-1/4">
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>Home</button
			>
		</div>
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>Explore</button
			>
		</div>
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>Bookmark</button
			>
		</div>
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>Profile</button
			>
		</div>
		<div>
			<button
				on:click={() => deleteCookie('uid')}
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>Logout</button
			>
		</div>
	</div>
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		Home
		<div class="flex my-4">
			<Avatar.Root class="me-2">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<Textarea placeholder="What's Happening ?!" class="border-none" bind:value={quackText} />
		</div>
		<div class="flex justify-end">
			<button
				on:click={() => quack()}
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			>
				Quack
			</button>
		</div>

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
	<div class="flex space-y-1 w-1/4 flex-col">
		<div class="flex-1">
			<Input
				on:input={() => search()}
				type="search"
				placeholder="search"
				class="max-w-xs"
				bind:value={userInput}
			/>
			<div>
				{#if searchResult != null}
					{#each searchResult as search}
						<Search {search} />
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex-1 justify-between">
			<div class="flex h-5 items-center">Direct Messages</div>
		</div>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</div>

<!-- <Button on:click={toggleMode} variant="outline" size="icon">
	<Sun
	  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
	  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
  </Button>
<div class="flex space-x-4 text-sm  justify-evenly h-screen">
    <div class="justify-end">
        <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Home</div>
        <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Explore</div>
        <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Bookmark</div>
        <div class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded">Profile</div>
    </div>
    <Separator orientation="vertical" />
    <div class="space-y-1">
        posts
    </div>
    <Separator orientation="vertical" />
    <div class="space-y-1">
        <div class="flex h-5 items-center">Direct Messages</div>
    </div>
</div> -->

<!-- <div>
    <div class="space-y-1">
        <div class="my-1">Home</div>
        <div class="my-1">Explore</div>
        <div class="my-1">Bookmark</div>
        <div class="my-1">Profile</div>
    </div>
    <Separator orientation="vertical" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      Posts
    </div>
  </div> -->

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
