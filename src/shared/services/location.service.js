import info from '@mock/sop.json';

const getStateAndPhase = (address) => {
    let currentState, currentPhase = null;
    for (let phase of info.phases) {
        for (let area of phase.areas) {
            if (address.toUpperCase().includes(area.toUpperCase())) {
                currentState = area.toUpperCase();
                currentPhase = phase.title;
                break;
            }
        }
        if (currentState && currentState !== "") break;
    }
    return { currentState, currentPhase }
}

export { getStateAndPhase }