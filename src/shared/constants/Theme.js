import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primaryBlue: "#0E4DA4",
    secondaryBlue: "#3677D9",
    primaryGreen: "#d0e7da",
    primaryGrey: '#979797',
    secondaryGrey: '#F0F0F0',
    warning: '#FFC107',
    white: '#FFFFFF',
  },
  bottomNavigation: {
    height: 60
  }
};

export default theme;