import React from 'react';
import './ownWithoutBlock.scss';
import Modal from '../excessSpace.js';

const OwnWithoutBlock = ({ open, onClose }) => {
    return open ? (
        <Modal
            className={` hello`}
            open={open}
            onClose={onClose}
            ariaLabel={'Hey'}
        >
            <button className="closeButton" onClick={onClose}>Close</button>
            <p className="content">Hello there. I am a dialog</p>
        </Modal>
    ) : ''
};

export default OwnWithoutBlock;