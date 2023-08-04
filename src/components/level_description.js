import React, { useState, useEffect } from "react";
import styles from '../styles/level_description.module.css';

/* let text; */

export default function LevelDescription(props) {

    const [levelText, setLevelText] = useState(null);

    async function loadLevelDescription(serie_abbr, lv_id) {
        const text = await import(`../levels/${serie_abbr}/level_${lv_id}/descriptionStorage.js`);
        
        setLevelText(text.descriptionStorage()); 
    }

    useEffect(() => {
        loadLevelDescription(props.serie_abbr, props.lv_id); // Returns HTML with user text
    }, [])

    console.warn('LEVEL DESCRIPTION PROPS ARE: ',  props.serie_abbr, props.lv_id);

    return(
        <div className={styles["lv-text-box__main"]}>
            {levelText}
        </div>
    )
}