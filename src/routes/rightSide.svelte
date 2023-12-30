<script>
	import { Input } from '$lib/components/ui/input';
	import Search from './seachResult.svelte';
	import { Mail } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { getCookie } from './helper';
	import Preview from './messagePreview.svelte';
	let userInput, searchResult, messages;
	onMount(() => {
		getLatestMessage();
	});
	const debouncedAPICall = debounce(callAPI, 500); // Adjust the delay as needed
	async function callAPI() {
		if (userInput == '') {
			searchResult = null;
			return;
		}
		console.log('API called with:', userInput);
		try {
			const response = await fetch(
				'https://quacker-1fcd875a5802.herokuapp.com/api/search/' + userInput,
				{
					method: 'GET'
				}
			);
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				searchResult = jsonData.list;
				// let uid = jsonData.UserID;
				// makecookie('uid', uid, 3);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	function search() {
		debouncedAPICall();
	}

	function debounce(func, delay) {
		let timeoutId;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func.apply(context, args), delay);
		};
	}

	async function getLatestMessage() {
		const formData = new FormData();
		formData.append('RequesterID', getCookie('uid'));
		try {
			const response = await fetch('https://quacker-1fcd875a5802.herokuapp.com/api/getMessages', {
				method: 'POST',
				body: formData
			});
			// Check if the request was successful (status code 2xx)
			if (response.ok) {
				const jsonData = await response.json();
				messages = jsonData.latestMessages;
				console.log(jsonData.latestMessages);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<div class="flex space-y-1 w-1/4 flex-col">
	<div class="flex-1">
		<Input
			on:input={() => search()}
			type="search"
			placeholder="search"
			class="max-w-xs"
			bind:value={userInput}
		/>
		<div class="mt-4">
			{#if searchResult != null}
				{#each searchResult as search}
					<Search {search} />
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex-1 justify-between h-1/2">
		<div class="flex items-center">
			<Mail class="me-2" />
			<div class="flex h-5 items-center">Direct Messages</div>
		</div>
		<div class="mt-5 mb-3 h-4/5 overflow-y-scroll">
			{#if messages != null}
				{#each messages as message}
					<Preview {message} />
				{/each}
			{:else}
				Loading...
			{/if}
		</div>
	</div>
</div>
