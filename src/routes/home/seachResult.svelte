<script>
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { goto } from '$app/navigation';
	export let search;

	function gotoUser() {
		goto('/' + search.Username);
	}
</script>

<Card.Root class=" mt-5" on:click={() => gotoUser()}>
	<Card.Header>
		<div class="flex justify-start">
			<Card.Title class="flex align-middle">
				<Avatar.Root class="me-2">
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				{search.Username}
			</Card.Title>
		</div>
	</Card.Header>
</Card.Root>
