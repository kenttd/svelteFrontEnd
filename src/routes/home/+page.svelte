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
	<div class="navbar justify-end w-1/4">
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
					<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
				  </svg>
				  Home
				</button
			>
		</div>
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
					<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472M3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
				  </svg>
				Explore</button
			>
		</div>
		<div>
			<button
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
					<path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
				  </svg>  
				Bookmark
				</button
			>
		</div>
		<div>
			<button 
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
					<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
				  </svg>
				  Profile
				</button
			>
		</div>
		<div>
			<button
				on:click={() => deleteCookie('uid')}
				class="my-4 hover:text-white hover:bg-[#0891b2] text-center p-3 px-5 rounded inline-block cursor-pointer"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
					<path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
				  </svg>
				Logout</button
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
	.navbar{
		background-color: rgb(48, 169, 244);
		
	}

	.navbar button{
		
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: larger;
		font-weight: bolder;
	}

	svg{
		margin-right: 20px;
	}

	
</style>
