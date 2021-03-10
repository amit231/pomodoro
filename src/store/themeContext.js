
import React, { useReducer } from 'react'
export const ThemeContext = React.createContext({});

function ThemeContextProvider(props) {
    const initialState = {
        background: 'white',
        color: 'black'
    }
    const reducer = (state, actions) => {
        console.log('prevState', state)
        switch (actions.type) {
            case 'change-theme':
                console.log('inside reducer')
                return {
                    ...state,
                    background: state.background === 'black' ? 'white' : 'black',
                    color: state.color === 'white' ? 'black' : 'white'
                }
            default:
                return state;
        }
    }
    const [data, actionD] = useReducer(reducer, initialState)
    return (
        <ThemeContext.Provider value={{ state: data, dispatch: actionD }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
export default ThemeContextProvider;
