import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    color: ${({ theme }) => theme.COLORS.GRAY_700};
    -webkit-font-smoothing: antialiased;
  }
  body, input, textarea, button {
    font-family: 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
  button {
    cursor: pointer;
  }
`;