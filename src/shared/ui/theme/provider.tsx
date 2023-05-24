import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { useStore } from "effector-react";
import { $theme } from "../../../entities/theme";

type Props = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: Props) => {
  const theme = useStore($theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
