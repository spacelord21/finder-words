import "styled-components";
import { primaryDarkTheme } from "../theme";

type Theme = typeof primaryDarkTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
