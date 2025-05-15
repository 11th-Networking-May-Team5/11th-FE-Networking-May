import styled from 'styled-components';
import  WarningIcon from '../assets/icons/Snow.svg?react';

interface DeleteModalProps {
locationName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * @component DeleteModal
 * @description 위치 삭제 여부를 묻는 확인 모달
 * @param {() => void} onCancel - 취소 클릭 시 실행 함수
 * @param {() => void} onConfirm - 삭제 클릭 시 실행 함수
 */
const DeleteModal = ({ onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <Overlay>
      <ModalBox>
        <ModalTitle>정말로 삭제하시겠습니까?</ModalTitle>
        <IconWrapper>
          <WarningIcon width={160} height={160} />
        </IconWrapper>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소하기</CancelButton>
          <DeleteButton onClick={onConfirm}>삭제하기</DeleteButton>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
};

export default DeleteModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalBox = styled.div`
  display: flex;
  padding: 36px 108px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
`;

const ModalTitle = styled.div`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 700;
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
