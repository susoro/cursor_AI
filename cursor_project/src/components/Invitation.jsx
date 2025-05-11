import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled(motion.section)`
  padding: 60px 20px;
  text-align: center;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 100px 20px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background-color: ${props => props.theme.colors.accent};
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background-color: ${props => props.theme.colors.accent};
    opacity: 0.5;
  }
`;

const InvitationFrame = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  border: 1px solid ${props => props.theme.colors.accent};
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid ${props => props.theme.colors.accent};
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const Paragraph = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  word-break: keep-all;
  color: ${props => props.theme.colors.text};
`;

const Parents = styled(motion.div)`
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ParentGroup = styled(motion.div)`
  text-align: center;
`;

const ParentTitle = styled(motion.h3)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const ParentNames = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
`;

const Invitation = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
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
        staggerChildren: 0.2,
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
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      id="invitation"
    >
      <InvitationFrame variants={itemVariants}>
        <Title variants={itemVariants}>초대합니다</Title>
        <Paragraph variants={itemVariants}>
          봄날의 따스한 햇살 아래<br />
          새로운 인연으로 만난 두 사람이<br />
          이제 하나의 가정을 이루려 합니다.
        </Paragraph>
        <Paragraph variants={itemVariants}>
          서로에 대한 존중과 배려, 그리고 사랑으로<br />
          평생을 함께하고자 하는 자리에<br />
          소중한 분들을 초대합니다.
        </Paragraph>
        <Paragraph variants={itemVariants}>
          귀한 발걸음 해주시어<br />
          두 사람의 출발을 축복해 주시면<br />
          더없는 기쁨으로 간직하겠습니다.
        </Paragraph>
        
        <Parents>
          <ParentGroup variants={itemVariants}>
            <ParentTitle>신랑 측</ParentTitle>
            <ParentNames>아버지 이상호 · 어머니 박영미</ParentNames>
            <ParentNames>아들 이재현</ParentNames>
          </ParentGroup>
          <ParentGroup variants={itemVariants}>
            <ParentTitle>신부 측</ParentTitle>
            <ParentNames>아버지 김영수 · 어머니 최은정</ParentNames>
            <ParentNames>딸 김민지</ParentNames>
          </ParentGroup>
        </Parents>
      </InvitationFrame>
    </SectionContainer>
  );
};

export default Invitation; 