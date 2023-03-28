import React, { createContext, useContext, useReducer } from "react";

// Preparing data layer
export const StateContext = createContext();

// Wrapping the app and giving access to the data layer to every component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Pulling information from data layer
export const useStateValue = () => useContext(StateContext);