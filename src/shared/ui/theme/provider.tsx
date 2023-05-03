import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "./theme";

type Props = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};
