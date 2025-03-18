<script lang="ts">
    import {
        errorMessage,
        religions,
        selectedCasteId,
        selectedReligionId,
        singleReligion,
    } from "../../stores/religions";
    import { onDestroy, onMount } from "svelte";
    import { loadCastes, loadReligions } from "./religionAndCasteFetch";
    let currentErrorMessage: string | null = null;

    const unsubscribe = errorMessage.subscribe((value) => {
        currentErrorMessage = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    let selectedReligionName: string | null = null;
    let selectedCasteName: string | null = null;

    $: {
        const selectedReligion = $religions.find(
            (r) => r._id === $selectedReligionId,
        );

        selectedReligionName = selectedReligion ? selectedReligion.name : null;
    }

    $: {
        const selectedCaste = $singleReligion.find(
            (c) => c._id === $selectedCasteId,
        );

        selectedCasteName = selectedCaste ? selectedCaste.name : null;
    }

    onMount(() => {
        loadReligions();
    });

    $: if ($selectedReligionId) {
        loadCastes($selectedReligionId);
    }
</script>

<section class="container mx-auto">
    <div class="mx-auto">
        <div class="grid grid-cols-2 bg-[#14646f] p-10 rounded-md">
            <div class="flex flex-col">
                <label for="religion">Select a Religion</label>
                <select
                    bind:value={$selectedReligionId}
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
                    bind:value={$selectedCasteId}
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
