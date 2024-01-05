<script>
	import * as Avatar from '$lib/components/ui/avatar';

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
			{post.user.Username}
		</div>
		<div>{post.ReplyContent}</div>
	</div>
</div>

<hr />
