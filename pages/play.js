import React, {useState, useEffect} from "react";
import prisma from '../lib/prisma';

// Components
import Preview from "../src/components/preview";
import Game from "../src/components/memory_game";

export const getStaticProps = async () => {
    // Data object is available under /play (for example: http://localhost:3000/play)
    // Note that by adding getStaticProps, loading http://localhost:3000/play will give us 2 level instances from the Database, 
    // while going for http://localhost:3000/ (our 'old' no-route implementation) gives us props which we passed from index.js file
    const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)

    const user_progresses = await prisma.progress.findMany({
        where: { userId: DUMMY_USER_ID },
    })

    const data = await prisma.serie.findMany({
        /* where: { index: true }, */
        take: 5,
        include: {
            Levels: {
                select: { id: true, name: true, number: true, stages: true, difficulty: true, creatorUserId: true, }
            },
        },
    
    });
    //console.log(data);
    return {
        props: { data: data, user_progresses: user_progresses },
    };
};

function Play(props) {

    const [component, setComponent] = useState('preview');
    // State to share with main Memory_game component
    const [levelData, setLevelData] = useState(null);
    const [levelProgressRecord, setLevelProgressRecord] = useState(null);
    const [gameCounters, setGameCounters] = useState(null);

    useEffect(() => {
        if(levelData) { 
            console.log(levelData, levelProgressRecord, gameCounters ) 
            setComponent('game');
        }
    }, [levelData])

    return(
        <div>
            {component === 'preview' && (
                <Preview data={props.data} user_progresses={props.user_progresses} 
                    /* changeComponent={setComponent}  */setLevelData={setLevelData} setLevelProgressRecord={setLevelProgressRecord} setGameCounters={setGameCounters}
                />
            )}
            {component === 'game' && (
                <Game level={levelData} progress={levelProgressRecord} gameCounters={gameCounters} changeComponent={setComponent} />
            )}
        </div>
    );
}

export default Play;