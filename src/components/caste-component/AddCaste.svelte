<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    export let id: string;
    import { singleReligion } from "../../stores/religions";
    import type { Religion } from "../../types/religion";
    import { writable } from "svelte/store";
    import { fetchSingleReligion } from "../../utils/fetchData";
    import { createCaste } from "../../utils/createOperation";

    $: id = $page.params.id;
    let singleReligionData: any = [];
    let newCaste = { name: "", description: "", religionId: id };
    onMount(async () => {
        const data: Religion[] = await fetchSingleReligion(id);

        singleReligionData = data;
    });

    const isLoading = writable(false);
    onMount(() => {
        newCaste = { name: "", description: "", religionId: id };
    });

    const addCaste = async () => {
        isLoading.set(true);
        try {
            const addedCaste = await createCaste(newCaste);

            singleReligion.update((currentCastes) => [
                ...currentCastes,
                addedCaste,
            ]);

            newCaste = { name: "", description: "", religionId: id };

            showToast("Caste Added Successfully", "success");
        } catch (error) {
            console.error("Error adding caste:", error);
        } finally {
            isLoading.set(false);
        }
    };
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="mt-10 font-bold text-xl">Caste Page</h1>
        <h1>
            Selected Religion {singleReligionData?._id} , {singleReligionData?.name}
        </h1>
        <p class="font-bold text-lg md:text-4xl mt-10">
            Caste Manager for {singleReligionData?.name}
        </p>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addCaste}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Caste</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={newCaste.name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Description</label>
                    <input
                        type="text"
                        name="description"
                        bind:value={newCaste.description}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>

                <div class="flex flex-col">
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                            disabled={$isLoading}
                        >
                            {$isLoading ? "Adding Caste ...." : "Add Caste"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
