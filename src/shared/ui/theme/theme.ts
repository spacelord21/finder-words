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
    },
    accent: {
      primary: "#66b2ff",
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
