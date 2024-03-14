import React from 'react';
import styles from './superAdmin.module.css';

const ConfirmationPopup = ({ message, email, location, onConfirm, onCancel }) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <p>{message}</p>
                <p>{`Email: ${email}`}</p>
                <p>{`Location: ${location}`}</p>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={onConfirm}>Confirm</button>
                    <button style={{ backgroundColor: 'red', marginLeft: '30px' }} onClick={onCancel}>Cancel</button>
                </div>

            </div>
        </div>
    );
};

export default ConfirmationPopup;
