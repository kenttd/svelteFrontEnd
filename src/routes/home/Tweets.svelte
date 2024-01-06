<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { doLike, getCookie, doUnLike, doRetweet, doUnRetweet, formatTime } from './../helper';
	import { onMount } from 'svelte';
	import Dropdown from './dropdown.svelte';
	import { Repeat2, MessageCircle, Heart } from 'lucide-svelte';
	export let post;
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
	let likes, retweet, replies;
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
	likes = post.LikesCount;
	retweet = post.RetweetsCount;
	replies = post.RepliesCount;
	let link = `/quack/${post.TweetID}`;
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
				<Dropdown TweetID={post.TweetID} />
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
