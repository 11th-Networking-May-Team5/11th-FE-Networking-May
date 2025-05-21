import React from 'react';
import styled from 'styled-components';

const SidebarLogin = () => {
  return (
    <LoginWrapper>
      <LoginHeader>
        로그인해서 장소를 추가하고
        <br />
        날씨를 확인하세요
      </LoginHeader>
      <LoginForm>
        <LoginInput required type="text" placeholder="아이디" />
        <LoginInput required type="password" placeholder="비밀번호" />
        <LoginButton>로그인</LoginButton>
      </LoginForm>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const LoginHeader = styled.h2`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 24px;
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

export default SidebarLogin;
