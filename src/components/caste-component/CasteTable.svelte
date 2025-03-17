<script lang="ts">
    import { onMount } from "svelte";
    import { singleReligion } from "../../stores/religions";
    import { loadCastes } from "../religion and caste/religionAndCasteFetch";
    import { page } from "$app/stores";
    import { deleteCaste } from "../../utils/deleteOperation";

    export let id: string;
    $: id = $page.params.id;

    let loading = false;

    onMount(async () => {
        loading = true;

        try {
            await loadCastes(id);
        } catch (error) {
            console.error("Failed to load castes:", error);
        } finally {
            loading = false;
        }
    });
</script>

<section>
    <div class="container mx-auto p-4">
        {#if loading}
            <div class="spinner mx-auto mt-5"></div>
        {:else}
            <table class="min-w-full table-fixed divide-y divide-[#f87171]">
                <thead>
                    <tr>
                        <th
                            class="w-[10%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        ></th>
                        <th
                            class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Name</th
                        >
                        <th
                            class="w-[40%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Description</th
                        >
                        <th
                            class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Action</th
                        >
                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-[#f87171]">
                    {#each $singleReligion as caste}
                        <tr>
                            <td class="w-[10%] px-6 py-3"
                                ><input type="checkbox" /></td
                            >
                            <td class="w-[25%] px-6 py-3 font-semibold"
                                >{caste?.name}</td
                            >
                            <td class="w-[45%] px-6 py-3"
                                >{caste?.description}</td
                            >
                            <td class="w-[25%] px-6 py-3 font-semibold text-sm">
                                <button
                                    ><a href={`/edit-caste/${id}/${caste._id}`}
                                        >Edit</a
                                    ></button
                                >
                                <button on:click={() => deleteCaste(caste?._id)}
                                    >Delete</button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</section>

<style>
    .spinner {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    td button {
        background-color: #ef4c53;
        color: white;
        padding: 4px;
        border-radius: 4px;
    }
</style>
