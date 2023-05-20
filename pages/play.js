import React, {useState, useEffect} from "react";
import prisma from '../lib/prisma';
import { getSession } from "next-auth/react";
import Router from "next/router";

// Components
import Preview from "../src/components/preview";
import Game from "../src/components/memory_game";


export const /* getStaticProps */ getServerSideProps = async ({ req, res }) => {
    // Data object is available under /play (for example: http://localhost:3000/play)
    // Note that by adding getStaticProps, loading http://localhost:3000/play will give us 2 level instances from the Database, 
    // while going for http://localhost:3000/ (our 'old' no-route implementation) gives us props which we passed from index.js file
    //const DUMMY_USER_ID = 'clhf5gk8800009sw4tx7ssxam'; // DUMMY USER IS:  Wóda cuda // REMOVE THIS AFTER GOING FOR AUTHENTICATION SERVICE (WE WILL MAKE US OF USESESSION OVER HERE)

    const session = await getSession({ req })
    console.log('PLAY SSR REQ: ', session);
    //const session = await getSession({ req });
    //console.log('CURRENT SESSION IS: ', session, '  -- and status is: ', status);
    const session_user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    console.log('OUR REAL USER: ', session_user);

    const user_progresses = await prisma.progress.findMany({
        where: { userId: session_user.id },
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
        props: { data: data, user_progresses: user_progresses, session_user: session_user.id },
    };
};

function Play(props) {
    console.warn('PLAY PROPS: ', props);
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

    useEffect(() => {
        if(component === 'preview') {
            Router.push('/play'); // performs an artificial refresh so that if user make any progress on the level, it is not necessry to refresh the game manually
        }
    }, [component])

    return(
        <div>
            {component === 'preview' && (
                <Preview data={props.data} user_progresses={props.user_progresses} playerId={props.session_user}
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