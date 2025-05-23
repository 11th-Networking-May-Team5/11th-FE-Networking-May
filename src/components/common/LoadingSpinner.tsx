import styled from 'styled-components';
import { motion } from 'framer-motion';

/**
 *
 */
const LoadingSpinner = () => {
  return (
    <Container>
      <Spinner
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 1,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled(motion.div)`
  width: 48px;
  height: 48px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #f6398d;
  border-radius: 50%;
  margin: auto;
`;

export default LoadingSpinner;
