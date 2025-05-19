import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import AppRouter from './router';
import { AuthProvider } from './contexts/AuthContext';

// 앱 전체 레이아웃을 위한 스타일
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <AuthProvider>
          <Router>
            <AppRouter />
          </Router>
        </AuthProvider>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
