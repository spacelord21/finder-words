import { Typography, styled, Separator as Line } from "@shared/ui";

export const Separator = styled(Line)<{ width: number }>`
  width: ${({ width }) => width}px;
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
