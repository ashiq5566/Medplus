import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuthStore from '../../hooks/useAuthStore';
import ruppellsConfig from "../../../config/axios";


function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const { isAuthenticated, login } = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            // .matches(
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
            //     "You entered a wrong password"
            // ),
        }),
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

            const params = {
                username: values.userName,
                password: values.password,
            };
            ruppellsConfig
                .post("/accounts/user-login/", params)
                .then((res) => {
                    const { data, StatusCode } = res.data;
                    if (StatusCode === 6000) {
                        // console.log("6000");
                        login(
                            data.response.access,
                            data.response.refresh,
                        );
                        navigate("/");
                    } else {
                        console.log(res.data);
                        // console.log("6001");
                        setErrorState(true);
                    }
                });
        },
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/");

		return ()=>{
			
		}
    }, []);

  return (
    <SignInContainer>
		<SignInForm onSubmit={formik.handleSubmit}>
			<FormTitle>Sign In</FormTitle>
			<FormField 
				type="text"
				id="userName"
				name="userName"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.userName}
			/>
				{formik.touched.userName &&
				formik.errors.userName ? (
					<span>{formik.errors.userName}</span>
				) : null}
			<FormField 
				type={showPassword ? "text" : "password"}
				id="password"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.password}
			/>
				{formik.touched.password &&
				formik.errors.password ? (
					<span>{formik.errors.password}</span>
				) : errorState ? (
					<span>Invalid Username or Password</span>
				) : null}
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