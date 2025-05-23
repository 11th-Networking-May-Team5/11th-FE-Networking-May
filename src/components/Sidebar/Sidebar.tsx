import styled from 'styled-components';
import mapPin from '../../assets/icons/map-pin-front-color.png';
import SidebarList from './SidebarList';
import { SIDEBAR_WIDTH } from '../../constans';
import SidebarLogin from './SidebarLogin';
import useAuth from '../../hooks/useUser';
import Skeleton from '../common/Skeleton';

const Sidebar = () => {
  const { isLoading } = useAuth();

  /**
   *
   */
  return (
    <Wrapper>
      <Skeleton
        isLoading={isLoading}
        height="100%"
        style={{ margin: '8px 16px' }}
      >
        <TitleRow>
          <StyledIcon src={mapPin} alt="map-pin" />
          <TitleText>위치 목록</TitleText>
        </TitleRow>
        <SidebarLogin />
        <SidebarList />
      </Skeleton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-shrink: 0;
  width: ${SIDEBAR_WIDTH};
  padding: 48px 16px;
  display: flex;
  flex-direction: column;
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

const StyledIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export default Sidebar;
