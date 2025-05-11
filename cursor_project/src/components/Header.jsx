import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeaderContainer = styled(motion.header)`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #232958;
  background-size: cover;
  position: relative;
  padding: 60px 20px;
  overflow: hidden;
  touch-action: pan-y; /* 모바일에서 수직 스크롤 허용 */
  
  @media (max-width: 576px) {
    padding: 40px 15px;
  }
`;

const TopBorder = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  display: flex;
  
  &::before {
    content: '';
    width: 50%;
    height: 100%;
    background-color: #3351D0;
  }
  
  &::after {
    content: '';
    width: 50%;
    height: 100%;
    background-color: #C24C4C;
  }
  
  @media (max-width: 576px) {
    width: 200px;
    height: 30px;
  }
`;

const BottomBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  display: flex;
  
  &::before {
    content: '';
    width: 50%;
    height: 100%;
    background-color: #3351D0;
  }
  
  &::after {
    content: '';
    width: 50%;
    height: 100%;
    background-color: #C24C4C;
  }
  
  @media (max-width: 576px) {
    width: 200px;
    height: 30px;
  }
`;

const Content = styled(motion.div)`
  z-index: 2;
  position: relative;
  margin-bottom: 30px;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 3rem;
  letter-spacing: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CoupleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  color: #ffffff;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 0.5rem;
  margin: 0 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Heart = styled(motion.div)`
  color: #C24C4C;
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

const Date = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 6rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const IllustrationContainer = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 400px;
  height: 400px;
  margin: 0 auto;
  border: 2px solid #6e729f;
  border-radius: 10px;
  padding: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 2px solid #6e729f;
    border-radius: 5px;
    z-index: 1;
  }
  
  @media (max-width: 576px) {
    height: 300px;
  }
`;

const KoreanSymbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }
`;

const CoupleFigures = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VenueInfo = styled(motion.div)`
  width: 90%;
  max-width: 300px;
  background-color: rgba(255, 235, 235, 0.9);
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  z-index: 3;
`;

const VenueName = styled.h3`
  font-family: ${props => props.theme.fonts.title};
  color: #C24C4C;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const VenueAddress = styled.p`
  font-family: ${props => props.theme.fonts.body};
  color: #333;
  font-size: 1rem;
`;

const MusicButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
`;

const RedFlowers = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: transparent;
  z-index: 2;
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 2rem;
  z-index: 5;
  cursor: pointer;
  
  @media (max-width: 576px) {
    bottom: 50px;
    font-size: 1.5rem;
  }
`;

const Header = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  
  return (
    <HeaderContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      id="header"
    >
      <TopBorder />
      <MusicButton />
      <Content>
        <Title variants={itemVariants}>청첩장</Title>
        <CoupleContainer>
          <NameColumn>
            <Name variants={itemVariants}>최정훈</Name>
          </NameColumn>
          <Heart variants={itemVariants}>♥</Heart>
          <NameColumn>
            <Name variants={itemVariants}>전수경</Name>
          </NameColumn>
        </CoupleContainer>
        <Date variants={itemVariants}>2025년 6월 28일 토요일 오후 1시</Date>
        
        <IllustrationContainer variants={itemVariants}>
          <KoreanSymbol />
          <CoupleFigures>
            {/* 커플 일러스트는 실제 이미지로 대체할 수 있습니다 */}
          </CoupleFigures>
          <RedFlowers />
        </IllustrationContainer>
        
        <VenueInfo variants={itemVariants}>
          <VenueName>남산골 한옥마을</VenueName>
          <VenueAddress>서울특별시 중구 퇴계로 34길 28</VenueAddress>
        </VenueInfo>
      </Content>
      
      <ScrollDown
        variants={itemVariants}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })}
      >
        ↓
      </ScrollDown>
      <BottomBorder />
    </HeaderContainer>
  );
};

export default Header; 