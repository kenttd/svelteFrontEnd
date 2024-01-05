<script>
	import Navbar from '../../navbar.svelte';
	import RightSide from '../../rightSide.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { getCookie } from '../../helper';
	import { onMount } from 'svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Toaster, toast } from 'svelte-sonner';

	import {
		ArrowLeft,
		CalendarDays,
		BadgeCheck,
		Wrench,
		Link,
		Mail,
		Heart,
		Repeat2,
		MessageCircle
	} from 'lucide-svelte';
	import Tweets from './Tweet.svelte';
	onMount(() => {
		getReply();
	});

	export let data;
	let tweet = data.data.tweet;
	let replies = [];
	let tweetInfoFull = [];
	let user = [];
	let replyText = '';
	// console.log('tweet', tweet);
	export async function getReply() {
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/getTweetDetail/' + tweet.TweetID,
				{
					method: 'GET'
				}
			);
			if (response.ok) {
				const jsonData = await response.json();
				console.log('jsondata', jsonData);
				replies = jsonData.replies;
				tweetInfoFull = jsonData.tweet;
				user = jsonData.tweet.user;
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			// Make the next long poll request after a delay (e.g., 1 second)
			// setTimeout(getReply, 1000);
		}
	}
	async function reply() {
		// posts = null;
		// console.log(posts);
		const formData = new FormData();
		formData.append('ReplyContent', replyText);
		formData.append('UserID', getCookie('uid'));
		formData.append('TweetID', tweetInfoFull.TweetID);

		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/postReply', {
				method: 'POST',
				body: formData
			});

			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				console.log(jsonData);
				toast.success('You replied to ' + user.Username + "'s quack.");
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		replyText = '';
	}
</script>

<Toaster richColors position="top-left" />

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex items-center mb-2">
			<Button variant="ghost" on:click={() => window.history.back()}><ArrowLeft /></Button>

			<p class="text-xl">Post</p>
		</div>
		<div class="flex items-center">
			<Avatar.Root class="me-2">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<span class="me-2 text-lg">{user.Username}</span>
			{#if user.isVerified}<Wrench size="20" class="me-2" />{/if}
			{#if user.isStaff}<BadgeCheck size="20" />{/if}
		</div>
		<div class="flex pt-2">
			<p>{tweetInfoFull.TweetContent}</p>
		</div>
		<div class="flex pt-3 pb-2">time here</div>
		<hr />
		<div class="flex items-center py-3">
			<span class="flex me-4 items-center"
				><Heart class="me-1" size="19" />{tweetInfoFull.LikesCount}</span
			>
			<span class="flex me-4 items-center"
				><Repeat2 class="me-1" size="19" />{tweetInfoFull.RetweetsCount}</span
			>
			<span class="flex me-4 items-center"
				><MessageCircle class="me-1" size="19" />{tweetInfoFull.RepliesCount}</span
			>
		</div>
		<hr />
		<div class="flex justify-between items-center py-2">
			<Textarea placeholder="Post your reply" class="border-none" bind:value={replyText} />
			<Button variant="ghost" disabled={replyText.length == 0} on:click={() => reply()}
				>Reply</Button
			>
		</div>
		{#if replies != []}
			{#each replies as reply}
				<Tweets post={reply} />
			{/each}
		{:else}
			loading...
		{/if}
	</div>
	<Separator orientation="vertical" />
	<RightSide />
</div>
