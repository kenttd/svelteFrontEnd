<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { doLike, getCookie, doUnLike, doRetweet, doUnRetweet, formatTime } from './../helper';
	import { onMount } from 'svelte';
	import Dropdown from './dropdown.svelte';
	import { Repeat2, MessageCircle, Heart } from 'lucide-svelte';

	export let post, currUser;
	let colorLike = 'white';
	let colorRetweet = 'white';

	onMount(() => {
		if (post.liked) {
			colorLike = 'red';
		}
		if (post.retweeted) {
			colorRetweet = 'green';
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
	let LikeID = post.likeid ?? '';
	let retweeted = post.retweeted;
	let RetweetID = post.retweetid ?? '';
	console.log(liked);
	console.log('likeID', LikeID);
	async function like() {
		if (!liked) {
			likes++;
			liked = true;
			colorLike = 'red';
			const data = await doLike(post.TweetID, LikeID != '', LikeID);
			LikeID = data.LikeID;
			console.log('like data', LikeID);
		} else {
			likes--;
			liked = false;
			colorLike = 'white';
			const data = doUnLike(post.TweetID, LikeID);
			console.log(data);
		}
	}
	async function doretweet() {
		if (!retweeted) {
			retweet++;
			retweeted = true;
			const data = await doRetweet(post.TweetID, RetweetID != '', RetweetID);
			RetweetID = data.RetweetID;
			console.log('retweet data', RetweetID);
		} else {
			retweet--;
			retweeted = false;
			const data = doUnRetweet(post.TweetID, RetweetID);
			console.log(data);
		}
	}
	console.log('liked', liked);
	// console.log(minutes, hours, days);
	console.log(specificDateStr);
	likes = post.LikesCount;
	retweet = post.RetweetsCount;
	replies = post.RepliesCount;
	let link = `/quack/${post.TweetID}`;
</script>

<Card.Root class=" mt-5">
	{#if post.isRetweed}
		<div class="flex items-center pt-3 ps-3">
			<Repeat2 size="16" class="me-2" />{currUser} reposted
		</div>
	{/if}

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
		<div class="flex justify-between items-center w-full">
			<div class="flex">
				<button class="flex like" on:click={() => like()}>
					<div class="flex items-center">
						<Heart fill={colorLike} color={colorLike == 'red' ? 'red' : 'black'} size="19" />
						<span class="likes ms-1">{likes}</span>
					</div>
				</button>
				<button class="flex ms-3" on:click={() => doretweet()}>
					<div class="flex items-center">
						<Repeat2 size="19" color={colorRetweet} />
						<span class="ms-1">{retweet}</span>
					</div>
				</button>
				<div class="flex justify-end">
					<button class="flex ms-3">
						<div class="flex items-center">
							<MessageCircle size="19" />
							<span class="ms-1">{post.RepliesCount}</span>
						</div>
					</button>
				</div>
			</div>
			<div class="flex items-center">
				<Dropdown TweetID={post.TweetID} UserID={post.user.UserID} />
				<Button variant="ghost" href="/quack/{post.TweetID}">See Quack</Button>
			</div>
		</div>
	</Card.Footer>
</Card.Root>

<style>
	:global(.heart):hover {
		fill: #ff0000;
	}
	.like:hover {
		/* background-color: rgba(255, 0, 0, 0.431); */
	}
</style>
