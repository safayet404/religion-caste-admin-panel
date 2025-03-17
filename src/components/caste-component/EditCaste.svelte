<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    export let religionId: string;
    export let casteId: string;
    import { singleReligion } from "../../stores/religions";
    import axios from "axios";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import {
        fetchSingleCaste,
        fetchSingleReligion,
    } from "../../utils/fetchData";

    $: religionId = $page.params.religionId;
    $: casteId = $page.params.casteId;
    let singleReligionData: any = [];
    let newCaste = { name: "", description: "", religionId: religionId };

    onMount(async () => {
        try {
            singleReligionData = await fetchSingleReligion(religionId);

            const casteData = await fetchSingleCaste(casteId);

            newCaste.name = casteData.name;
            newCaste.description = casteData.description;
            newCaste.religionId = casteData.religionId;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    const isLoading = writable(false);

    const addCaste = async () => {
        isLoading.set(true);
        try {
            const res = await axios.put(
                `https://religion-caste-backend.vercel.app/api/castes/update-caste/${casteId}`,
                newCaste,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (res.status === 200 || res.status === 201) {
                const addCaste = res.data;

                singleReligion.update((currentCaste) => [
                    ...currentCaste,
                    addCaste,
                ]);

                newCaste = { name: "", description: "", religionId: "" };

                goto(`/castes/${religionId}`);
                showToast("Caste Updated Successfully", "success");
            } else {
                console.log("Unexpected response status:", res.status);
            }
        } catch (error: any) {
            console.error(
                "Error adding religion:",
                error.response ? error.response.data : error,
            );
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
