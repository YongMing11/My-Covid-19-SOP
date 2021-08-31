import React, { useState } from "react";

const HistoryContext = React.createContext({
    histories: [
        { location: "Lot 10 Hutong Food Court", date: "25/08/21", time: "12:00pm", duration: 30 },
        { location: "TNG Digital Sdn Bhd", date: "25/08/21", time: "09:00am", duration: 30 },
        { location: "Bank Islam Kota Damansara", date: "25/08/21", time: "12:00pm", duration: 10 },
        { location: "Medan Selera Mutiara Damansara", date: "25/08/21", time: "08:00am", duration: 50 },
        { location: "Bank Islam Kota Damansara", date: "25/08/21", time: "07:00pm", duration: 90 }
    ],
    addHistory: (newHistory) => { }
});

const HistoryProvider = ({ children }) => {
    const [histories, setHistories] = useState([
        { location: "Lot 10 Hutong Food Court", date: "25/08/21", time: "12:00pm", duration: 30 },
        { location: "TNG Digital Sdn Bhd", date: "25/08/21", time: "09:00am", duration: 30 },
        { location: "Bank Islam Kota Damansara", date: "25/08/21", time: "12:00pm", duration: 10 },
        { location: "Medan Selera Mutiara Damansara", date: "25/08/21", time: "08:00am", duration: 50 },
        { location: "Bank Islam Kota Damansara", date: "30/08/21", time: "07:00pm", duration: 90 }]);

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
