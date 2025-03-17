// edit/[id]/+page.server.ts
import type { PageServerLoad } from './$types';

interface OutputData {
    id: string;
}

export const load: PageServerLoad = async ({ params }) => {
    return {
        id: params.id,
    } as OutputData;
};