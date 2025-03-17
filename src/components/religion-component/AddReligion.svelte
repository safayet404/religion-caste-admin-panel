<script lang="ts">
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    import { religions } from "../../stores/religions";
    import type { Religion } from "../../types/religion";
    import { writable } from "svelte/store";
    import { fetchReligions } from "../../utils/fetchData";
    import { createReligion } from "../../utils/createOperation";
    import { addReligionToCache } from "../religion and caste/religionAndCasteFetch";

    let newReligion = {
        name: "",
        description: "",
        isActive: false,
    };

    const isLoading = writable(false);

    onMount(() => {
        newReligion = { name: "", description: "", isActive: false };
    });

    const addReligion = async () => {
        isLoading.set(true);
        try {
            const addedReligion = await createReligion(newReligion);

            addReligionToCache(addedReligion);

            await fetchReligionAgain();
            newReligion = { name: "", description: "", isActive: false };

            showToast("Religion Added Successfully", "success");
        } catch (error) {
            console.error("Error adding religion:", error);
        } finally {
            isLoading.set(false);
        }
    };

    const fetchReligionAgain = async () => {
        const data: Religion[] = await fetchReligions();
        religions.set(data);
    };
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Religion Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addReligion}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Religion</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={newReligion.name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Description</label>
                    <input
                        type="text"
                        name="description"
                        bind:value={newReligion.description}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Active</label>
                    <input
                        type="checkbox"
                        bind:checked={newReligion.isActive}
                        class="w-5 bg-[#3f00e7] h-5"
                    />
                </div>
                <div class="flex flex-col">
                    <button
                        type="submit"
                        class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                        disabled={$isLoading}
                    >
                        {$isLoading ? "Religion Adding ...." : "Add Religion"}
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>
