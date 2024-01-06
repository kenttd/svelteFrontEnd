<script>
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Sun, Moon } from 'lucide-svelte';
	import { toggleMode, userPrefersMode } from 'mode-watcher';
	import { Toaster, toast } from 'svelte-sonner';

	import { onMount } from 'svelte';

	onMount(() => {});
	function makecookie(key, value, days) {
		var expirationDate = new Date();
		expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000 * days);
		document.cookie = key + '=' + value + '; expires=' + expirationDate.toUTCString() + '; path=/';
	}
	if (typeof window !== 'undefined') {
		if (document.cookie.includes('uid')) {
			window.location.href = '/home';
		}
	}
	function deleteCookie(cname) {
		const d = new Date();
		d.setTime(d.getTime() - 3600);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=;' + expires + ';path=/';
	}

	var username, password;
	var usernameReg, passwordReg, emailReg;
	if ($userPrefersMode == 'dark') {
		toggleMode();
	}
	async function login() {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/login', {
				method: 'POST',
				body: formData
			});

			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				let uid = jsonData.UserID;
				toast.success('Login success, please wait...');
				makecookie('uid', uid, 3);
				makecookie('username', jsonData.Username, 3);
				makecookie('isVerified', jsonData.isVerified, 3);
				makecookie('isStaff', jsonData.isStaff, 3);
				location.reload();
			} else {
				console.error('Error:', response.statusText);
				const error = await response.json();
				toast.error(error.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	async function register() {
		const formData = new FormData();
		formData.append('username', usernameReg);
		formData.append('password', passwordReg);
		formData.append('email', emailReg);
		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/register', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				const jsonData = await response.json();
				toast.success('Successfully registered.');
			} else {
				const errorData = await response.json();
				console.error('Error:', errorData.error);
				for (let field in errorData.error) {
					for (let i = 0; i < errorData.error[field].length; i++) {
						toast.error(`Error in ${field}: ${errorData.error[field][i]}`);
					}
				}
				toast.error('Registration failed, please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<Toaster richColors position="top-left" />
<div class="h-screen overflow-hidden">
	<div class="flex justify-end m-5">
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
	<div class="flex justify-center items-center h-screen">
		<Tabs.Root value="account" class="w-[400px]">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="account">Login</Tabs.Trigger>
				<Tabs.Trigger value="password">Register</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="account">
				<Card.Root>
					<Card.Header>
						<Card.Title>Login</Card.Title>
						<Card.Description>Enter your account details.</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div class="space-y-1">
							<Label for="name">Username</Label>
							<Input id="username" placeholder="kenttd" name="username" bind:value={username} />
						</div>
						<div class="space-y-1">
							<Label for="username">Password</Label>
							<Input
								id="password"
								placeholder="kent"
								name="password"
								type="password"
								bind:value={password}
							/>
						</div>
					</Card.Content>
					<Card.Footer>
						<Button on:click={login}>Login</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
			<Tabs.Content value="password">
				<Card.Root>
					<Card.Header>
						<Card.Title>Register</Card.Title>
						<Card.Description>Make an account</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div class="space-y-1">
							<Label for="current">Email</Label>
							<Input id="current" type="text" bind:value={emailReg} />
						</div>
						<div class="space-y-1">
							<Label for="current">Username</Label>
							<Input id="current" type="text" bind:value={usernameReg} />
						</div>
						<div class="space-y-1">
							<Label for="new">Password</Label>
							<Input id="new" type="password" bind:value={passwordReg} />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button on:click={() => register()}>Register</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>

<!-- <script>
	import { getCookie } from './store.js';
	if (typeof window !== 'undefined') {
		const { getCookie: getTheCookie } = $getCookie;
		if(document.cookie.includes("test")){
			console.log('testadacookie');
			// window.location.href = '/about';
		}
		
	}

	function deletecookie(){
			// Set a cookie with a name, value, and expiration date in the past to delete it
	var pastExpirationDate = new Date();
	pastExpirationDate.setTime(pastExpirationDate.getTime() - 1);

	document.cookie = "test=; expires=" + pastExpirationDate.toUTCString() + "; path=/";

	}
	function makecookie(){
			// Set a cookie with a name, value, and expiration date 24 hours from now
			var expirationDate = new Date();
			expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000)); // 24 hours in milliseconds

			document.cookie = "test=Hello; expires=" + expirationDate.toUTCString() + "; path=/";
			console.log('testmake');
		}
</script>

<h1>Welcome to SvelteKit test</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<button on:click={makecookie}>
	make cookie
</button>
<button on:click={deletecookie}>
	make cookie
</button> -->
