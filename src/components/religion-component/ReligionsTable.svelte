<script lang="ts">
    import { onMount } from "svelte";
    import type { Religion } from "../../types/religion";
    import { religions } from "../../stores/religions";
    import { fetchReligions } from "../../utils/fetchData";
    import { deleteReligion } from "../../utils/deleteOperation";
    let loading = false;
    onMount(async () => {
        if ($religions.length === 0) {
            loading = true;

            try {
                const data: Religion[] = await fetchReligions();

                religions.set(data);
            } catch (error) {
                console.error("Failed to fetch religions:", error);
            } finally {
                loading = false;
            }
        }
    });
</script>

<section>
    <div class="container mx-auto p-4">
        {#if loading}
            <div class="spinner mx-auto mt-5"></div>
        {:else}
            <table class="min-w-full table-fixed divide-y divide-[#3f00e7]">
                <thead>
                    <tr>
                        <th
                            class="w-[5%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        ></th>
                        <th
                            class="w-[15%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Name</th
                        >
                        <th
                            class="w-[45%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Description</th
                        >
                        <th
                            class="w-[5%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >isActive</th
                        >
                        <th
                            class="w-[30%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Action</th
                        >
                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-[#3f00e7]">
                    {#each $religions as religion}
                        <tr>
                            <td class="w-[5%] px-6 py-3"
                                ><input type="checkbox" /></td
                            >
                            <td
                                class="w-[15%] px-6 py-3 text-left font-semibold"
                                >{religion?.name}</td
                            >
                            <td class="w-[45%] px-6 py-3 text-left"
                                >{religion?.description}</td
                            >
                            <td class="w-[5%] px-6 py-3 text-left"
                                >{religion?.isActive ? "Yes" : "No"}</td
                            >
                            <td class="w-[30%] px-6 py-3 font-semibold text-sm">
                                <button
                                    ><a href={`/castes/${religion?._id}`}
                                        >Caste</a
                                    ></button
                                >
                                <button
                                    ><a href={`/edit/${religion?._id}`}>Edit</a
                                    ></button
                                >
                                <button
                                    on:click={() =>
                                        deleteReligion(religion?._id)}
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
