import './headless.scss';
import { Dialog } from '@headlessui/react'

const Headless = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">

            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="relative bg-white rounded max-w-sm mx-auto">
                    <button className="closeButton" onClick={onClose}>Close</button>
                    <Dialog.Title>Complete your order</Dialog.Title>
                    <p className="content">Hello there. I am a dialog</p>
                </div>
            </div>
        </Dialog>
    );
};

export default Headless;