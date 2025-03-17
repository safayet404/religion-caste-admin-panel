
import { errorMessage, religions, selectedCasteId, selectedReligionId, singleReligion } from "../../stores/religions";
import type { Caste, Religion } from "../../types/religion";
import { fetchCastesByReligion, fetchReligions } from "../../utils/fetchData";
const cachedReligions: Religion[] = [];

const cachedCastes: Record<string, Caste[]> = {};

export const loadReligions = async () => {

    if (cachedReligions.length > 0) {

        religions.set(cachedReligions);

        return;

    }


    try {

        const data = await fetchReligions();

        cachedReligions.push(...data);

        religions.set(data);

        if (data.length > 0) {

            selectedReligionId.set(data[0]._id);

        }

    } catch (error) {

        errorMessage.set("Failed to fetch religions. Please try again later.");

    }

};

export const loadCastes = async (religionId: string) => {

    if (cachedCastes[religionId]) {

        singleReligion.set(cachedCastes[religionId]);

        return;

    }


    try {

        const castesData = await fetchCastesByReligion(religionId);

        cachedCastes[religionId] = castesData;

        singleReligion.set(castesData);

        if (castesData.length > 0) {

            selectedCasteId.set(castesData[0]._id);

        } else {

            selectedCasteId.set(null);

        }

    } catch (error) {

        errorMessage.set("Failed to fetch castes. Please try again later.");

    }

};


export const addReligionToCache = (newReligion: Religion) => {

    cachedReligions.push(newReligion);

    religions.set(cachedReligions);

};
