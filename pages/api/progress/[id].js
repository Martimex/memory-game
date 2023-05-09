// Here we are going to update current progresses records (BUT NEVER DELETE !)
import prisma from "../../../lib/prisma";

// PUT /api/progress/:id
export default async function handle(req, res) {
    const progressId = req.query.id;
    const { progress, highscore, stars } = req.body;

    if(req.method === 'PUT') {
        const updateProgress = await prisma.progress.update({
            where: { id: progressId},
            data: {
                lv_progress: progress,
                highscore: highscore,
                stars_got: stars,
            }
        });
        res.json(updateProgress);
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 