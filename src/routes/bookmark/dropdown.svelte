<script>
	import { Bookmark, Link, Share } from 'lucide-svelte';
	import { removeFromBookmark } from '../helper';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toaster, toast } from 'svelte-sonner';

	import { onMount } from 'svelte';
	onMount(() => {});
	export let BookmarkID, TweetID;
	async function removeBookmark() {
		const data = await removeFromBookmark(BookmarkID);
		console.log('bookmark', data);
		if (data.message == 'success') {
			toast.success('Removed tweet from bookmarks.');
		} else {
			toast.error('Failed to remove bookmarks.');
		}
	}
</script>

<Toaster richColors position="top-left" />

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost"><Share size="19" /></Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Item
			on:click={() => navigator.clipboard.writeText('quacker.online/quack/' + TweetID)}
		>
			<Link class="mr-2 h-4 w-4" />
			<button>Copy Link</button>
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => removeBookmark()}>
			<Bookmark class="mr-2 h-4 w-4" />
			<button>Remove from bookmarks</button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
