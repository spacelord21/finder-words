import { Typography, styled } from "@shared/ui";

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;

export const QR = styled(Typography)`
  color: ${({ theme }) => theme.palette.accent.primary};
`;
