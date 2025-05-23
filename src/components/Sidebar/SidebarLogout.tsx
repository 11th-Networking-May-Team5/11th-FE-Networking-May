import styled from 'styled-components';
import { postAuthLogout } from '../../apis/Auth/authLogout';

const SidebarLogout = () => {
  /**
   *
   */
  const handleLogout = () => {
    postAuthLogout();

    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <LogoutButtonContainer>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </LogoutButtonContainer>
  );
};

const LogoutButtonContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0 12px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #737373;
  text-decoration: underline;
`;

export default SidebarLogout;
