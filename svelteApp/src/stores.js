import { writable } from "svelte/store";

export const user = writable({});
export const isLoggedIn = writable(false);
export const participants = writable({});
export const filteredParks = writable([]);