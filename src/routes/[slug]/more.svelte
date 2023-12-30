<script>
	import { MoreHorizontal, Link, BadgeCheck, Gavel } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	export let Username;
	import { getCookie } from '../helper';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="rounded-full"
			><MoreHorizontal size="19" /></Button
		>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Item on:click={() => navigator.clipboard.writeText('quacker.online/' + Username)}>
			<Link class="mr-2 h-4 w-4" />
			<button>Copy link to profile</button>
		</DropdownMenu.Item>
		{#if getCookie('isStaff') == true}
			<DropdownMenu.Item>
				<BadgeCheck class="mr-2 h-4 w-4" />
				<button>Verify this user</button>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Gavel class="mr-2 h-4 w-4" />
				<button>Ban this user</button>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
