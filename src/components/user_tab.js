import React, {useState} from "react";
import styles from '../styles/user_tab.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faCaretLeft as arrow_left,
        faCaretRight as arrow_right,
        faDotCircle as hide_circ, 
        faInfoCircle as info_circ, 
        faTimesCircle as logout_circ
        } from '@fortawesome/free-solid-svg-icons';
import PlayerStats from "./player_stats";

function UserTab(props) {

    const [[pageNo, pageMaxIndex], setPageNo] = useState([2, 2]);

    return(
        <div className={styles['user-tab']}>
            <div className={styles['user-tab__box']}>

                <div className={styles['box__user-profile']}>
                    <div className={styles['box__user-info']}> 
                        <div className={styles['user-info__image-box']}>
                            <div className={styles['image-box__image']}> </div>
                        </div>
                        <div className={styles['user-info__data']}>
                            <p className={`${styles["data__text"]} ${styles["data__text--large"]}`}> {props.player.name} </p>
                            <p className={`${styles["data__text"]} ${styles["data__text--medium"]}`}> Level 20 (85%) </p>
                            <p className={`${styles["data__text"]} ${styles["data__text--small"]}`}> Member since: 05/06/2023 </p>
                        </div>
                    </div>
                    <div className={styles['box__user-stats']}> 
                        <div className={`${styles["user-stats__switch-btn"]} ${styles["switch-btn-left"]}`} onClick={() => {(pageNo > 0) && setPageNo([pageNo - 1, pageMaxIndex])}}> 
                            <FontAwesomeIcon icon={arrow_left} className={`${styles["icon-arrow"]} ${styles["icon-arrow-left"]}`} />
                        </div>
                        <div className={styles['user-stats__stats-table']}> 
                            {/* Here we will use conditional component, having multiple page controllable by switch buttons */}
                            <PlayerStats pageNo={pageNo} pageLastIndex={pageMaxIndex} levelsCount={props.levelsCount} />
                        </div>
                        <div className={`${styles["user-stats__switch-btn"]} ${styles["switch-btn-right"]}`} onClick={() => {(pageNo !== pageMaxIndex) && setPageNo([pageNo + 1, pageMaxIndex])}}> 
                            <FontAwesomeIcon icon={arrow_right} className={`${styles["icon-arrow"]} ${styles["icon-arrow-right"]}`} />
                        </div>
                    </div>
                </div>

                <div className={styles['box__action-buttons']}>
                    <div className={styles['action-buttons__btn-item']}> 
                        <div className={styles['btn-item__icon']}>
                            <FontAwesomeIcon icon={hide_circ} className={`${styles["icon--btn"]} ${styles["icon-hide"]}`} />
                        </div>
                        <span className={styles['btn-item__text']}>Hide</span>
                    </div>
                    <div className={styles['action-buttons__item']}> 
                        <div className={styles['btn-item__icon']}>
                            <FontAwesomeIcon icon={info_circ} className={`${styles["icon--btn"]} ${styles["icon-info"]}`} />
                        </div>
                        <span className={styles['btn-item__text']}>Info</span>
                    </div>
                    <div className={styles['action-buttons__item']}>
                        <div className={styles['btn-item__icon']}>
                            <FontAwesomeIcon icon={logout_circ} className={`${styles["icon--btn"]} ${styles["icon-logout"]}`} />
                        </div>
                        <span className={styles['btn-item__text']}>Log out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTab;