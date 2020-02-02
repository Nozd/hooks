import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if(visible){
        return(
            <div style={{fontSize: '25px'}}>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <Notification />
            </div>
        );
    } else{
        return(
            <div>
                <button onClick={() => setVisible(true)}>show</button>
            </div>
        );
    }  
}

const HookCounter = ({value}) => {

    useEffect(() => {
        console.log(`mount`);
    }, [ ]);

    useEffect(() => {
        return () => console.log('unMount')
    }, []);

    return <p>{value}</p>;
}

const Notification = () => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(() => false), 2500);
        return () => clearTimeout(timer);
    }, []);

return  (<div>{visible && <p>Hello</p>}</div>);
}

ReactDOM.render(<App />, document.getElementById('root'));