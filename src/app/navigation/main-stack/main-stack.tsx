import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TMainStackParamList } from "../types";
import { Menu } from "@screens/menu";
import { Game } from "@screens/game";
import { Settings } from "@screens/settings";

const Stack = createNativeStackNavigator<TMainStackParamList>();
const defaultOptions = {
  headerShown: false,
};

export const MainStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen
        name="main"
        component={Menu}
        options={{ ...defaultOptions }}
      />
      <Stack.Screen
        name="game"
        component={Game}
        options={{ ...defaultOptions }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{ ...defaultOptions }}
      />
    </Stack.Navigator>
  );
};
