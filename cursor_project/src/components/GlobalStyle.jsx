import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 1vh;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    scroll-behavior: smooth;
    font-size: 16px; /* 기본 폰트 사이즈 */
    scroll-padding-top: 20px; /* 스크롤 시 상단 여백 추가 */
    
    /* 모바일 최적화 - 반응형 폰트 크기 */
    @media (max-width: 768px) {
      font-size: calc(14px + 0.25vw);
      scroll-padding-top: 10px;
    }
    
    @media (max-width: 576px) {
      font-size: calc(12px + 0.25vw);
    }
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%; /* 가로 모드에서 폰트 크기 자동 조정 방지 */
    max-width: 100vw;
    overflow-x: hidden;
    padding: 0;
    margin: 0 auto;
    text-rendering: optimizeSpeed; /* 텍스트 렌더링 성능 최적화 */
    
    /* 모바일 화면에서 최대 너비 제한 */
    @media (max-width: 768px) {
      max-width: 100%;
      padding: 0;
      overscroll-behavior: contain; /* 모바일에서 당겨서 새로고침 방지 */
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.title};
    font-weight: 700;
    margin-bottom: 1rem;
    word-break: keep-all; /* 한글 단어 분리 방지 */
    line-height: 1.3; /* 제목 요소 줄 간격 최적화 */
  }
  
  p {
    word-break: keep-all; /* 한글 텍스트 줄바꿈 최적화 */
    overflow-wrap: break-word; /* 긴 텍스트 래핑 */
  }
  
  a {
    text-decoration: none;
    color: inherit;
    touch-action: manipulation; /* 모바일에서 탭 지연 제거 */
    user-select: none; /* 텍스트 선택 방지로 모바일 경험 개선 */
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    touch-action: manipulation; /* 모바일에서 탭 지연 제거 */
    user-select: none; /* 버튼 텍스트 선택 방지 */
    border-radius: 0; /* iOS 기본 스타일 제거 */
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block; /* 이미지 간격 문제 해결 */
    content-visibility: auto; /* 이미지 렌더링 성능 개선 */
  }
  
  /* 모바일에서 input 요소 최적화 */
  input, textarea, select, button {
    font-size: 16px; /* 모바일에서 확대 방지 */
    -webkit-appearance: none; /* iOS에서 기본 스타일 제거 */
    -moz-appearance: none;
    appearance: none;
    border-radius: 0; /* iOS에서 둥근 모서리 제거 */
  }
  
  /* 모바일 터치 최적화 - 터치 영역 확대 */
  a, button, input[type="button"], input[type="submit"] {
    min-height: 44px;
    min-width: 44px;
    padding: 8px;
  }
  
  /* iOS 관련 최적화 */
  * {
    -webkit-tap-highlight-color: transparent; /* 탭 하이라이트 제거 */
  }
  
  /* iOS 모멘텀 스크롤 지원 */
  .scroll-container {
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
  }
  
  /* 스와이프 제스처 최적화 */
  .swiper-container {
    touch-action: pan-y;
  }
  
  /* 애니메이션 성능 최적화 */
  .animated {
    will-change: transform, opacity;
  }
  
  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 6px;
    
    @media (max-width: 768px) {
      width: 3px;
    }
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.secondary};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 3px;
  }
  
  /* 화면 방향 전환 스타일 */
  @media screen and (orientation: landscape) and (max-height: 500px) {
    .max-height-element {
      height: 100vh;
    }
  }
  
  /* 다크 모드 대응 */
  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

// iOS에서 100vh 문제 해결을 위한 함수
if (typeof window !== 'undefined') {
  // 뷰포트 높이 설정 함수
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  // 초기 로드와 resize 이벤트에 함수 연결
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);
}

export default GlobalStyle; 