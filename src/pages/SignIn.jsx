import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(
          "https://www.pre-onboarding-selection-task.shop/auth/signin",
          {
            email: email,
            password: password,
          }
        );
        const access_token = response.data.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/todo");
      } catch (error) {
        console.error("로그인 에러:", error);
      }
    }
  };

  const validateEmail = (value) => {
    return value.includes("@");
  };

  const validatePassword = (value) => {
    return value.length >= 8;
  };

  return (
    <SignInContainer>
      <SignInFormContainer>
        <SignInTitle>로그인</SignInTitle>
        <SignInInput
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
          isValid={isEmailValid}
        />
        {!isEmailValid && (
          <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>
        )}
        <SignInInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
          isValid={isPasswordValid}
        />
        {!isPasswordValid && (
          <ErrorMessage>비밀번호는 8자 이상이어야 합니다.</ErrorMessage>
        )}
        <div>
          <SignInButton data-testid="signin-button" onClick={handleSignIn}>
            로그인
          </SignInButton>
          <Link to="/signup">
            <SignInButton type="button">회원가입</SignInButton>
          </Link>
        </div>
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
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
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
  margin: 25px;

  &:hover {
    background-color: #ff5858;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;
