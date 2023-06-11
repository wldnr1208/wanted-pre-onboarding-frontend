import React from "react";
import styled from "styled-components";

export default function SignIn() {
  return (
    <SignInContainer>
      <SignInFormContainer>
        <SignInTitle>로그인</SignInTitle>
        <SignInInput
          type="text"
          placeholder="이메일"
          data-testid="email-input"
        />
        <SignInInput
          type="password"
          placeholder="비밀번호"
          data-testid="password-input"
        />
        <SignInButton data-testid="signin-button">로그인</SignInButton>
      </SignInFormContainer>
    </SignInContainer>
  );
}

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignInFormContainer = styled.div`
  width: 600px;
  height: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SignInTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const SignInInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const SignInButton = styled.button`
  padding: 10px 20px;
  background-color: #2225f1;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #ff5858;
  }
`;
