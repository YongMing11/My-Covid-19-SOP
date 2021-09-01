import React, { useState } from "react";

const locationTemplate = {
  coordinates: null,
  name: null,
  address: null,
  state: null,
  phase: null
}

const LocationContext = React.createContext({
  action: {
    id: "",
    label: "",
    shortLabel: ""
  },
  cahceLocation: null,
  setUserCacheLocation: (newLocation) => { },
  location: JSON.parse(JSON.stringify(locationTemplate)),
  setUserAction: (newAction) => { },
  getUserLocation: () => { },
  getUserLocationCoordinates: () => { },
  setUserLocation: (newLocation) => { },
  setUserLocationCoordinates: (coordinates) => { },
  setUserLocationAddress: (address) => { },
  setUserLocationState: (state) => { },
  setUserLocationPhase: (phase) => { },
  resetUserLocation: () => { },
  destination: JSON.parse(JSON.stringify(locationTemplate)),
  getUserDestination: () => { },
  getUserDestinationCoordinates: () => { },
  setUserDestination: (newDestination) => { },
  setUserDestinationCoordinates: (coordinates) => { },
  setUserDestinationAddress: (address) => { },
  setUserDestinationState: (state) => { },
  setUserDestinationPhase: (phase) => { },
  resetUserDestination: () => { }
});

const LocationProvider = ({ children }) => {
  const [action, setAction] = useState(null);
  const [cahceLocation, setCahceLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  // ACTION
  const setUserAction = React.useCallback((newAction) => {
    setAction(newAction);
  }, [action])

  const setUserCacheLocation = React.useCallback((newLocation) => {
    setCahceLocation(newLocation);
  }, [cahceLocation])

  // LOCATION / ORIGIN
  const getUserLocation = React.useCallback(() => {
    return location;
  }, [location]);

  const getUserLocationCoordinates = React.useCallback(() => {
    return location.coordinates;
  }, [location]);

  const setUserLocation = React.useCallback((newLocation) => {
    setLocation(newLocation);
  }, [location])

  const setUserLocationCoordinates = React.useCallback((coordinates) => {
    setLocation((loc) => ({ ...loc, coordinates }))
  }, [location]);

  const setUserLocationAddress = React.useCallback((address) => {
    setLocation((loc) => ({ ...loc, address }))
  }, [location]);

  const setUserLocationState = React.useCallback((state) => {
    setLocation((loc) => ({ ...loc, state }))
  }, [location]);

  const setUserLocationPhase = React.useCallback((phase) => {
    setLocation((loc) => ({ ...loc, phase }))
  }, [location]);

  const resetUserLocation = React.useCallback(() => {
    setLocation(JSON.parse(JSON.stringify(locationTemplate)))
  }, [location]);

  // DESTINATION
  const setUserDestination = React.useCallback((newDestination) => {
    setDestination(newDestination);
  }, [location])

  const setUserDestinationCoordinates = React.useCallback((coordinates) => {
    setDestination((loc) => ({ ...loc, coordinates }))
  }, [destination]);

  const setUserDestinationAddress = React.useCallback((address) => {
    setDestination((loc) => ({ ...loc, address }))
  }, [destination]);

  const setUserDestinationState = React.useCallback((state) => {
    setDestination((loc) => ({ ...loc, state }))
  }, [destination]);

  const setUserDestinationPhase = React.useCallback((phase) => {
    setDestination((loc) => ({ ...loc, phase }))
  }, [destination]);

  const resetUserDestination = React.useCallback(() => {
    setDestination(JSON.parse(JSON.stringify(locationTemplate)))
  }, [destination]);

  return (<LocationContext.Provider value={{
    action, setUserAction,
    cahceLocation, setUserCacheLocation,
    location, getUserLocation, getUserLocationCoordinates, setUserLocation, setUserLocationCoordinates, setUserLocationAddress, setUserLocationState, setUserLocationPhase, resetUserLocation,
    destination, setUserDestination, setUserDestinationAddress, setUserDestinationCoordinates, setUserDestinationPhase, setUserDestinationState, resetUserDestination
  }}>
    {children}
  </LocationContext.Provider>)
};

const useLocationContext = () => {
  return React.useContext(LocationContext);
};

export { LocationProvider, useLocationContext };
