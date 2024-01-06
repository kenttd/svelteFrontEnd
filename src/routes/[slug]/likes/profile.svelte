<script>
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import Tweets from './Tweets.svelte';
	import More from './more.svelte';
	import { onMount } from 'svelte';
	import { CalendarDays, BadgeCheck, Wrench, Link, Mail } from 'lucide-svelte';
	import { getCookie, doFollow, doUnFollow } from './../../helper';
	import Edit from './editProfile.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	export let user;
	let posts, isFollowing, isFollowed;
	let CurrentUser, follower, following;
	onMount(() => {
		getUserPost();
		CurrentUser = getCookie('username');
		follower = user.Followers;
		following = user.Following;
	});
	const userjoindate = new Date(user.created_at);
	const dateString = userjoindate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

	// Splitting the string into month and day
	const [month, day] = dateString.split(' ');
	const joined = `${month} ${day}`;
	// Displaying the result
	function getUserPost() {
		return fetch(
			'https://quacker-1fcd875a5802.herokuapp.com/api/listLikes/' +
				user.UserID +
				'/' +
				getCookie('uid'),
			{
				method: 'GET'
			}
		)
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
				posts = jsonData.posts;
				isFollowed = jsonData.isFollowed;
				isFollowing = jsonData.isFollowing;
				console.log('asli');
				console.log(posts);
				setTimeout(getUserPost, 1000);
			})
			.catch((error) => {
				console.error('Error:', error);
				setTimeout(getUserPost, 1000);
			});
	}

	function follow() {
		isFollowing = true;
		doFollow(getCookie('uid'), user.UserID);
	}
	function unfollow() {
		isFollowing = false;
		doUnFollow(getCookie('uid'), user.UserID);
	}
</script>

<div class="w-full">
	<div class="flex items-center justify-between">
		<div class="flex items-center mb-2 me-[30%]">
			<Avatar.Root class="me-2">
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<span class="me-2">{user.Username}</span>
			{#if user.isVerified}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button builders={[builder]} variant="ghost" size="icon"><BadgeCheck /></Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>This user is verified.</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
			{#if user.isStaff}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button builders={[builder]} variant="ghost" size="icon"><Wrench /></Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>This user is staff.</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</div>
		<div class="flex justify-end">
			{#if user.Username == CurrentUser}
				<Edit bio={user.Bio} link={user.link} UserID={user.UserID} />
			{:else}
				<More Username={user.Username} />
				<Button variant="ghost" class="rounded-full" href="messages/{user.Username}"
					><Mail /></Button
				>
				{#if !isFollowing && isFollowed}
					<Button variant="outline" on:click={() => follow()}>Follow Back</Button>
				{:else if isFollowing}
					<Button variant="destructive" on:click={() => unfollow()}>Unfollow</Button>
				{:else}
					<Button variant="outline" on:click={() => follow()}>Follow</Button>
				{/if}
			{/if}
		</div>
	</div>

	{user.Bio}

	<div class="flex items-center mt-2 mb-2">
		<Link size="20" />
		<a class="ms-1 me-2 hover:underline" href={'https://' + user.link}>{user.link}</a>
		<CalendarDays size="20" />
		<span class="ms-1">Joined {joined}</span>
	</div>

	<div class="flex items-center mt-2 mb-3">
		<Button variant="link" class="me-3" href="/{user.Username}/following"
			>{following} Following</Button
		>
		<Button variant="link" href="/{user.Username}/followers">{follower} Followers</Button>
	</div>
	<div class="flex justify-between pb-1">
		<Button variant="ghost" class="w-1/2" href="/{user.Username}"
			><span class="">Posts</span></Button
		>
		<Button variant="ghost" class="w-1/2"
			><span class="underline decoration-indigo-500 underline-offset-8">Likes</span></Button
		>
	</div>
	<Separator />

	{#if posts != null}
		{#each posts as post}
			<Tweets {post} currUser={user.Username} />
		{/each}
		{#if posts.length == 0}
			<div class="text-lg mt-3">This user doesn't have any likes yet.</div>
		{/if}
	{:else}
		<div class="loader">
			<span class="loader-text">loading</span>
			<span class="load"></span>
		</div>
	{/if}
</div>

<style>
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
