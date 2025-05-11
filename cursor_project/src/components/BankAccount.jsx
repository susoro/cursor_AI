import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const SectionContainer = styled(motion.section)`
  padding: 60px 20px;
  text-align: center;
  position: relative;
  
  @media (min-width: 768px) {
    padding: 100px 20px;
  }
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
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

const AccountContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 40px 30px;
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

const Description = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const AccountsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
`;

const AccountBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${props => props.theme.colors.accent};
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const AccountInfo = styled.div`
  flex: 1;
  text-align: left;
  
  @media (max-width: 767px) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const AccountName = styled.h3`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const BankName = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const AccountNumber = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;

const CopyButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #6d3510;
  }
  
  &.copied {
    background-color: #4caf50;
  }
`;

const BankAccount = () => {
  const [copiedAccounts, setCopiedAccounts] = useState({});
  
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
  
  const accountsList = [
    {
      id: 1,
      name: '신랑 이재현',
      bank: '국민은행',
      accountNumber: '123-45-67890',
    },
    {
      id: 2,
      name: '신부 김민지',
      bank: '신한은행',
      accountNumber: '987-65-43210',
    },
    {
      id: 3,
      name: '신랑측 혼주',
      bank: '우리은행',
      accountNumber: '111-22-33333',
    },
    {
      id: 4,
      name: '신부측 혼주',
      bank: '하나은행',
      accountNumber: '444-55-66666',
    },
  ];
  
  const handleCopy = (id) => {
    setCopiedAccounts({ ...copiedAccounts, [id]: true });
    
    setTimeout(() => {
      setCopiedAccounts({ ...copiedAccounts, [id]: false });
    }, 2000);
  };
  
  return (
    <SectionContainer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <Title variants={itemVariants}>마음 전하실 곳</Title>
      <AccountContainer variants={itemVariants}>
        <Description variants={itemVariants}>
          축하의 마음을 전하고 싶으신 분들을 위해<br />
          계좌번호를 안내해 드립니다.
        </Description>
        
        <AccountsWrapper>
          {accountsList.map((account) => (
            <AccountBox key={account.id} variants={itemVariants}>
              <AccountInfo>
                <AccountName>{account.name}</AccountName>
                <BankName>{account.bank}</BankName>
                <AccountNumber>{account.accountNumber}</AccountNumber>
              </AccountInfo>
              <CopyToClipboard 
                text={`${account.bank} ${account.accountNumber} ${account.name}`}
                onCopy={() => handleCopy(account.id)}
              >
                <CopyButton
                  className={copiedAccounts[account.id] ? 'copied' : ''}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedAccounts[account.id] ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} />
                      복사 완료
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCopy} />
                      복사하기
                    </>
                  )}
                </CopyButton>
              </CopyToClipboard>
            </AccountBox>
          ))}
        </AccountsWrapper>
      </AccountContainer>
    </SectionContainer>
  );
};

export default BankAccount; 