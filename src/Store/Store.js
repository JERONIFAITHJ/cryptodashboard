import React, { useReducer } from 'react'


const initialState = {
    coins: []
};

export const CoinStore = React.createContext();

const reducer = (state, action) => {
    return state.coins = action.payload;
}

export default function Store(props) {
    const [coins, setCoins] = useReducer(reducer, initialState);
    return (
        <CoinStore.Provider value={[coins, setCoins]}>
            {props.children}
        </CoinStore.Provider>
    )
}