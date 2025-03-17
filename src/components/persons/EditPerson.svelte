<script lang="ts">
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    import { writable } from "svelte/store";
    import { createPerson, createReligion } from "../../utils/createOperation";
    import Calender from "../Calender.svelte";
    import ReligionAndCaste from "../religion and caste/ReligionAndCaste.svelte";
    import {
        selectedCasteId,
        selectedReligionId,
    } from "../../stores/religions";
    import { dateOfBirth, persons } from "../../stores/persons";
    import { fetchPerosns, fetchSinglePerson } from "../../utils/fetchData";
    import type { Persons } from "../../types/persons";
    import { page } from "$app/stores";
    import { updatePerson } from "../../utils/updateOperation";
    import { goto } from "$app/navigation";
    export let id: string;

    $: id = $page.params.id;
    let singleUser: any = null;
    let birthDate: string | null = null;
    let newPerson: {
        name: string;
        email: string;
        company: string;
        job: string;
        dateOfBirth: string | null; // Allow null
        religion: string | null; // Allow null
        caste: string | null; // Allow null
    } = {
        name: "",
        email: "",
        company: "",
        job: "",
        dateOfBirth: null,
        religion: null,
        caste: null,
    };
    const isLoading = writable(false);

    onMount(() => {
        newPerson = {
            name: "",
            email: "",
            company: "",
            job: "",
            dateOfBirth: "",
            religion: "",
            caste: "",
        };
    });

    onMount(async () => {
        try {
            const data: Persons[] = await fetchSinglePerson(id);
            console.log("Fetched single user data:", data);

            if (data) {
                singleUser = data;
            } else {
                console.log("No user found or data is empty");
            }
        } catch (error) {
            console.error("Error fetching single user:", error);
        }
    });

    $: if (singleUser) {
        birthDate = singleUser.dateOfBirth || null;
        newPerson = {
            name: singleUser.name,
            email: singleUser.email || "",
            company: singleUser.company || "",
            job: singleUser.job || "",
            dateOfBirth: singleUser.dateOfBirth || "",
            religion: singleUser.religion || null,
            caste: singleUser.caste || null,
        };
    }

    const addPerosn = async () => {
        isLoading.set(true);
        try {
            newPerson.dateOfBirth = $dateOfBirth;

            newPerson.religion = $selectedReligionId;

            newPerson.caste = $selectedCasteId;
            if (!newPerson.dateOfBirth) {
                showToast("Date of birth is required", "error");
                return;
            }

            if (!$selectedReligionId) {
                showToast("Religion is required", "error");
                return;
            }

            if (!$selectedCasteId) {
                showToast("Caste is required", "error");
                return;
            }
            const addedPerson = await updatePerson(id, newPerson);
            await fetchPerosnsAgain();

            newPerson = {
                name: "",
                email: "",
                company: "",
                job: "",
                dateOfBirth: "",
                religion: "",
                caste: "",
            };
            dateOfBirth.set(null);

            showToast("Person Updated Successfully", "success");
            goto("/persons");
        } catch (error) {
            console.log(error);

            showToast("Something Went Wrong.Try Again", "error");
        } finally {
            isLoading.set(false);
        }
    };

    const fetchPerosnsAgain = async () => {
        const data: Persons[] = await fetchPerosns();
        persons.set(data);
    };
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Person Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addPerosn}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Name</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={newPerson.name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Email</label>
                    <input
                        type="email"
                        name="email"
                        bind:value={newPerson.email}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Company</label>
                    <input
                        type="text"
                        name="company"
                        bind:value={newPerson.company}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Job</label>
                    <input
                        type="text"
                        name="job"
                        bind:value={newPerson.job}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>

                <Calender {birthDate} />
                <ReligionAndCaste />

                <div class="flex flex-col">
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                            disabled={$isLoading}
                        >
                            {$isLoading ? "Saving ...." : "Save"}
                        </button>

                        <a
                            href="/persons"
                            class="bg-[#f100b7] p-2 w-full text-white text-center rounded-md"
                            >Cancel</a
                        >
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
