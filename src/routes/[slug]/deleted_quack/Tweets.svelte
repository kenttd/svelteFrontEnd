<script>
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { doLike, getCookie, doUnLike, doRetweet, doUnRetweet, formatTime } from './../../helper';
	import { onMount } from 'svelte';
	import Dropdown from './../dropdown.svelte';
	import { Repeat2, MessageCircle, Heart } from 'lucide-svelte';
	let likes, retweet, replies;

	export let post;

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
	<Card.Footer class=""></Card.Footer>
</Card.Root>

<style>
</style>
