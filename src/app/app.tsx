import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AppThemeProvider } from "@shared/ui";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

const customFonts = {
  ROBOTO_LIGHT: require("../../assets/fonts/Roboto-Light.ttf"),
  ROBOTO_REGULAR: require("../../assets/fonts/Roboto-Regular.ttf"),
  ROBOTO_MEDIUM: require("../../assets/fonts/Roboto-Medium.ttf"),
  ROBOTO_BOLD: require("../../assets/fonts/Roboto-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

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
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  if (!isFontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AppThemeProvider>'some'</AppThemeProvider>
    </SafeAreaView>
  );
};
