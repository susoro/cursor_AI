import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCheck, faComment } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled(motion.footer)`
  padding: 40px 20px;
  text-align: center;
  background-color: ${props => props.theme.colors.secondary};
  position: relative;
  
  @media (min-width: 768px) {
    padding: 60px 20px;
  }
`;

const ShareContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto 40px;
  padding: 30px;
  border: 1px solid ${props => props.theme.colors.accent};
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const ShareTitle = styled(motion.h3)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const ShareButtons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShareButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  
  &.kakao {
    background-color: #FEE500;
    color: #3A1D1D;
  }
  
  &.copy {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.copied {
    background-color: #4caf50;
  }
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const Copyright = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  margin-top: 30px;
`;

const ThankYou = styled(motion.p)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);
  
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
  
  const handleShareKakao = () => {
    // 실제 구현시 카카오톡 SDK 연동 필요
    alert('카카오톡 공유 기능은 실제 구현시 카카오톡 SDK가 필요합니다.');
  };
  
  const handleCopy = () => {
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  return (
    <FooterContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <ShareContainer variants={itemVariants}>
        <ShareTitle variants={itemVariants}>청첩장 공유하기</ShareTitle>
        <ThankYou variants={itemVariants}>
          소중한 분들에게 알려주세요
        </ThankYou>
        
        <ShareButtons>
          <ShareButton
            className="kakao"
            onClick={handleShareKakao}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faComment} />
            카카오톡 공유
          </ShareButton>
          
          <CopyToClipboard 
            text={window.location.href}
            onCopy={handleCopy}
          >
            <ShareButton
              className={`copy ${isCopied ? 'copied' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={isCopied ? faCheck : faLink} />
              {isCopied ? '복사 완료' : '링크 복사'}
            </ShareButton>
          </CopyToClipboard>
        </ShareButtons>
      </ShareContainer>
      
      <Copyright variants={itemVariants}>
        &copy; 2025 이재현 ♥ 김민지 Wedding
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 