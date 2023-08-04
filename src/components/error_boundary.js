import React from "react";
import styles from '../styles/error_boundary.module.css';
import ErrorTemplate from "./error_template";
import Router from "next/router";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: 'to_be_announced' };
    }

    dismissError() {
        console.warn('ERROR DISMISSED');
        this.setState({ hasError: false, message: 'to_be_announced' });
    }

    componentDidCatch(error, info) {
        // Show fallback UI
        this.setState({ hasError: true, message: error.message });
        // If a client-side error occur, user is safely relocated to the app landing page
        Router.push('/'); 
    }

    render() {
        if(this.state.hasError) {
            const error_message = `Application error`;
            const error_description = `There has been some bug detected, that was not expected to happen. Please click the button below to return to the
                landing page. If you have encountered similiar issues before, please contact me at ____@gmail.com by including the error message below: 
            `;

            /* Apart from inheriting from Error Template Component, an ERROR BOUNDARY should provide a button which sets an hasError state to FALSE */
            /* THIS ERROR BOUNDARY COMPONENT GETS TRIGGERED WHEN WE THROW A NEW ERROR  (throw new Error('some_message')) */

            return(
                <ErrorTemplate errNo={417} errMessage={error_message} errDesc={error_description} errStack={this.state.message} closeError={() => this.dismissError()} />
            )
            return (
                <div className={styles[`err-bg`]}>
                    <div className={styles['err-title-box']}>
                        <h1 className={styles["err-title"]}> There's an error 🙁</h1>
                    </div>
                    <div className={styles["err-content-box"]}>
                        <p className={styles["err-content-desc"]}>
                            An unexpected error has been thrown. Please restart the app and try again. We are sorry for the inconvenience :(
                        </p>
                    </div>
                    <div className={styles["err-err_info-box"]}>
                        <p className={styles["err-err_info-desc"]}>
                            {`${this.state.message}`}
                        </p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }

}

export default ErrorBoundary;