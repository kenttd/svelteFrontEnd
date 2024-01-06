<script>
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { getCookie, editProfile } from '../../helper';
	export let bio, link;
	function edit() {
		editProfile(getCookie('uid'), bio, link);
		location.reload();
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Bio</Label>
				<Input id="username" class="col-span-3" bind:value={bio} />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Link</Label>
				<Input id="username" bind:value={link} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" on:click={() => edit()}>Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
