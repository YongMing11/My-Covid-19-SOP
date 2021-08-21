import React, { useState } from "react";

const LocationContext = React.createContext({
  location: {
    coordinates: {
      latitude: null,
      longitude: null,
    },
    name: "",
    address: "",
    state: "",
    phase: ""
  },
  getUserLocation: () => { },
  getUserLocationCoordinates: () => { },
  setUserLocation: (newLocation) => { },
  setUserLocationCoordinates: (coordinates) => { },
  setUserLocationAddress: (address) => { },
  setUserLocationState: (state) => { },
  setUserLocationPhase: (phase) => { }
});

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    coordinates: {
      latitude: null,
      longitude: null,
    },
    name: "",
    address: "",
    state: "",
    phase: ""
  });

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

  return (<LocationContext.Provider value={{ location, getUserLocation, getUserLocationCoordinates, setUserLocation, setUserLocationCoordinates, setUserLocationAddress, setUserLocationState, setUserLocationPhase }}>
    {children}
  </LocationContext.Provider>)
};

const useLocationContext = () => {
  return React.useContext(LocationContext);
};

export { LocationProvider, useLocationContext };
