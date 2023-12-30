<script>
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	export let search;

	function gotoUser() {
		window.location.href = '/' + username;
	}
</script>

<div class="flex mb-4">
	<Avatar.Root class="me-2">
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Button variant="link" href="/{search.Username}">{search.Username}</Button>
</div>

<!-- 
<Card.Root class=" mt-5">
	<Card.Header on:click={() => gotoUser()}>
		<div class="flex justify-start">
			<Card.Title class="flex align-middle"></Card.Title>
		</div>
	</Card.Header>
</Card.Root> -->
