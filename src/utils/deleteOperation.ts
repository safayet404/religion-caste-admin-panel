import axios from 'axios';
import { religions, singleReligion } from '../stores/religions';
import { showToast } from '../service/toastService';
import { persons } from '../stores/persons';

export const deleteReligion = async (id: string) => {
    try {
        await axios.delete(
            `https://religion-caste-backend.onrender.com/api/religions/delete-religion/${id}`,
        );

        religions.update((religionList) =>
            religionList.filter((religion) => religion._id !== id),
        );

        showToast("Religion deleted successfully", "success");
    } catch (error) {
        console.error("Error deleting religion:", error);
        showToast("Error deleting religion", "error");
    }
};
export const deletePerson = async (id: string) => {
    try {
        await axios.delete(
            `https://religion-caste-backend.onrender.com/api/user/delete-user/${id}`,
        );

        persons.update((personList) =>
            personList.filter((person) => person._id !== id),
        );

        showToast("User deleted successfully", "success");
    } catch (error) {
        console.error("Error deleting religion:", error);
        showToast("Error deleting religion", "error");
    }
};

export const deleteCaste = async (id: string) => {
    try {
        await axios.delete(
            `https://religion-caste-backend.onrender.com/api/castes/delete-caste/${id}`,
        );
        singleReligion.update((casteList) =>
            casteList.filter((caste) => caste._id !== id),
        );
        showToast("Caste deleted successfully", "success");
    } catch (error) {
        console.log("error deleting caste", error);
    }
};
