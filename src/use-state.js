import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return(
        <div>
            <HookSwitcher />
        </div>
    );
}

const HookSwitcher = () => {
    const [ color, setColor ] = useState('yellow');
    const [ fontSize, setFontSize] = useState(18);

    const [ person, setPerson ] = useState({
        firstName: 'Lev',
        lastName: 'Tolstoy'
    });

    const {firstName, lastName} = person;
    
    return (
        <div style={{padding: '10px', 
            backgroundColor: color,
            fontSize: `${fontSize}px`}}>
                {firstName} {lastName}
            <button onClick={() => setColor('green')}>Green</button>
            <button onClick={() => setColor('orange')}>Orange</button>
            <button onClick={() => setFontSize((s) => (s + 5))}>PlusFontSize</button>
            <button onClick={() => setFontSize((s) => (s - 5))}>MinusFontSize</button>
            <button onClick={() => setPerson((person) => {
                return {...person, lastName: 'Nikolaevich'}
            })}>ChangeFirsName</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
