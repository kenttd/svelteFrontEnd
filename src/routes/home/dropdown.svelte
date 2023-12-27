<script>
	import { Bookmark, Link, Share } from 'lucide-svelte';
	import { addToBookmark } from '../helper';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast/dist';
	import { onMount } from 'svelte';
	onMount(() => {
		const app = new SvelteToast({
			target: document.body,
			props: {}
		});
	});
	export let TweetID;
	async function addBookmark() {
		const data = await addToBookmark(TweetID);
		console.log('bookmark', data);
		if (data.message == null) {
			toast.push('Added tweet to bookmarks.');
		} else {
			toast.push('Tweet already in bookmarks.');
		}
	}
</script>

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
