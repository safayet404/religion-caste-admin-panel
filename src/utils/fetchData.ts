export const fetchReligions = async () => {
    try {
        const res = await fetch("https://religion-caste-backend.onrender.com/api/religions/get-religions");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching religions:", error);
        throw error;
    }
};

export const fetchCastesByReligion = async (religionId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.onrender.com/api/religions/single-religion/${religionId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data?.castes || [];
    } catch (error) {
        console.error("Error fetching castes:", error);
        throw error;
    }
};

export const fetchSingleReligion = async (religionId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.onrender.com/api/religions/single-religion/${religionId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching single religion:", error);
        throw error;
    }
};

export const fetchSingleCaste = async (casteId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.onrender.com/api/castes/single-caste/${casteId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching single caste:", error);
        throw error;
    }
};


export const fetchPerosns = async () => {
    try {
        const res = await fetch("https://religion-caste-backend.onrender.com/api/user/get-users");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching religions:", error);
        throw error;
    }
};

export const fetchSinglePerson = async (personId: string) => {
    try {
        const res = await fetch(`https://religion-caste-backend.onrender.com/api/user/single-user/${personId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching single religion:", error);
        throw error;
    }
};