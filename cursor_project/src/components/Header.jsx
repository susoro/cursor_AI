import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeaderContainer = styled(motion.header)`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
              url('/images/header-bg.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  padding: 0 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(249, 243, 235, 0.6);
    z-index: 1;
  }
`;

const Content = styled(motion.div)`
  z-index: 2;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Names = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Date = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  z-index: 2;
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
      <Content>
        <Title variants={itemVariants}>우리, 결혼합니다</Title>
        <Subtitle variants={itemVariants}>함께 걸어갈 길, 그 시작점에 초대합니다</Subtitle>
        <Names variants={itemVariants}>이재현 ♥ 김민지</Names>
        <Date variants={itemVariants}>2025년 5월 25일 오후 1시</Date>
        <Date variants={itemVariants}>남산골한옥마을</Date>
      </Content>
      <ScrollDown
        variants={itemVariants}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })}
      >
        ↓
      </ScrollDown>
    </HeaderContainer>
  );
};

export default Header; 