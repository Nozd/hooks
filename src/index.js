import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if(visible){
        return(
            <div style={{fontSize: '25px'}}>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo id={value} />
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

const getPlanet = (id) => {
    return fetch(`https://swapi.co/api/planets/${id}`)
            .then(res => res.json());
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);

    const [dataState, setDataState] = useState(initialState);
    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error
            }))
        return () => cancelled = true;
    }, [request, initialState]);
    return dataState;
}

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id]);
    return useRequest(request);
}

const PlanetInfo = ({id}) => {
    const {data, loading, error} = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>
    }

    if (loading) {
        return <div> loading...</div>
    }

    return (
        <>
            <div>
                {id} Planet name is {data.name}
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