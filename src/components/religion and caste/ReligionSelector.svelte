<script lang="ts">
    import { onMount } from "svelte";
    import { loadReligions } from "./religionAndCasteFetch";
    import { religions, selectedReligionId } from "../../stores/religions";

    onMount(() => {
        loadReligions();
    });
</script>

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
