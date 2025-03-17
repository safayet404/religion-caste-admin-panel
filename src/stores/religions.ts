import { writable } from "svelte/store";
import type { Religion, Caste } from "../types/religion";

export const religions = writable<Religion[]>([]);
export const singleReligion = writable<Caste[]>([]);
export const selectedReligionId = writable<string | null>(null);
export const selectedCasteId = writable<string | null>(null);
export const errorMessage = writable<string | null>(null);