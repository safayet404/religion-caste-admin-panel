<script lang="ts">
    import { onMount } from "svelte";
    import { showToast } from "../../service/toastService";
    import { writable } from "svelte/store";
    import { createPerson } from "../../utils/createOperation";
    import Calender from "../Calender.svelte";
    import ReligionAndCaste from "../religion and caste/ReligionAndCaste.svelte";
    import {
        selectedCasteId,
        selectedReligionId,
    } from "../../stores/religions";
    import { dateOfBirth, persons } from "../../stores/persons";
    import { fetchPerosns } from "../../utils/fetchData";
    import type { Persons } from "../../types/persons";

    let newPerson: {
        name: string;
        email: string;
        company: string;
        job: string;
        dateOfBirth: string | null;
        religion: string | null;
        caste: string | null;
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

    const addPerosn = async () => {
        isLoading.set(true);
        try {
            const emailExists = $persons.some(
                (person) => person.email === newPerson.email,
            );
            if (emailExists) {
                showToast(
                    "Email already exists. Please use a different one.",
                    "error",
                );
                return;
            }
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
            console.log("Adding person with data:", newPerson);
            const addedPerson = await createPerson(newPerson);
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

            showToast("Person Added Successfully", "success");

            selectedReligionId.set("");
            selectedCasteId.set("");
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

                <Calender />
                <ReligionAndCaste />

                <div class="flex flex-col">
                    <button
                        type="submit"
                        class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                        disabled={$isLoading}
                    >
                        {$isLoading ? "Person Adding ...." : "Add Person"}
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>
