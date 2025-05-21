import React from 'react';
import styled from 'styled-components';
import MapIcon from '../../assets/icons/map-pin-front-color.svg?react';
import SidebarList from './SidebarList';
import { SIDEBAR_WIDTH } from '../../constans';
import SidebarLogin from './SidebarLogin';

const Sidebar = () => {
  return (
    <Wrapper>
      <TitleRow>
        <StyledIcon>
          <MapIcon />
        </StyledIcon>
        <TitleText>위치 목록</TitleText>
      </TitleRow>
      {/* <SidebarList /> */}
      <SidebarLogin />
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  flex-shrink: 0;
  width: ${SIDEBAR_WIDTH};
  height: 100vh;
  padding: 48px 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
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

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
