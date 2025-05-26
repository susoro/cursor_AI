import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from '../components/Header';
import Invitation from '../components/Invitation';
import Gallery from '../components/Gallery';
import Calendar from '../components/Calendar';
import Location from '../components/Location';
import Rsvp from '../components/Rsvp';
import BankAccount from '../components/BankAccount';
import Footer from '../components/Footer';
import Music from '../components/Music';

const Container = styled(motion.div)`
  max-width: 100%;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  height: auto;
  touch-action: pan-y; /* 모바일에서 수직 스크롤 허용 */
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f3eb; /* 배경 패턴 이미지가 없을 경우 대체 색상 */
  opacity: 0.05;
  z-index: -1;
  pointer-events: none;
`;

const SectionsContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: visible; /* 스크롤이 가능하도록 설정 */
`;

const WeddingInvitation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    // 페이지 로드 시 맨 위로 스크롤
    window.scrollTo(0, 0);
    
    // 배경 음악 로드 - 실제 파일이 없으므로 주석 처리
    // audioRef.current = new Audio('/audio/wedding-music.mp3');
    // audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('음악 재생 오류:', error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log('오디오 파일이 로드되지 않았습니다.');
    }
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BackgroundPattern />
      <Music isPlaying={isPlaying} togglePlay={togglePlay} />
      <SectionsContainer>
        <Header />
        <Invitation />
        <Gallery />
        <Calendar />
        <Location />
        <Rsvp />
        <BankAccount />
        <Footer />
      </SectionsContainer>
    </Container>
  );
};

export default WeddingInvitation; 