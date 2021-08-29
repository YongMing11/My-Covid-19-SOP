import { GOOGLE_MAPS_APIKEY } from "../constants/config";

const getLocationByAddress = async (address) => {
    const geocode_API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_APIKEY}`;
    const location = {};
    await fetch(geocode_API_URL)
        .then(res => {
            if (res.status == 200)
                res.json()
        }).then((json) => {
            if (json && json.results.length != 0) {
                location = {
                    coordinates: {
                        latitude: json.results[0].geometry.location.lat,
                        longitude: json.results[0].geometry.location.lng,
                    },
                    address: json.results[0].formatted_address
                }
            }
        }).catch(err => {
            console.log("Geocoding failed : " + err)
        })
    return location;
}



export { getLocationByAddress as convertAddressToCoordinates }