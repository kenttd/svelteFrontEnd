<script>
	import { Home, Search, Bookmark, User, LogOut, Sun, Moon } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { logout } from './helper';
	import { onMount } from 'svelte';
	import { getCookie } from './helper';
	let link = '';
	let isStaff, isVerified;
	onMount(() => {
		link = '/' + getCookie('username');
		isStaff = getCookie('isStaff');
		isVerified = getCookie('isVerified');
	});
</script>

<div class="justify-start">
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>

<div class="navbar justify-end">
	<img
		alt="picture of a duck"
		src="https://svgshare.com/i/11Qf.svg"
		style="height: 15%;"
		class="hover:cursor-pointer"
		on:click={() => (window.location.href = '/home')}
	/>
	{#if isStaff == true}
		<p class="font-mono text-center px-5 rounded inline-block">staff</p>
	{:else if isVerified == true}
		<p class="font-mono text-center px-5 rounded inline-block">verified</p>
	{/if}
	<div>
		<Button href="/home" variant="ghost" class="my-4 text-center p-3 px-5 rounded inline-block">
			<div class="flex items-center">
				<Home size="20" class="me-2" />
				Home
			</div>
		</Button>
	</div>
	<div>
		<Button href="/explore" variant="ghost" class="my-4 text-center p-3 px-5 rounded inline-block">
			<div class="flex items-center">
				<Search size="20" class="me-2" />
				Explore
			</div>
		</Button>
	</div>
	<div>
		<Button href="/bookmark" variant="ghost" class="my-4 text-center p-3 px-5 rounded inline-block">
			<div class="flex items-center">
				<Bookmark size="20" class="me-2" />
				Bookmark
			</div>
		</Button>
	</div>
	<div>
		<Button href={link} variant="ghost" class="my-4 text-center p-3 px-5 rounded inline-block">
			<div class="flex items-center">
				<User size="20" class="me-2" />
				Profile
			</div>
		</Button>
	</div>
	<div>
		<Button
			variant="ghost"
			on:click={() => logout()}
			class="my-4 text-center p-3 px-5 rounded inline-block"
		>
			<div class="flex items-center">
				<LogOut size="20" class="me-2" />
				Logout
			</div>
		</Button>
	</div>
</div>
