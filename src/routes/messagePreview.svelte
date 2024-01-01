<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { getCookie } from './helper';
	import { Button } from '$lib/components/ui/button';
	export let message;
	let otherPeople;
	if (message.senderName == getCookie('username')) {
		otherPeople = message.receiverName;
	} else {
		otherPeople = message.senderName;
	}
</script>

<a class="flex mb-4 w-100 hover:cursor-pointer hover:bg-grey-700" href="/messages/{otherPeople}">
	<Avatar.Root class="me-2">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" height={30} />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	{otherPeople}
	<br />
	{message.MessageContent}
</a>
