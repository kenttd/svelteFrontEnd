<script>
	import { Lock } from 'lucide-svelte';
</script>

<div class="w-full h-full items-center">
	<Lock size="200" />
	<h1 class="text-xxl">Forbidden</h1>
	<h2>You don't have permission to access this page.</h2>
</div>

<style>
	.h-full {
		position: absolute;
		top: 50%;
		left: 50%;
	}
</style>
