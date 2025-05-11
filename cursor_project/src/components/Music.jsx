import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faMusic } from '@fortawesome/free-solid-svg-icons';

const MusicButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #6d3510;
  }
`;

const MusicLabel = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 80px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 20px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WaveAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.primary};
  opacity: 0;
`;

const Music = ({ isPlaying, togglePlay }) => {
  return (
    <>
      <MusicButton
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={e => {
          document.querySelector('.music-label').style.opacity = '1';
          document.querySelector('.music-label').style.transform = 'translateX(0)';
        }}
        onHoverEnd={e => {
          document.querySelector('.music-label').style.opacity = '0';
          document.querySelector('.music-label').style.transform = 'translateX(10px)';
        }}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        
        {isPlaying && (
          <>
            <WaveAnimation
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <WaveAnimation
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.6,
              }}
            />
          </>
        )}
      </MusicButton>
      
      <MusicLabel
        className="music-label"
        initial={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={faMusic} style={{ marginRight: '8px' }} />
        {isPlaying ? '음악 끄기' : '음악 켜기'}
      </MusicLabel>
    </>
  );
};

export default Music; 