<script lang="ts">
    import AddCaste from "../../../components/caste-component/AddCaste.svelte";
    import CasteTable from "../../../components/caste-component/CasteTable.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<AddCaste id={data?.id as string} />
<CasteTable id={data?.id as string} />
