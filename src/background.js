import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Background = ({ render, name }) => {
    const [ open, setOpen ] = useState(false);

    return (
        <div>
            <Link to="/">Back to home</Link>
            <h1>{name}</h1>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <main></main>
            <h2>The End</h2>
            {render(open, () => setOpen(false))}
        </div>
    );
};

export default Background;