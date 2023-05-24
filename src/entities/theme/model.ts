import { Theme } from "@shared/ui";
import { firstVariant } from "../../shared/ui/theme/board-accent-themes";
import { primaryDarkTheme } from "../../shared/ui/theme/theme";
import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/rn/async";

export const THEME_KEY = "current-theme";
export const CELL_THEME_KEY = "currect-cell-theme";

export const changeCellTheme = createEvent<typeof firstVariant>();
const $cellTheme = createStore<typeof firstVariant>(firstVariant).on(
  changeCellTheme,
  (state, payload) => payload
);
export const changeTheme = createEvent<Theme>();
export const $theme = createStore<Theme>(primaryDarkTheme).on(
  changeTheme,
  (state, theme) => {
    return {
      ...primaryDarkTheme,
      ...theme,
      palette: {
        ...theme.palette,
        gameboard: {
          ...$cellTheme.getState(),
        },
      },
    };
  }
);

$theme.on(
  changeCellTheme,
  ({ name, palette, spacing, typography }, payload) => {
    return {
      name,
      typography,
      spacing,
      palette: {
        ...palette,
        gameboard: {
          ...payload,
        },
      },
    };
  }
);

persist({
  store: $theme,
  key: THEME_KEY,
});

persist({
  store: $cellTheme,
  key: CELL_THEME_KEY,
});
