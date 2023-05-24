import { SafeAreaView, Text } from "react-native";
import { AppThemeProvider } from "@shared/ui";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./navigation";
import { getDictionariesFx, getTargetsFx } from "@entities/game";
import { useStorageTheme } from "@entities/theme";

const customFonts = {
  ROBOTO_LIGHT: require("../../assets/fonts/Roboto-Light.ttf"),
  ROBOTO_REGULAR: require("../../assets/fonts/Roboto-Regular.ttf"),
  ROBOTO_MEDIUM: require("../../assets/fonts/Roboto-Medium.ttf"),
  ROBOTO_BOLD: require("../../assets/fonts/Roboto-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const { isThemeLoaded, loadTheme } = useStorageTheme();

  const loadFonts = async () => {
    try {
      await Font.loadAsync({ ...customFonts });
      setIsFontsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFonts();
    loadTheme();
    getDictionariesFx();
    getTargetsFx();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded && isThemeLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, isThemeLoaded]);

  if (!isFontsLoaded && !isThemeLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AppThemeProvider>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </AppThemeProvider>
    </SafeAreaView>
  );
};
