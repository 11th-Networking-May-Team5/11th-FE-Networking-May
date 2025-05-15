import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarListItem from './SidebarListItem';
import MapIcon from '../../assets/icons/map-pin-front-color.svg?react';
import PlusIcon from '../../assets/icons/plus-front-clay.svg?react';

/**
 * Sidebar에 표시할 위치 리스트 (Mock 데이터)
 */
const mockLocations = [
  '강남역 1번 출구',
  'RATTHAT',
  '파이홀',
  '청수공장명',
  '롯데월드',
  '구관',
  'Osiu',
];

/**
 * Sidebar 컴포넌트의 props 정의
 */
interface SidebarProps {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  setIsModalOpen: (open: boolean) => void;
}

/**
 * @component Sidebar
 * @description 위치 목록을 표시하고 선택하거나 모달을 여는 사이드바 컴포넌트
 * @param {string | null} selectedLocation - 선택된 위치 문자열 또는 null
 * @param {(location: string | null) => void} setSelectedLocation - 선택된 위치 상태를 설정하는 함수
 * @param {(open: boolean) => void} setIsModalOpen - 모달을 열지 여부를 설정하는 함수
 */
const Sidebar = ({ selectedLocation, setSelectedLocation, setIsModalOpen }: SidebarProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /**
   * 위치 클릭 시 선택 상태 토글
   * @param {string} location - 선택된 위치
   */
  const handleClick = (location: string) => {
    setSelectedLocation(selectedLocation === location ? null : location);
  };

  return (
    <Wrapper>
      {/* 상단 제목 */}
      <TitleRow>
        <StyledIcon><MapIcon /></StyledIcon>
        <TitleText>위치 목록</TitleText>
      </TitleRow>

      {/* 추가하기 버튼 */}
      <AddRow onClick={() => setIsModalOpen(true)}>
        <StyledIcon><PlusIcon /></StyledIcon>
        <TitleText>추가하기</TitleText>
      </AddRow>

      {/* 위치 리스트 */}
      <LocationList>
        {mockLocations.map((location, index) => (
          <SidebarListItem
            key={location}
            location={location}
            selected={selectedLocation === location}
            hovered={hoveredIndex === index}
            onClick={() => handleClick(location)}
            onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
            onDelete={() => console.log(`${location} 삭제`)}
          />
        ))}
      </LocationList>
    </Wrapper>
  );
};


export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  width: 248px;
  height: 1200px;
  padding: 48px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  position: absolute;
  border-radius: 0 48px 48px 0;
  background: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TitleText = styled.div`
  color: #292e2e;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
`;

const AddRow = styled(TitleRow)`
  cursor: pointer;
`;

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LocationList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;