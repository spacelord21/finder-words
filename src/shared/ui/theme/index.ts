import { primaryDarkTheme } from "./theme";
import { firstVariant } from "./board-accent-themes";

export { styled } from "./styled";
export { primaryDarkTheme, primaryLightTheme } from "./theme";
export { AppThemeProvider } from "./provider";
export {
  firstVariant,
  secondVariant,
  thirdVariant,
} from "./board-accent-themes";

export type CellTheme = typeof firstVariant;
export type Theme = typeof primaryDarkTheme;
