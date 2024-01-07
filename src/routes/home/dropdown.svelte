<script>
	import { Bookmark, Link, Share, Trash2 } from 'lucide-svelte';
	import { addToBookmark, getCookie } from '../helper';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	let currUserID;
	onMount(() => {
		currUserID = getCookie('uid');
	});
	export let TweetID, UserID;
	async function addBookmark() {
		const data = await addToBookmark(TweetID);
		console.log('bookmark', data);
		if (data.message == null) {
			toast.success('Added tweet to bookmarks.');
		} else {
			toast.error('Tweet already in bookmarks.');
		}
	}
	function copy() {
		navigator.clipboard.writeText('quacker.online/quack/' + TweetID);
		toast.success('Copied link to clipboard.');
	}
</script>

<Toaster richColors position="top-left" />

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost"><Share size="19" /></Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Item on:click={() => copy()}>
			<Link class="mr-2 h-4 w-4" />
			<button>Copy Link</button>
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => addBookmark()}>
			<Bookmark class="mr-2 h-4 w-4" />
			<button>Add to bookmarks</button>
		</DropdownMenu.Item>
		{#if currUserID == UserID}
			<DropdownMenu.Item>
				<Trash2 class="mr-2 h-4 w-4" />
				<button>Delete quack</button>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
