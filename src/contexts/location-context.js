import React, { useState } from "react";

const LocationContext = React.createContext({
  location: {
    coordinates: {
      latitude: null,
      longitude: null,
    },
    name: "",
    address: ""
  },
  getUserLocation: () => { },
  getUserLocationCoordinates: () => { },
  setUserLocation: (newLocation) => { },
  setUserLocationCoordinates: (coordinates) => { },
});

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    coordinates: {
      latitude: null,
      longitude: null,
    },
    name: "",
    address: ""
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
    console.log(coordinates)
    setLocation((loc) => ({ ...loc, coordinates }))
  }, [location]);

  return (<LocationContext.Provider value={{ location, getUserLocation, getUserLocationCoordinates, setUserLocation, setUserLocationCoordinates }}>
    {children}
  </LocationContext.Provider>)
};

const useLocationContext = () => {
  return React.useContext(LocationContext);
};

export { LocationProvider, useLocationContext };
