<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { getCookie } from './helper';
	import { Button } from '$lib/components/ui/button';
	export let message;
</script>

<a class="flex mb-4 w-100 hover:cursor-pointer hover:bg-grey-700" href="#">
	<Avatar.Root class="me-2">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" height={30} />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	{#if message.senderName == getCookie('userame')}
		{message.senderName}
	{:else}
		{message.receiverName}
	{/if} <br />
	{message.MessageContent}
</a>
