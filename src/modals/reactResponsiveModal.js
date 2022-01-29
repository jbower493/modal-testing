import './reactResponsiveModal.scss';
import { Modal } from 'react-responsive-modal';

const ReactResponsiveModal = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose} center>
            <button className="closeButton" onClick={onClose}>Close</button>
            <p className="content">Hello there. I am a dialog</p>
        </Modal>
    );
};

export default ReactResponsiveModal;