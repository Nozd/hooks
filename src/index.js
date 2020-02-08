import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if(visible){
        return(
            <div style={{fontSize: '25px'}}>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo planetId={value} />
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

const usePlanetInfo = (planetId) => {
    
    const [planetInfo, setPlanetInfo] = useState({
        id: planetId,
        name: null
    });

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.co/api/planets/${planetId}`)
            .then(res => res.json())
            .then(data => {
                !cancelled && setPlanetInfo({
                    id: planetId,
                    name: data.name
                });
            });
        return (() => cancelled = true);
    }, [planetId]);

    return planetInfo;
}

const PlanetInfo = ({planetId}) => {

    const {id, name} = usePlanetInfo(planetId);

    if (!name) {
        return null;
    }
    return (
        <>
            <div>
                {id} Planet name is {name}
            </div>
        </>
    )
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