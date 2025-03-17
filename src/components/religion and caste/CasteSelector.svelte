<script lang="ts">
    import {
        selectedCasteId,
        selectedReligionId,
        singleReligion,
    } from "../../stores/religions";
    import { loadCastes } from "./religionAndCasteFetch";
    $: if ($selectedReligionId) {
        loadCastes($selectedReligionId);
    }
</script>

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
