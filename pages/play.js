import React, {useState, useEffect} from "react";
import prisma from '../lib/prisma';
import { getSession } from "next-auth/react";
import Router from "next/router";

// Components
import Preview from "../src/components/preview";
import Game from "../src/components/memory_game";
import { getPlayerLevel } from "../src/global/predefined/exp_to_level";

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
/*         where: { index: true },
        take: 5, */
        include: {
            Levels: {
                select: { id: true, name: true, number: true, stages: true, difficulty: true, creatorUserId: true, }
            },
        },
    
    });

    const levelsByDifficulty = {all: {}, user_completed: {}, user_stars: 0};
    data.forEach(serie => {
        serie.Levels.map(lv => (levelsByDifficulty.all.hasOwnProperty(lv.difficulty)? levelsByDifficulty.all[lv.difficulty] += 1 : levelsByDifficulty.all[lv.difficulty] = 1));
    });
    const progressesArr = user_progresses.filter(lv => lv.lv_progress === 100)
    progressesArr.map(lv => levelsByDifficulty.user_completed.hasOwnProperty(lv.lv_difficulty)? levelsByDifficulty.user_completed[lv.lv_difficulty] += 1 : levelsByDifficulty.user_completed[lv.lv_difficulty] = 1)
    progressesArr.map(lv => levelsByDifficulty.user_stars += lv.stars_got);

    // Now add last fields to indicate all the levels, and also number of levels which p;ayer won (lv_progress is 100)
    levelsByDifficulty.levelsAmount = {inGame: Object.values(levelsByDifficulty.all).length? Object.values(levelsByDifficulty.all).reduce((a, b) => +a + +b) : 0, userWin: Object.values(levelsByDifficulty.user_completed).length? Object.values(levelsByDifficulty.user_completed).reduce((a, b) => +a + +b) : 0};
    levelsByDifficulty.user_exp = getPlayerLevel(session_user.exp); // CHANGE THIS LATER ONCE EXP GAIN MECHANISM IS IMPLEMENTED

    console.log('DATA IS:: + ', data);
    return {
        props: { data: [...data].sort((a, b) => a.index - b.index), user_progresses: user_progresses, session_user: JSON.parse(JSON.stringify(session_user)), levelsCount: levelsByDifficulty },
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
                <Preview data={props.data} user_progresses={props.user_progresses} player={props.session_user} levelsCount={props.levelsCount}
                    /* changeComponent={setComponent}  */setLevelData={setLevelData} setLevelProgressRecord={setLevelProgressRecord} setGameCounters={setGameCounters}
                />
            )}
            {component === 'game' && (
                <Game level={levelData} playerId={props.session_user.id} playerExp={props.session_user.exp} progress={levelProgressRecord} gameCounters={gameCounters} changeComponent={setComponent} />
            )}
        </div>
    );
}

export default Play;