import styled from 'styled-components';
import Modal from './Modal';
import WarningIcon from '../../assets/icons/Snow.svg?react';

interface DeleteModalProps {
  locationName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <Modal onClose={onCancel}>
      <Wrapper>
        <ModalTitle>정말로 삭제하시겠습니까?</ModalTitle>
        <IconWrapper>
          <WarningIcon width={160} height={160} />
        </IconWrapper>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소하기</CancelButton>
          <DeleteButton onClick={onConfirm}>삭제하기</DeleteButton>
        </ButtonRow>
      </Wrapper>
    </Modal>
  );
};

export default DeleteModal;

const ModalTitle = styled.div`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-self: stretch;
`;

const CancelButton = styled.button`
  display: flex;
  padding: 6px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #292e2e;
  background: #fff;
  color: #292e2e;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: flex;
  padding: 6px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: #292e2e;
  color: #fff;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
