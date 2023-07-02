import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TMainStackParamList } from "../types";
import { Menu } from "@screens/menu";
import { Game } from "@screens/game";
import { Settings } from "@screens/settings";
import { useTheme } from "styled-components";
import { Rules } from "@screens/rules";
import { TabNavigation } from "../tab-navigation";

const Stack = createNativeStackNavigator<TMainStackParamList>();
const defaultOptions = {
  headerShown: false,
};

export const MainStackNavigation = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator initialRouteName="bottomsTabs">
      <Stack.Screen
        name="bottomsTabs"
        component={TabNavigation}
        options={{ ...defaultOptions }}
      />
      <Stack.Screen
        name="game"
        component={Game}
        options={{ ...defaultOptions }}
      />
    </Stack.Navigator>
  );
};
