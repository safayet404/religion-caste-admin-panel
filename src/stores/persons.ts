import { writable } from "svelte/store";

import type { Persons } from "../types/persons";


export const persons = writable<Persons[]>([]);
export const dateOfBirth = writable<string | null>(null);
