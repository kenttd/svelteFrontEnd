<script>
	import * as Select from '$lib/components/ui/select';
	import Option from './Option.svelte';
	import { ArrowUpNarrowWide, ArrowUpWideNarrow } from 'lucide-svelte';
	export let q;
	const options = [
		{
			value: 'created_at,asc',
			component: Option,
			props: { icon: ArrowUpWideNarrow, label: 'Newest Quack' }
		},
		{
			value: 'created_at,desc',
			component: Option,
			props: { icon: ArrowUpNarrowWide, label: 'Oldest Quack' }
		},
		{
			value: 'LikesCount,asc',
			component: Option,
			props: { icon: ArrowUpNarrowWide, label: 'Least Likes' }
		},
		{
			value: 'LikesCount,desc',
			component: Option,
			props: { icon: ArrowUpWideNarrow, label: 'Most Likes' }
		},
		{
			value: 'RetweetsCount,asc',
			component: Option,
			props: { icon: ArrowUpNarrowWide, label: 'Least Requacks' }
		},
		{
			value: 'RetweetsCount,desc',
			component: Option,
			props: { icon: ArrowUpWideNarrow, label: 'Most Requacks' }
		},
		{
			value: 'RepliesCount,asc',
			component: Option,
			props: { icon: ArrowUpNarrowWide, label: 'Least Replies' }
		},
		{
			value: 'RepliesCount,desc',
			component: Option,
			props: { icon: ArrowUpWideNarrow, label: 'Most Replies' }
		}
	];
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Sort quack by" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<!-- <Select.Label>Fruits</Select.Label> -->
			{#each options as option}
				<Select.Item
					value={option.value}
					on:click={() => (window.location.href = '/explore?q=' + q + '&sort=' + option.value)}
				>
					<svelte:component this={option.component} {...option.props} />
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="favoriteFruit" />
</Select.Root>
