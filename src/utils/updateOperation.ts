import axios from "axios";

export const updateReligion = async (religionId: string, data: any) => {
    try {
        const response = await axios.put(`https://religion-caste-backend.onrender.com/api/religions/update-religion/${religionId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};
export const updatePerson = async (userId: string, data: any) => {
    try {
        const response = await axios.put(`https://religion-caste-backend.onrender.com/api/user/update-user/${userId}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};
