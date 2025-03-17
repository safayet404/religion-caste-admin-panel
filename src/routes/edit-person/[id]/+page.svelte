<script lang="ts">
    import EditPerson from "../../../components/persons/EditPerson.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<EditPerson id={data.id as string} />
