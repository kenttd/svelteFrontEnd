<script>
	import { Separator } from '$lib/components/ui/separator';
	import Navbar from './../../navbar.svelte';
	import RightSide from './../../rightSide.svelte';
	import { getCookie, isLoggedin } from '../../helper';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Info, SendHorizontal, Wrench, BadgeCheck } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Message from './message.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Toaster, toast } from 'svelte-sonner';

	/** @type {import('./$types').PageData} */

	export let data;
	let message = '',
		noMessage = false;
	onMount(() => {
		isLoggedin();
		getMessages();
	});
	let user = data.data.user;
	let messages;
	async function getMessages() {
		const formData = new FormData();
		formData.append('RequesterId', getCookie('uid'));
		formData.append('otherPersonId', user.UserID);
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/getMessagesSpecific',
				{
					method: 'POST',
					body: formData
				}
			);
			if (response.ok) {
				const jsonData = await response.json();
				console.log('message', jsonData);
				messages = jsonData.messages;
				if (messages.length == 0) {
					noMessage = true;
				}
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			// Make the next long poll request after a delay (e.g., 1 second)
			setTimeout(getMessages, 1000);
		}
	}

	async function sendMessage() {
		const formData = new FormData();
		formData.append('SenderID', getCookie('uid'));
		formData.append('ReceiverID', user.UserID);
		formData.append('message', message);
		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/sendMessage', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				const jsonData = await response.json();
				toast.success('Message sent');
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
		message = '';
	}
	function onKeyDown(e) {
		switch (e.keyCode) {
			case 13:
				sendMessage();
				break;
		}
	}
</script>

<Toaster richColors position="top-left" />

<div class="flex space-x-4 text-sm justify-end h-screen mt-3">
	<Navbar />
	<Separator orientation="vertical" />
	<div class="space-y-1 w-1/2">
		<div class="flex justify-between items-center">
			<div class="flex items-center">
				<Avatar.Root class="me-2">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<span class="text-lg">{user.Username}</span>
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
			<div class="flex justify-end mt-auto">
				<Button variant="ghost" href="/{user.Username}">
					<Info size="20" />
				</Button>
			</div>
		</div>

		<hr />
		<div class="h-5/6 w-5/6 ms-3 pt-2 mb-5">
			{#if messages != null}
				{#each messages as message}
					<Message {message} />
				{/each}
			{:else}
				<div class="loader items-center">
					<span class="loader-text">loading</span>
					<span class="load"></span>
				</div>
			{/if}
		</div>
		{#if noMessage}
			<p class="text-center mb-2">No messages yet</p>
		{/if}
		<div
			class="flex border-solid rounded-full items-center border-2 w-full justify-between h-12 z-10"
		>
			<input
				type="text"
				placeholder="Send a message"
				class="border-none focus:outline-none w-full focus:border-transparent h-full ms-3 z-0"
				bind:value={message}
			/>
			<Button variant="ghost" on:click={() => sendMessage()}>
				<SendHorizontal />
			</Button>
		</div>
	</div>

	<Separator orientation="vertical" />
	<RightSide />
</div>
<svelte:window on:keydown={onKeyDown} />

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
