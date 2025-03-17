<script lang="ts">
    import { onMount } from "svelte";
    import { religions } from "../../stores/religions";
    import { fetchPerosns } from "../../utils/fetchData";
    import { deletePerson, deleteReligion } from "../../utils/deleteOperation";
    import type { Persons } from "../../types/persons";
    import { persons } from "../../stores/persons";
    let loading = false;
    onMount(async () => {
        if ($religions.length === 0) {
            loading = true;

            try {
                const data: Persons[] = await fetchPerosns();

                persons.set(data);
            } catch (error) {
                console.error("Failed to fetch persons:", error);
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
                            class="w-[15%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Job</th
                        >
                        <th
                            class="w-[15%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Email</th
                        >
                        <th
                            class="w-[17%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Religion</th
                        >
                        <th
                            class="w-[18%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Caste</th
                        >
                        <th
                            class="w-[15%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                            >Action</th
                        >
                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-[#3f00e7]">
                    {#each $persons as person}
                        <tr>
                            <td class="w-[5%] px-6 py-3"
                                ><input type="checkbox" /></td
                            >
                            <td
                                class="w-[15%] px-6 py-3 text-left font-semibold"
                                >{person?.name}</td
                            >
                            <td class="w-[15%] px-6 py-3 text-left"
                                ><div class="flex flex-col">
                                    <span> {person?.company}</span>
                                    <span class="underline">
                                        {person?.job}</span
                                    >
                                </div></td
                            >
                            <td class="w-[15%] px-6 py-3 text-left"
                                >{person?.email}</td
                            >
                            <td class="w-[17%] px-6 py-3 text-left"
                                >{person?.religion}</td
                            >
                            <td class="w-[18%] px-6 py-3 text-left"
                                >{person?.caste}</td
                            >
                            <td class="w-[15%] px-6 py-3 font-semibold text-sm">
                                <button
                                    ><a href={`/edit-person/${person?._id}`}
                                        >Edit</a
                                    ></button
                                >
                                <button
                                    on:click={() => deletePerson(person?._id)}
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
