
export interface Caste {
    _id: string;
    name: string;
    religionId: string;
    description: string,


}

export interface Religion {
    _id: string;
    name: string;
    description: string,
    castes: Caste[];
    isActive: boolean;
}
