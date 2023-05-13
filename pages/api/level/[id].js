// Here we are going to GET a level based on its' id
import prisma from "../../../lib/prisma";

// GET /api/level/:id
export default async function handle(req, res) {
    const levelId = req.query.id;
    console.log('HANDLING: ', req.query);
    console.log('METHOD IS: ', req.method);
    //const { progress, highscore, stars } = req.body;

    if(req.method === 'GET') {
        const getLevel = await prisma.level.findUnique({
            where: { id: levelId},
        });
        console.log('PRISMA FOUND THIS LEVEL: ', getLevel);
        const res_data = await res.json(getLevel);
        return res_data;
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
} 