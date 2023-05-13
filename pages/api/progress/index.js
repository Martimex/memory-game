// We will also have to import getSession once we set up an authentication service
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { user_id, level_id } = req.body;
    //const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)
    console.log(req.body);
    // We want also to await getSesstion;
    const result = await prisma.progress.create({
        data: {
            stars_got: 0,
            lv_progress: 0,
            highscore: 0,
            userId: user_id,
            levelId: level_id,
        },
    });
    res.json(result);
}