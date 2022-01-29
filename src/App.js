import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Background from './background';
import Reach from './modals/reach';
import ReactModal from './modals/reactModal';
import ReactResponsiveModal from './modals/reactResponsiveModal';
import OwnWithBlock from './modals/ownWithBlock';
import OwnWithoutBlock from './modals/ownWithoutBlock';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>
                        <Link to="/reach">Reach UI</Link>
                        <Link to="/react-responsive-modal">React Responsive Modal</Link>
                        <Link to="/react-modal">React Modal</Link>
                        <Link to="/own-without-block">Own Without Block</Link>
                        <Link to="/own-with-block">Own With Block</Link>
                    </div>} />
                    <Route path="/reach" element={<div><Background render={(open, onClose) => <Reach open={open} onClose={onClose} />} name="Reach" /></div>} />
                    <Route path="/react-responsive-modal" element={<div><Background render={(open, onClose) => <ReactResponsiveModal open={open} onClose={onClose} />} name="React Responsive Modal" /></div>} />
                    <Route path="/react-modal" element={<div><Background render={(open, onClose) => <ReactModal open={open} onClose={onClose} />} name="React Modal" /></div>} />
                    <Route path="/own-without-block" element={<div><Background render={(open, onClose) => <OwnWithoutBlock open={open} onClose={onClose} />} name="Own Without Block" /></div>} />
                    <Route path="/own-with-block" element={<div><Background render={(open, onClose) => <OwnWithBlock open={open} onClose={onClose} />} name="Own With Block" /></div>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
