import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './components/GlobalStyle'
import WeddingInvitation from './pages/WeddingInvitation'

const theme = {
  colors: {
    primary: '#8B4513',
    secondary: '#e9dbca',
    accent: '#C19A6B',
    background: '#f9f3eb',
    text: '#4A3728',
  },
  fonts: {
    title: 'Gowun Batang, serif',
    body: 'Pretendard, sans-serif',
  }
}

function App() {
  useEffect(() => {
    // iOS에서 100vh 문제 해결을 위한 함수
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 로드 시 실행
    setVh();

    // 리사이즈 및 방향 전환 시 실행
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<WeddingInvitation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
