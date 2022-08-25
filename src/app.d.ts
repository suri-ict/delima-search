/// <reference types="@sveltejs/kit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	interface Locals {
		user: import('$lib/types.d').User;
	}
	// interface Platform {}
	interface Session {
		user: import('$lib/types.d').User;
	}
	// interface Stuff {}
}

declare module 'svelte-table';
