import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      secondary: string;
      background: string;
      white: string;
      black: string;
      gray: string;
      lightGray: string;
      error: string;
      success: string;
      warning: string;
      bambooBackground: string;
    };
    
    fonts: {
      regular: string;
      bold: string;
    };
    
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
    
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
