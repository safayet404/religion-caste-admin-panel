<script lang="ts">
    import EditCaste from "../../../../components/caste-component/EditCaste.svelte";

    export let data;

    console.log(data);
</script>

<EditCaste
    religionId={data?.religionId as string}
    casteId={data?.casteId as string}
/>
