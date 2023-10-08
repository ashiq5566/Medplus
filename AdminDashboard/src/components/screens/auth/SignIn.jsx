import React from 'react'
import styled from 'styled-components'	
import useAuthStore from '../../hooks/useAuthStore';


function SignIn() {

  return (
    <SignInContainer>
		<SignInForm >
			<FormTitle>Sign In</FormTitle>
			<FormField 
				type="text"
				name="username"
				// value={username}
				// onChange={handleInputChange}
				placeholder="Username"
			/>
			<FormField 
				type="password"
				name="password"
				// value={password}
				// onChange={handleInputChange}
				placeholder="Password"
			/>
			<SubmitButton type="submit">Sign In</SubmitButton>
		</SignInForm>
    </SignInContainer>
  )
}

export default SignIn

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignInForm = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;