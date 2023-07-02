import { Typography, styled, Separator as Line } from "@shared/ui";

export const Container = styled.TouchableOpacity`
  z-index: 50;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled(Line)<{ width: number }>`
  width: ${({ width }) => width}px;
`;

export const Window = styled.View`
  z-index: 100;
  background-color: ${({ theme }) =>
    theme.name == "light"
      ? theme.palette.background.secondary
      : theme.palette.background.primary};
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid
    ${({ theme }) =>
      theme.name === "light"
        ? theme.palette.accent.dark
        : theme.palette.accent.primary};
`;

export const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: ${({ theme }) => theme.spacing(3)}px;
  top: ${({ theme }) => theme.spacing(2.7)}px;
`;

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;
