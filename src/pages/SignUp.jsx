import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasAtSymbol = email.includes("@");
    setIsValidEmail(hasAtSymbol);
    setIsValidPassword(password.length >= 8);

    if (hasAtSymbol && password.length >= 8) {
      try {
        const response = await axios.post(
          "https://www.pre-onboarding-selection-task.shop/auth/signup",
          {
            email,
            password,
          }
        );

        if (response.status === 201) {
          console.log("회원가입 성공");
          navigate("/todo");
        } else {
          console.log("회원가입 실패");
        }
      } catch (error) {
        console.error("회원가입 요청 에러:", error);
      }
    }
  };

  return (
    <SignupContainer>
      <SignupFormContainer onSubmit={handleSubmit}>
        <SignupTitle>회원가입</SignupTitle>
        <SignupInput
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
          isValid={isValidEmail}
        />
        {!isValidEmail && (
          <ErrorMessage>올바른 이메일 형식이 아닙니다.</ErrorMessage>
        )}
        <SignupInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
          isValid={isValidPassword}
        />
        {!isValidPassword && (
          <ErrorMessage>비밀번호는 최소 8글자 이상이어야 합니다.</ErrorMessage>
        )}
        <div>
          <Link to="/signin">
            <SignupButton type="button">이전으로</SignupButton>
          </Link>
          <SignupButton
            type="submit"
            data-testid="signup-button"
            disabled={!isValidPassword}
          >
            가입하기
          </SignupButton>
        </div>
      </SignupFormContainer>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignupFormContainer = styled.form`
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

const SignupTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const SignupInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 300px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  border-radius: 4px;
  outline: none;
`;

const SignupButton = styled.button`
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
