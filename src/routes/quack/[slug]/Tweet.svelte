<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { formatTime } from './../../helper';
	import { BadgeCheck, Wrench } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	export let post;
</script>

<div class="flex py-2 items-center">
	<div class="">
		<Avatar.Root class="me-2">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="w-5/6">
		<div class="flex items-center">
			<Button variant="link" href={'/' + post.user.Username} class="me-2"
				>{post.user.Username}
			</Button>
			{#if post.user.isVerified}<Wrench size="17" class="me-2" />{/if}
			{#if post.user.isStaff}<BadgeCheck size="17" class="me-2" />{/if}
			<span class="font-thin">{formatTime(post.created_at)}</span>
		</div>
		<div class="pe-5">{post.ReplyContent}</div>
	</div>
</div>
