import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "@shared/ui";
import { firstVariant } from "../../shared/ui/theme/board-accent-themes";
import { primaryDarkTheme } from "../../shared/ui/theme/theme";
import { useState } from "react";
import {
  CELL_THEME_KEY,
  THEME_KEY,
  changeCellTheme,
  changeTheme,
} from "./model";

export const useStorageTheme = () => {
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const loadTheme = async () => {
    const value = await AsyncStorage.getItem(THEME_KEY);
    if (value) {
      const theme: Theme = JSON.parse(value);
      changeTheme(theme);
    } else {
      changeTheme(primaryDarkTheme);
    }
    const cellValue = await AsyncStorage.getItem(CELL_THEME_KEY);
    if (cellValue) {
      const cellTheme: typeof firstVariant = JSON.parse(cellValue);
      changeCellTheme(cellTheme);
    } else {
      changeCellTheme(firstVariant);
    }
    setIsThemeLoaded(true);
  };

  return { loadTheme, isThemeLoaded };
};
