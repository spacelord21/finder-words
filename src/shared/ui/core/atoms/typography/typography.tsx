import { css } from "styled-components/native";
import { styled } from "@shared/ui/theme";
import { TypographyVariants } from "@shared/ui/theme/types";

type TTypographyProps = {
  variant?: TypographyVariants;
};

export const Typography = styled.Text.attrs(() => ({
  allowFontScaling: false,
}))<TTypographyProps>`
  ${({ theme: { typography, palette }, variant = "body16" }) => css`
    font-family: ${typography[variant].fontFamily};
    letter-spacing: ${typography[variant].letterSpacing};
    font-size: ${typography[variant].size};
    color: ${palette.text.primary};
  `}
`;
