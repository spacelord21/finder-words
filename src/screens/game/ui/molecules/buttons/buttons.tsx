import { PrimaryButton, styled } from "@shared/ui";

const ButtonContainer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  z-index: 100;
`;

type TButtonsProps = {
  onResultsPressHandler: () => void;
  onNextWordPresHandler: () => void;
};

export const Buttons = ({
  onNextWordPresHandler,
  onResultsPressHandler,
}: TButtonsProps) => {
  return (
    <ButtonContainer>
      <PrimaryButton onPress={onResultsPressHandler}>Результат</PrimaryButton>
      <PrimaryButton onPress={onNextWordPresHandler}>
        Следующее слово
      </PrimaryButton>
    </ButtonContainer>
  );
};
