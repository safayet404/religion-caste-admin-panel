import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
    console.log("Params:", params);

    return {
        religionId: params.religionId,
        casteId: params.casteId
    };
};
