import info from '@mock/sop.json';
import { GOOGLE_MAPS_APIKEY } from "../constants/config";

const getLocationByAddress = async (address) => {
    const geocode_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}&components=country:MY`;
    const location = {};

    // CALL GOOGLE MAPS GEOCODING API
    await fetch(geocode_API_URL)
        .then(res => {
            if (res.status == 200)
                res.json()
        }).then((json) => {
            if (json && json.results.length != 0) {
                // GET STATE AND PHASE BASED ON COMPLETE ADDRESS FROM GEOCODING API
                const { currentState, currentPhase } = getStateAndPhase(json.results[0].formatted_address);
                location = {
                    coordinates: {
                        latitude: json.results[0].geometry.location.lat,
                        longitude: json.results[0].geometry.location.lng,
                    },
                    address: json.results[0].formatted_address,
                    phase: currentPhase,
                    state: currentState
                }
            }
        }).catch(err => {
            console.log("Geocoding failed : " + err)
        })
    return location;
}

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

export { getLocationByAddress, getStateAndPhase }