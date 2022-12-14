<script lang="ts">
	import { blur } from 'svelte/transition';
	import { delima } from '$lib/records/delima';
	import type { delimaUser, AuthUser } from '$lib/types';
	import { clickToCopy } from '$lib/action/clickToCopy';
	import { focusSearchInput } from '$lib/stores';
	import type { LayoutServerData } from './$types';
	import logo from '/src/favicon.svg';
	import BackspaceButton from '$lib/components/BackspaceButton.svelte';
	import { Fzf } from 'fzf';
	import { onMount } from 'svelte';
	export let data: LayoutServerData;
	const { username } = data.user as AuthUser;
	let q = '';
	let list = delima;
	let toggleMicrosoft = false;

	let startsWith = (item: delimaUser, query: string) =>
		item.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
	let searchInput: HTMLInputElement;

	$: if ($focusSearchInput) {
		searchInput.focus();
		focusSearchInput.set(false);
	}

	const emailStartWithgm = (email: string) => {
		return email.startsWith('g-') || email.startsWith('m-');
	};

	$: {
		if (!toggleMicrosoft) {
			list = list.map((item) => {
				if (emailStartWithgm(item.email)) {
					item.email = item.email.replace('@sarawak.moe-dl.edu.my', '@moe-dl.edu.my');
				}
				return item;
			});
		} else {
			list = list.map((item) => {
				if (emailStartWithgm(item.email)) {
					item.email = item.email.replace('@moe-dl.edu.my', '@sarawak.moe-dl.edu.my');
				}
				return item;
			});
		}
	}

	const fzf = new Fzf(list, { selector: (item) => `${item.name} (${item.email})` });

	$: entries = fzf.find(q);
	$: filteredList = q && q.length ? entries.map((entry) => entry.item) : list;

	$: show = q.length > 0;
</script>

<section class="flex gap-5 justify-between">
	<h1 class="pl-2">Search Delima Accounts</h1>
	{#if username}
		Akses: {username.toUpperCase()}
	{/if}
	<img class=" w-5 h-5" src={logo} alt="logo" />
	<button on:click={() => (toggleMicrosoft = !toggleMicrosoft)}>
		{#if toggleMicrosoft}
			<span in:blur|local>✅</span>
		{:else}
			<span in:blur|local>🔲</span>
		{/if}

		Microsoft</button
	>
</section>
<section class="mt-2 mb-4 relative flex items-center">
	<input
		bind:this={searchInput}
		placeholder="Type nama atau email.."
		class="h-14 w-full rounded-md pl-4 pr-20 py-4 text-lg shadow-md"
		bind:value={q}
		type="text"
	/>
	<BackspaceButton
		on:click={() => {
			q = '';
			searchInput.focus();
		}}
		{show}
		class="w-10 h-10 text-gray-200 absolute hover:text-gray-400  right-6 top-2"
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
