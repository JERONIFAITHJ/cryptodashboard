import React, { useReducer } from 'react'


const initialState = {
    coins: false
};

export const CoinStore = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'render':
            return state.coins = true;
        case 'dont_render':
            return state.coins = false;
        default: return state.coins
    }
}

export default function Store(props) {
    const [coins, setCoins] = useReducer(reducer, initialState);
    return (
        <CoinStore.Provider value={[coins, setCoins]}>
            {props.children}
        </CoinStore.Provider>
    )
}