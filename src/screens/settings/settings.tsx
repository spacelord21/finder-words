import { Header, styled, Separator, PrimaryButton } from "@shared/ui";
import { AppTheme, CellsTheme, HelpProject } from "./ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TMainStackParamList } from "@app/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.background.primary};
  flex-direction: column;
`;

type Navigation = NativeStackNavigationProp<TMainStackParamList, "bottomsTabs">;

export const Settings = () => {
  const navigation = useNavigation<Navigation>();
  const [modalOpen, setOpen] = useState(false);
  return (
    <Container>
      <Header onPressLeft={() => navigation.goBack()} title="Настройки" />
      <AppTheme />
      <Separator />
      <CellsTheme />
      <Separator />
      <PrimaryButton onPress={() => setOpen(true)}>
        Поддержать проект
      </PrimaryButton>
      {modalOpen ? <HelpProject closeWindow={() => setOpen(false)} /> : null}
    </Container>
  );
};
