import './reach.scss';
import { Dialog } from "@reach/dialog";

const Reach = ({ open, onClose }) => {
    return open ? (
        <Dialog isOpen={open} onDismiss={onClose}>
            <button className="closeButton" onClick={onClose}>Close</button>
            <p className="content">Hello there. I am a dialog</p>
        </Dialog>
    ) : ''
};

export default Reach;