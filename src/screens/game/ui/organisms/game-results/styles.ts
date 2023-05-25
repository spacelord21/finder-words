import { Typography, styled } from "@shared/ui";

export const Container = styled.TouchableOpacity`
  z-index: 50;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Window = styled.View`
  z-index: 100;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
`;

export const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: ${({ theme }) => theme.spacing(3)}px;
  top: ${({ theme }) => theme.spacing(2.7)}px;
`;

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
