<script>
	import { MoreHorizontal } from 'lucide-svelte';
	// import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	export let message;
</script>

<Button variant="icon" class="iconnn"><MoreHorizontal />a</Button>
{#if message.sentByRequester == true}
	<div class="justify-end flex contenttt">
		<p class="send">{message.MessageContent}</p>
	</div>
{:else}
	<div class="flex justify-start contenttt">
		<p class="receive">{message.MessageContent}</p>
	</div>
{/if}

<style>
	/* @use postcss-nested; */

	:root {
		--send-bg: #0b93f6;
		--send-color: white;
		--receive-bg: #e5e5ea;
		--receive-text: black;
		--page-background: white;
	}
	:global(.contenttt:hover .iconnn) {
		opacity: 1;
	}
	:global(.iconnn) {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	p {
		max-width: 255px;
		word-wrap: break-word;
		margin-bottom: 12px;
		line-height: 24px;
		position: relative;
		padding: 10px 20px;
		border-radius: 25px;

		&:before,
		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			height: 25px;
		}
	}

	.send {
		color: var(--send-color);
		background: var(--send-bg);
		align-self: flex-end;

		&:before {
			right: -7px;
			width: 20px;
			background-color: var(--send-bg);
			border-bottom-left-radius: 16px 14px;
		}

		&:after {
			right: -26px;
			width: 26px;
			background-color: var(--page-background);
			border-bottom-left-radius: 10px;
		}
	}
	.receive {
		background: var(--receive-bg);
		color: black;
		align-self: flex-start;

		&:before {
			left: -7px;
			width: 20px;
			background-color: var(--receive-bg);
			border-bottom-right-radius: 16px 14px;
		}

		&:after {
			left: -26px;
			width: 26px;
			background-color: var(--page-background);
			border-bottom-right-radius: 10px;
		}
	}
</style>
