import { Header, Typography, styled, Separator } from "@shared/ui";
import { AppTheme, CellsTheme } from "./ui";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  flex-direction: column;
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "settings">;

export const Settings = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <Container>
      <Header
        onPressLeft={() => navigation.navigate("main")}
        title="Настройки"
      />
      <AppTheme />
      <Separator />
      <CellsTheme />
      <Separator />
    </Container>
  );
};
