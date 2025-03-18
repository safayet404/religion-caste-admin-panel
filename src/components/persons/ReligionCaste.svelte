<script lang="ts">
    import {
        editCasteId,
        editReligionId,
        errorMessage,
        religions,
        singleReligion,
    } from "../../stores/religions";
    import { onDestroy, onMount } from "svelte";

    import { editCastes, editReligions } from "./personReligionAndCaste";
    let currentErrorMessage: string | null = null;

    const unsubscribe = errorMessage.subscribe((value) => {
        currentErrorMessage = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    onMount(() => {
        editReligions();
    });

    $: if ($editReligionId) {
        editCastes($editReligionId);
    }
</script>

<section class="container mx-auto">
    <div class="mx-auto">
        <div class="grid grid-cols-2 bg-[#14646f] p-10 rounded-md">
            <div class="flex flex-col">
                <label for="religion">Select a Religion</label>
                <select
                    bind:value={$editReligionId}
                    class="rounded-md p-2 w-[50%] mt-5"
                >
                    {#each $religions as religion}
                        <option value={religion._id}>{religion.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col">
                <label for="caste">Select a Caste</label>
                <select
                    bind:value={$editCasteId}
                    disabled={!$singleReligion.length}
                    class="rounded-md p-2 w-[50%] mt-5"
                >
                    {#each $singleReligion as caste}
                        <option value={caste._id}>{caste.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</section>
