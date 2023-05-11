const THEME_GRID_STEP = 8;

export const darkTheme = {
  name: "dark",
  palette: {
    background: {
      primary: "#0a1929",
      secondary: "#132f4c",
      tertiary: "#787c7e",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#66b2ff",
      dark: "#1a1a1b",
    },
    accent: {
      primary: "#66b2ff",
      success: "#53CC2E",
      wrongPlace: "#FFB13D",
    },
    keyboard: {
      white: "#d3d6da",
      dark: "#787c7e",
      enter: "#017f70",
      yellow: "#c9b458",
      backspace: "#414443",
      green: "#6aaa64",
    },
  },
  typography: {
    largeTitle: {
      size: "34px",
      fontFamily: "ROBOTO_REGULAR",
      letterSpacing: "0px",
    },
    title: {
      size: "24px",
      fontFamily: "ROBOTO_REGULAR",
      letterSpacing: "0px",
    },
    subtitle: {
      size: "16px",
      fontFamily: "ROBOTO_MEDIUM",
      letterSpacing: "0.15px",
    },
    body16: {
      size: "16px",
      fontFamily: "ROBOTO_REGULAR",
      letterSpacing: "0.5px",
    },
    caption: {
      size: "12px",
      fontFamily: "ROBOTO_LIGHT",
      letterSpacing: "0.4px",
    },
  },
  spacing: (multiplier: number) => THEME_GRID_STEP * multiplier,
};
