import { Typography, styled } from "@shared/ui";

type TCellProps = {
  size: number;
  value?: string;
  // word: string;
};

const Container = styled.View<TCellProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 5px;
  border: 1px dotted ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.background.tertiary};
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing(0.5)}px;
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;
`;

const Value = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Cell = ({ size, value }: TCellProps) => {
  return (
    <Container size={size}>
      <Value variant="title">{value ?? ""}</Value>
    </Container>
  );
};
