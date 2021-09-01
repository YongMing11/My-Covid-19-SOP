import React, { useState } from "react";

const HistoryContext = React.createContext({
    histories: [
        { location: "Medan Selera Mutiara Damansara", date: "25/08/21", time: "08:00am", duration: 50 },
        { location: "Bank Islam Kota Damansara", date: "25/08/21", time: "07:00pm", duration: 90 }
    ],
    addHistory: (newHistory) => { }
});

const HistoryProvider = ({ children }) => {
    const [histories, setHistories] = useState([
        { location: "Medan Selera Mutiara Damansara", date: "31/08/21", time: "08:00am", duration: 50 },
        { location: "Bank Islam Kota Damansara", date: "01/09/21", time: "06:00pm", duration: 90 }]);

    const addHistory = React.useCallback((newHistory) => {
        setHistories(history => [...history, newHistory])
    }, [histories])

    return (<HistoryContext.Provider value={{
        histories, addHistory
    }}>
        {children}
    </HistoryContext.Provider>)
};

const useHistoryContext = () => {
    return React.useContext(HistoryContext);
};

export { HistoryProvider, useHistoryContext };
