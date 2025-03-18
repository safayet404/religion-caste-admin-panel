import { editCasteId, editReligionId, errorMessage, religions, selectedCasteId, selectedReligionId, singleReligion } from "../../stores/religions";
import type { Caste, Religion } from "../../types/religion";
import { fetchCastesByReligion, fetchReligions } from "../../utils/fetchData";

const cachedReligions: Religion[] = [];
const cachedCastes: Record<string, Caste[]> = {};


let DEFAULT_RELIGION_ID: string | null = null;
let DEFAULT_CASTE_ID: string | null = null;

editReligionId.subscribe(value => {
    DEFAULT_RELIGION_ID = value;
});

editCasteId.subscribe(value => {
    DEFAULT_CASTE_ID = value;
});
export const editReligions = async () => {


    try {
        const data = await fetchReligions();
        cachedReligions.push(...data);
        religions.set(data);

        if (data.length > 0) {
            const defaultReligion = data.find(r => r._id === DEFAULT_RELIGION_ID);
            editReligionId.set(defaultReligion._id);
        }
    } catch (error) {
        errorMessage.set("Failed to fetch religions. Please try again later.");
    }
};

export const editCastes = async (religionId: string) => {


    try {
        const castesData = await fetchCastesByReligion(religionId);
        cachedCastes[religionId] = castesData;
        singleReligion.set(castesData);

        if (castesData.length > 0) {
            const defaultCaste = castesData.find(c => c._id === DEFAULT_CASTE_ID);
            editCasteId.set(defaultCaste._id);
        }
    } catch (error) {
        errorMessage.set("Failed to fetch castes. Please try again later.");
    }
};

export const addReligionToCache = (newReligion: Religion) => {
    cachedReligions.push(newReligion);
    religions.set(cachedReligions);
};
