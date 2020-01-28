import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();

const App = () => {
    return(
        <MyContext.Provider value='How low'>
            <Child />
        </MyContext.Provider>
    );
}

const Child = () => {
    const value = useContext(MyContext);

    return <h1>{value}</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));  