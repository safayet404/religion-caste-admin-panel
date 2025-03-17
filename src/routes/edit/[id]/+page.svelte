<script lang="ts">
    import EditReligion from "../../../components/religion-component/EditReligion.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<EditReligion id={data?.id as string} />
