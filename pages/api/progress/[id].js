// Here we are going to update current progresses records (BUT NEVER DELETE !)
import prisma from "../../../lib/prisma";
//import { getSession } from "next-auth/react";

// (GET || PUT) /api/progress/:id
export default async function handle(req, res) {

   /*  const session = await getSession({ req });
    console.log('THE USER: +', session, req.query);

    const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)

    if(req.method === 'GET') {
        // For GET request, we want to get a user progress record for picked level (but we could only pass level ID)
        const levelId = req.query.id;

        console.log('xd  => ', levelId)
        const user_progresses = await prisma.progress.findMany({
            where: { userId: DUMMY_USER_ID },
        });

        console.log(user_progresses);
        //const level_progress = 12;
        const level_progress = await user_progresses.find(progress_record => progress_record.levelId === levelId);
        console.log(level_progress);
        const res_data = await res.json(level_progress);
        //console.log(res_data);
        return res_data;
    } */

    if(req.method === 'PUT') {
        // For PUT request we have user progress record ID, so we can update it immediately
        const progressId = req.query.id;
        const { lv_progress, highscore, stars } = req.body;

        const updateProgress = await prisma.progress.update({
            where: { id: progressId},
            data: {
                lv_progress: lv_progress,
                highscore: highscore,
                stars_got: stars,
            }
        });
        res.json(updateProgress);
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 