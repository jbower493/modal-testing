import './ownWithBlock.scss';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';


const Modal = ({ children, open }) => {
    const blockBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unblockBodyScroll = () => {
        document.body.style.overflow = '';
    };

    useEffect(() => {
        if (open) blockBodyScroll();
        else unblockBodyScroll();
        
        return unblockBodyScroll;
    }, [open]);

    return open ? ReactDOM.createPortal(
        <div className="block">
            <div className="block__overlay" />
            <div className="block__container">
                <div className="block__content">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    ) : ''
};



const OwnWithBlock = ({ open, onClose }) => {
    return open ? (
        <Modal open={open}>
            <button className="closeButton" onClick={onClose}>Close</button>
            <p className="content">Hello there. I am a dialog</p>
        </Modal>
    ) : ''
};

export default OwnWithBlock;