import React from 'react';
import './confirmationPopup.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
        <div className="confirmation-popup">
            <p>{message}</p>
            <button className='save-btn' onClick={onConfirm}>Confirm</button>
            <button className='cancel-btn' onClick={onCancel}>Cancel</button>
        </div>
        </div>
    );
};

export default ConfirmationPopup;