import { firstVariant } from "./board-accent-themes";
import { defaultDarkPalette, defaultLightPalette } from "./palettes";
import { typography } from "./typography";

const THEME_GRID_STEP = 8;
const spacing = (multiplier: number) => THEME_GRID_STEP * multiplier;

export const primaryDarkTheme = {
  name: "dark",
  palette: {
    ...defaultDarkPalette,
    gameboard: {
      ...firstVariant,
    },
  },
  typography: typography,
  spacing: spacing,
};

export const primaryLightTheme = {
  name: "light",
  palette: {
    ...defaultLightPalette,
    gameboard: {
      ...firstVariant,
    },
  },
  typography: typography,
  spacing: spacing,
};
