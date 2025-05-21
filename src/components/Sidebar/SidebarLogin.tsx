import React from 'react';
import styled from 'styled-components';
import { postAuthLogin } from '../../apis/Auth/authLogin';

interface LoginMessageProps {
  $error: boolean;
}

const SidebarLogin = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const loginFormRef = React.useRef<HTMLFormElement>(null);

  /**
   *
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = loginFormRef.current?.username.value;
    const password = loginFormRef.current?.password.value;

    const { success, message } = await postAuthLogin(username, password);

    if (!success) {
      setErrorMessage(message);
      return;
    }

    setErrorMessage(null);

    window.location.reload();
  };

  return (
    <LoginWrapper>
      <LoginHeader>
        로그인해서 장소를 추가하고
        <br />
        날씨를 확인하세요.
      </LoginHeader>
      <LoginForm ref={loginFormRef} onSubmit={handleSubmit}>
        <LoginInput required id="username" type="text" placeholder="이름" />
        <LoginInput
          required
          id="password"
          type="password"
          placeholder="비밀번호"
        />
        <LoginButton>로그인</LoginButton>
      </LoginForm>
      <LoginMessage $error={!!errorMessage}>
        {errorMessage ||
          '이름과 비밀번호를 입력해서 새로운 계정을 만들어 보세요!'}
      </LoginMessage>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  margin-top: 40px;
`;

const LoginHeader = styled.h2`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0 2px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 20px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    border-color: none;
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  background-color: #f6398d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const LoginMessage = styled.span<LoginMessageProps>`
  color: ${({ $error }) => $error && '#ed4956'};
  font-size: 12px;
  line-height: 18px;
  margin-top: 12px;
  padding: 4px;
`;

export default SidebarLogin;
