import sop_index from "@mock/sop_index.json";
import { GOOGLE_MAPS_APIKEY } from "../constants/config";

const getLocationByAddress = async (address) => {
    const geocode_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}&components=country:MY`;
    let location = {};

    // CALL GOOGLE MAPS GEOCODING API
    await fetch(geocode_API_URL)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log('res.status !== 200')
            }
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
    let addressArray = address.split(',');

    loopFinding:
    for (let phase of sop_index.phases) {
        if (phase.title === "PKPD") break;
        for (let areaIndex = 0; areaIndex < phase.areas.length; areaIndex++) {
            for (let addressArrayIndex = addressArray.length - 1; addressArrayIndex >= 0; addressArrayIndex--) {
                let addressSegment = addressArray[addressArrayIndex];
                if (addressSegment.toUpperCase().includes(phase.areas[areaIndex].toUpperCase()) ||
                    addressSegment.toUpperCase().includes(phase.areas_en[areaIndex].toUpperCase())) {
                    currentState = phase.areas_en[areaIndex].toUpperCase();
                    currentPhase = phase.title_en;
                    break loopFinding;
                }
            }
        }
    }

    return { currentState, currentPhase }
}

const checkCrossState = (locationState, destinationState) => {
    let locationHitSpecialState, destinationHitSpecialState = false;
    const specialSameState = ["SELANGOR", "PUTRAJAYA", "KUALA LUMPUR"];
    specialSameState.forEach(state => {
        if (state === locationState) {
            locationHitSpecialState = true;
        }
        if (state === destinationState) {
            destinationHitSpecialState = true;
        }
    })
    if (locationHitSpecialState && destinationHitSpecialState) {
        return false;
    }
    // LABUAN PHASE 4 CAN CROSS STATE
    if (locationState === "LABUAN" || destinationState === "LABUAN") {
        return false;
    }
    return locationState !== destinationState;
}

export { getLocationByAddress, getStateAndPhase, checkCrossState }