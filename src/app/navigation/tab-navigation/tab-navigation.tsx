import { TBottomTabsParamList } from "../types";
import { Menu } from "@screens/menu";
import { Settings } from "@screens/settings";
import { Rules } from "@screens/rules";
import { useTheme } from "styled-components";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Easing } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const Tabs = createMaterialBottomTabNavigator<TBottomTabsParamList>();

export const TabNavigation = () => {
  const theme = useTheme();
  const defaultOptions = {
    headerShown: false,
  };
  const secondTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: theme.palette.background.secondary,
    },
  };
  return (
    <PaperProvider theme={secondTheme}>
      <Tabs.Navigator
        initialRouteName="main"
        barStyle={{ backgroundColor: theme.palette.background.secondary }}
        activeColor={theme.palette.text.secondary}
        inactiveColor={theme.palette.background.tertiary}
        sceneAnimationType="opacity"
        sceneAnimationEasing={Easing.linear}
      >
        <Tabs.Screen
          name="main"
          component={Menu}
          options={{
            ...defaultOptions,
            tabBarLabel: "Meню",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="microsoft-xbox-controller-menu"
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          component={Settings}
          options={{
            ...defaultOptions,
            tabBarLabel: "Настройки",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={30} />
            ),
          }}
        />
        <Tabs.Screen
          name="rules"
          component={Rules}
          options={{
            ...defaultOptions,
            tabBarLabel: "Правила",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="clipboard"
                color={color}
                size={30}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </PaperProvider>
  );
};
