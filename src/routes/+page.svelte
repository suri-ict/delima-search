<script lang="ts">
	import { delima } from '$lib/records/delima';
	import type { delimaUser, AuthUser } from '$lib/types';
	import { clickToCopy } from '$lib/action/clickToCopy';
	import { focusSearchInput } from '$lib/stores';
	import type { LayoutServerData } from './$types';
	import logo from '/src/favicon.svg';

	export let data: LayoutServerData;
	const { username } = data.user as AuthUser;
	let q = '';
	let list = delima;
	let startsWith = (item: delimaUser, query: string) =>
		item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
	let searchInput: HTMLInputElement;
	$: filteredList = q && q.length ? list.filter((item) => startsWith(item, q)) : list;

	$: if ($focusSearchInput) {
		searchInput.focus();
		focusSearchInput.set(false);
	}
</script>

<section class="flex gap-5 justify-between">
	<h1 class="pl-2">Search Delima Accounts</h1>
	{#if username}
		Akses: {username.toUpperCase()}
	{/if}
	<img class=" w-5 h-5" src={logo} alt="logo" />
</section>
<section class="mt-2 mb-4">
	<input
		bind:this={searchInput}
		placeholder="Type Nama.."
		class="h-14 w-full rounded-md p-4 text-lg shadow-md"
		bind:value={q}
		type="text"
	/>
</section>

<ul class="grid list-none gap-2">
	{#each filteredList as { name, prefix, email }}
		{@const prefixColor = prefix == 'KPM-Guru' ? 'text-gray-500' : 'text-red-500'}
		<button
			class="group relative rounded-md bg-white p-4 text-left ring-green-200 transition focus:outline-none   focus:ring"
		>
			<sup
				class="absolute right-2 top-4 text-opacity-20 transition-colors group-hover:text-opacity-80 {prefixColor} "
				>{prefix}</sup
			>
			<p
				use:clickToCopy
				class=" mb-2 cursor-pointer font-semibold transition-colors hover:text-green-500"
			>
				{name}
			</p>
			<p use:clickToCopy class="cursor-pointer hover:text-green-700">
				{email}
			</p>
		</button>
	{:else}
		<p>There is no person matching '<b>{q}</b>' that can be displayed.</p>
	{/each}
</ul>
