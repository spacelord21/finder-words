import { Backspace, Enter } from "@shared/ui";
import { IconContainer, Text } from "./styles";

type Props = {
  content: string;
  letterColor: string;
};

export const ButtonContent = ({ content, letterColor }: Props) => {
  return content === ">" || content === "<" ? (
    content === "<" ? (
      <IconContainer>
        <Backspace />
      </IconContainer>
    ) : (
      <IconContainer>
        <Enter size={24} />
      </IconContainer>
    )
  ) : (
    <Text color={letterColor}>{content}</Text>
  );
};
