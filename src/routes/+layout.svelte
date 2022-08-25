<script lang="ts">
	import '../app.postcss';
	import SearchButton from '$lib/components/SearchButton.svelte';
	import { focusSearchInput } from '$lib/stores';
	import { useDebounce } from '$lib/utils';
	let y: number;
	let isScrolling = false;

	function handleClick(e: MouseEvent) {
		y = 0;
		$focusSearchInput = true;
	}

	function handleOnScroll(e: Event) {
		isScrolling = true;
		onScrollEnd(e);
	}
	const onScrollEnd = useDebounce(() => {
		isScrolling = false;
	}, 500);
</script>

<svelte:window bind:scrollY={y} on:scroll={handleOnScroll} />
<main class="text-bold p-4 relative w-screen sm:w-[65vw] lg:w-[50vw] ">
	<slot />
	<SearchButton {y} {isScrolling} on:click={handleClick} />
</main>

<footer class="bg-stone-50 p-2 text-center text-sm text-gray-400">© SK SURI</footer>

<style>
	:global(body) {
		@apply bg-stone-100 grid place-content-center;
	}
</style>
