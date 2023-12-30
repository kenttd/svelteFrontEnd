<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Sun, Moon, LogOut } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input';
	import Tweets from './Tweets.svelte';
	import Navbar from './../navbar.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Textarea } from '$lib/components/ui/textarea';
	import { getCookie, deleteCookie, isLoggedin } from '../helper';
	import RightSide from './../rightSide.svelte';
	import { Toaster, toast } from 'svelte-sonner';

	onMount(() => {
		isLoggedin();
		toggleMode();
		// longPoll();
		getpost();
		console.log('uid:', getCookie('uid'));
	});
	let posts;
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
				toast.success("You've quacked!");
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		quackText = '';
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
</script>

<Toaster richColors position="top-left" />

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
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
		<div class="mt-4 h-4/6 overflow-y-scroll">
			{#if posts != null}
				{#each posts as post}
					<Tweets {post} />
				{/each}
			{:else}
				<div class="loader items-center">
					<span class="loader-text">loading</span>
					<span class="load"></span>
				</div>{/if}
		</div>
	</div>

	<Separator orientation="vertical" />
	<RightSide />
</div>

<style>
	:global(body) {
		overflow: hidden;
	}
	/* .navbar {
		background-color: rgb(48, 169, 244);
	}

	.navbar button {
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: larger;
		font-weight: bolder;
	}

	svg {
		margin-right: 20px;
	} */
	.loader {
		width: 80px;
		height: 50px;
		position: relative;
	}

	.loader-text {
		position: absolute;
		top: 0;
		padding: 0;
		margin: 0;
		color: #c8b6ff;
		animation: text_713 3.5s ease both infinite;
		font-size: 0.8rem;
		letter-spacing: 1px;
	}

	.load {
		background-color: #9a79ff;
		border-radius: 50px;
		display: block;
		height: 16px;
		width: 16px;
		bottom: 0;
		position: absolute;
		transform: translateX(64px);
		animation: loading_713 3.5s ease both infinite;
	}

	.load::before {
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		background-color: #d1c2ff;
		border-radius: inherit;
		animation: loading2_713 3.5s ease both infinite;
	}

	@keyframes text_713 {
		0% {
			letter-spacing: 1px;
			transform: translateX(0px);
		}

		40% {
			letter-spacing: 2px;
			transform: translateX(26px);
		}

		80% {
			letter-spacing: 1px;
			transform: translateX(32px);
		}

		90% {
			letter-spacing: 2px;
			transform: translateX(0px);
		}

		100% {
			letter-spacing: 1px;
			transform: translateX(0px);
		}
	}

	@keyframes loading_713 {
		0% {
			width: 16px;
			transform: translateX(0px);
		}

		40% {
			width: 100%;
			transform: translateX(0px);
		}

		80% {
			width: 16px;
			transform: translateX(64px);
		}

		90% {
			width: 100%;
			transform: translateX(0px);
		}

		100% {
			width: 16px;
			transform: translateX(0px);
		}
	}

	@keyframes loading2_713 {
		0% {
			transform: translateX(0px);
			width: 16px;
		}

		40% {
			transform: translateX(0%);
			width: 80%;
		}

		80% {
			width: 100%;
			transform: translateX(0px);
		}

		90% {
			width: 80%;
			transform: translateX(15px);
		}

		100% {
			transform: translateX(0px);
			width: 16px;
		}
	}
</style>
