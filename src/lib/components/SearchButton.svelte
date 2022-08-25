<script lang="ts">
	export let y: number;
	import { fly } from 'svelte/transition';

	export let isScrolling: boolean;
</script>

{#if y > 80 && !isScrolling}
	<button
		transition:fly={{ y: 20, duration: 300 }}
		class="group hover:ring-4 ring-green-400 transition ring-1 fixed bottom-5 right-4 lg:right-1/2 lg:transform lg:translate-x-1/2 w-14 h-14 lg:w-20 lg:h-20 grid place-items-center rounded-md bg-white shadow-lg"
		on:click
	>
		<svg
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="w-8 h-8 lg:w-12 lg:h-12 fill-green-500 group-hover:fill-green-600 group-hover:scale-110 transition ease-out "
		>
			><path
				d="M 9 2 C 5.1458495 2 2 5.1458524 2 9 C 2 12.854148 5.1458495 16 9 16 C 10.747999 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747997 16 9 C 16 5.1458524 12.854151 2 9 2 z M 9 4 C 11.773271 4 14 6.2267307 14 9 C 14 11.773269 11.773271 14 9 14 C 6.226729 14 4 11.773269 4 9 C 4 6.2267307 6.226729 4 9 4 z"
			/></svg
		>
	</button>
{/if}
