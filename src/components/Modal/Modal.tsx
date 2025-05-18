import ReactDom from 'react-dom';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDom.createPortal(
    <Overlay onClick={onClose}>
      <ModalWrapper
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        {children}
      </ModalWrapper>
    </Overlay>,
    document.body,
  );
};

export default Modal;

const Overlay = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
`;

const ModalWrapper = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 36px 72px;
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
`;
