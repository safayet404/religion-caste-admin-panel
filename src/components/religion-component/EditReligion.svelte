<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    export let id: string;
    import { religions } from "../../stores/religions";
    import type { Religion } from "../../types/religion";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { updateReligion } from "../../utils/updateOperation";
    import { fetchReligions, fetchSingleReligion } from "../../utils/fetchData";

    $: id = $page.params.id;
    let singleReligion: any = [];
    let newReligion = { name: "", description: "", isActive: false };
    onMount(async () => {
        const data: Religion[] = await fetchSingleReligion(id);

        singleReligion = data;
    });

    $: if (singleReligion) {
        newReligion = {
            name: singleReligion.name,
            description: singleReligion.description,
            isActive: singleReligion.isActive,
        };
    }

    const isLoading = writable(false);

    const addReligion = async () => {
        isLoading.set(true);
        try {
            const res = await updateReligion(id, newReligion);
            const updatedReligion = res.data;

            religions.update((currentReligions) =>
                currentReligions.map((religion) =>
                    religion._id === id ? updatedReligion : religion,
                ),
            );

            // Fetch updated religions and set them in store
            const updatedReligions = await fetchReligions();
            religions.set(updatedReligions);

            newReligion = { name: "", description: "", isActive: false };

            goto("/religions");
            showToast("Religion Updated Successfully", "success");
        } catch (error: any) {
            console.error(
                "Error updating religion:",
                error.response ? error.response.data : error,
            );
        } finally {
            isLoading.set(false);
        }
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
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                            disabled={$isLoading}
                        >
                            {$isLoading ? "Saving ...." : "Save"}
                        </button>

                        <a
                            href="/religions"
                            class="bg-[#f100b7] p-2 w-full text-white text-center rounded-md"
                            >Cancel</a
                        >
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
