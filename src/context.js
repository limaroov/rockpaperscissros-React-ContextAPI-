import React, { useContext, createContext, useReducer } from "react";

// Initializing the main context.
const StateProvider = createContext();

export const DataLayer = ({ children, initialState, reducer }) => {
  return (
    <StateProvider.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateProvider.Provider>
  );
};

// Creating a custom hook to provide the state and the dispatcher.
export const useDataLayer = () => useContext(StateProvider);
