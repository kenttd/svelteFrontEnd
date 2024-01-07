<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { doLike, getCookie, doUnLike, formatTime } from './../helper';
	import { onMount } from 'svelte';
	import Dropdown from './dropdown.svelte';
	import { Repeat2, MessageCircle, Heart } from 'lucide-svelte';
	export let bookmark;
	let post = bookmark.tweet;
	let colorLike = 'white';
	onMount(() => {
		if (post.liked) {
			colorLike = 'red';
		}
	});
	// Current date and time
	// Current date and time
	const now = new Date();
	let likes, retweet, replies;

	// Your specific date and time in the format "YYYY-MM-DD HH:mm:ss"
	const specificDateStr = post.created_at;
	const specificDate = new Date(specificDateStr.replace(/-/g, '/'));

	// Calculate the difference in milliseconds
	const differenceInMilliseconds = specificDate - now;

	// Convert milliseconds to days, hours, and minutes
	const days = Math.floor(Math.abs(differenceInMilliseconds) / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(Math.abs(differenceInMilliseconds) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((Math.abs(differenceInMilliseconds) % (1000 * 60 * 60)) / (1000 * 60));

	// Construct the result string based on the time difference
	let result = '';

	if (days > 0) {
		const month = specificDate.toLocaleString('en-US', { month: 'short' });
		const date = specificDate.getDate();
		result += `${month} ${date}`;
	} else if (hours > 0) {
		result += `${hours}h `;
	} else if (minutes > 0 || (days === 0 && hours === 0)) {
		result += `${minutes}m`;
	}
	let liked = post.liked;
	let LikeID = '';
	console.log(liked);
	async function like() {
		if (!liked) {
			likes++;
			liked = true;
			const data = doLike(post.TweetID, LikeID != '', LikeID);
			console.log(data);
		} else {
			likes--;
			liked = false;
			const data = doUnLike(post.TweetID, LikeID != '');
			console.log(data);
		}
	}
	likes = post.LikesCount;
	retweet = post.RetweetsCount;
	replies = post.RepliesCount;
</script>

<Card.Root class=" mt-5">
	<Card.Header>
		<div class="flex justify-start items-center">
			<Card.Title class="flex align-middle">
				<Avatar.Root class="me-2">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<Button variant="link" href="/{post.user.Username}">{post.user.Username}</Button>
			</Card.Title>
			<Card.Description class="ms-4">{formatTime(post.created_at)}</Card.Description>
		</div>
	</Card.Header>

	<Card.Content>
		{post.TweetContent}
	</Card.Content>
	<Card.Footer class="">
		<div class="flex justify-start">
			<button class="flex like" on:click={() => like()}>
				<div class="flex items-center">
					<Heart fill={colorLike} color={colorLike == 'red' ? 'red' : 'black'} size="19" />
					<span class="likes ms-1">{likes}</span>
				</div>
			</button>
			<button class="flex ms-3">
				<div class="flex items-center">
					<Repeat2 size="19" />
					<span class="ms-1">{post.RetweetsCount}</span>
				</div>
			</button>
		</div>
		<div class="flex justify-end">
			<button class="flex ms-3">
				<div class="flex items-center">
					<MessageCircle size="19" />
					<span class="ms-1">{post.RepliesCount}</span>
				</div>
			</button>
		</div>

		<Dropdown BookmarkID={bookmark.BookmarkID} TweetID={post.TweetID} />
		<Button variant="ghost" href="/quack/{post.TweetID}">See quack</Button>
	</Card.Footer>
</Card.Root>

<!-- <HoverCard.Root>
	<HoverCard.Content class="w-80">
		<span class="align-top inline-block">test</span>
	</HoverCard.Content>
	<HoverCard.Trigger
		href="https://github.com/sveltejs"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
	>
		<Card.Header>
			<div class="flex justify-start">
				<Card.Title class="flex align-middle">
					<Avatar.Root class="me-2">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					{post.user.Username}
				</Card.Title>
				<Card.Description class="ms-4">{result}</Card.Description>
			</div>
		</Card.Header>
	</HoverCard.Trigger>
</HoverCard.Root> -->

<style>
	:global(.heart):hover {
		fill: #ff0000;
	}
	.like:hover {
		/* background-color: rgba(255, 0, 0, 0.431); */
	}
</style>
