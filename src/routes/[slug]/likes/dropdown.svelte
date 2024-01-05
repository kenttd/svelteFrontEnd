<script>
	import { Bookmark, Link, Share } from 'lucide-svelte';
	import { addToBookmark } from '../../helper';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';

	onMount(() => {});
	export let TweetID;
	async function addBookmark() {
		const data = await addToBookmark(TweetID);
		console.log('bookmark', data);
		if (data.message == null) {
			toast.success('Added tweet to bookmarks.');
		} else {
			toast.error('Tweet already in bookmarks.');
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
		<DropdownMenu.Item on:click={() => addBookmark()}>
			<Bookmark class="mr-2 h-4 w-4" />
			<button>Add to bookmarks</button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
