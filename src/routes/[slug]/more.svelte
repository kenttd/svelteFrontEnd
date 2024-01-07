<script>
	import { MoreHorizontal, Link, BadgeCheck, Gavel, Wrench, Trash2 } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	export let Username, UserID;
	import { getCookie, doVerify, doUnverify, doStaff, doUnstaff, doBan, doUnban } from '../helper';
	export let isVerified, isStaff, isBanned;
	let currIsStaff;
	onMount(() => {
		currIsStaff = getCookie('isStaff');
	});
</script>

<Toaster richColors position="top-left" />

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
		{#if currIsStaff == true}
			{#if !isVerified}
				<DropdownMenu.Item on:click={() => doVerify(UserID)}>
					<BadgeCheck class="mr-2 h-4 w-4" />
					<button>Verify this user</button>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item on:click={() => doUnverify(UserID)}>
					<BadgeCheck class="mr-2 h-4 w-4" />
					<button>Unverify this user</button>
				</DropdownMenu.Item>
			{/if}
			{#if !isBanned}
				<DropdownMenu.Item on:click={() => doBan(UserID)}>
					<Gavel class="mr-2 h-4 w-4" />
					<button>Ban this user</button>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item on:click={() => doUnban(UserID)}>
					<Gavel class="mr-2 h-4 w-4" />
					<button>Unban this user</button>
				</DropdownMenu.Item>
			{/if}
			{#if !isStaff}
				<DropdownMenu.Item on:click={() => doStaff(UserID)}>
					<Wrench class="mr-2 h-4 w-4" />
					<button>Make this user staff</button>
				</DropdownMenu.Item>
			{:else}
				<DropdownMenu.Item on:click={() => doUnstaff(UserID)}>
					<Wrench class="mr-2 h-4 w-4" />
					<button>Remove staff status</button>
				</DropdownMenu.Item>
			{/if}
			<DropdownMenu.Item
				on:click={() => (window.location.href = '/' + Username + '/deleted_quack')}
			>
				<Trash2 class="mr-2 h-4 w-4" />
				<button>View user's deleted quack</button>
			</DropdownMenu.Item>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
