<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { formatTime } from './../../helper';
	export let post;
</script>

<hr />
<div class="flex py-2">
	<div class="">
		<Avatar.Root class="me-2">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="w-5/6">
		<div>
			<span class="me-2">{post.user.Username}</span>
			<span class="font-thin">{formatTime(post.created_at)}</span>
		</div>
		<div>{post.ReplyContent}</div>
	</div>
</div>

<hr />
