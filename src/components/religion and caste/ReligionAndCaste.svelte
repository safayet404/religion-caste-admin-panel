<script lang="ts">
    import ReligionSelector from "./ReligionSelector.svelte";
    import CasteSelector from "./CasteSelector.svelte";
    import {
        errorMessage,
        religions,
        selectedCasteId,
        selectedReligionId,
        singleReligion,
    } from "../../stores/religions";
    import { onDestroy } from "svelte";
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
</script>

<section class="container mx-auto">
    <div class="mx-auto">
        {#if currentErrorMessage}
            <div class="text-red-500">{currentErrorMessage}</div>
        {/if}

        <div class="grid grid-cols-2 bg-[#14646f] p-10 rounded-md">
            <ReligionSelector />
            <CasteSelector />
        </div>
    </div>
</section>
