<script>
	export let icon;
	export let label;
</script>

<div class="flex items-center">
	<svelte:component this={icon} />
	{label}
</div>
