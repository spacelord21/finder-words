import { Typography, styled } from "@shared/ui";
import { TKeyboardButton } from "./button";
import { StyleSheet } from "react-native";

export const KeyboardButton = styled.TouchableOpacity.attrs(({}) => ({
  delayPressOut: 70,
  activeOpacity: 0.85,
}))<Pick<TKeyboardButton, "backgroundColor" | "width" | "height">>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height + 20}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-left: ${({ theme }) => theme.spacing(0.2)}px;
  margin-right: ${({ theme }) => theme.spacing(0.2)}px;
  margin-top: ${({ theme }) => theme.spacing(0.8)}px;
  border-radius: 5px;
`;

export const Text = styled(Typography)<Pick<TKeyboardButton, "color">>`
  text-transform: uppercase;
  color: ${({ color }) => color};
  font-weight: 600;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;
