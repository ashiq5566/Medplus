import {React, useState, useEffect} from 'react'
import { styled } from 'styled-components'
import { ruppellsAuthConfig } from '../../config/axios';

function CreateDoctor({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [imageName, setImageName] = useState("Upload Image (size < 500kb)");
    const [inputs, setInputs] = useState({
        doctorName: "",
        doctorPhone: "",
        doctorEmail: "",
        doctorQualification: "",
        userName: "",
        password: "",
        rePassword: "",
        location: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const createDoctorHandler = () => {

        const formData = new FormData();

        formData.append("name", inputs.doctorName);
        formData.append("phone", inputs.doctorPhone);
        formData.append("email", inputs.doctorEmail);
        formData.append("qualification", inputs.doctorQualification);
        formData.append("username", inputs.userName);
        formData.append("password", inputs.password);
        formData.append("location", inputs.location);
        formData.append("confirm_password", inputs.rePassword);
        formData.append("image", profilePic);


        ruppellsAuthConfig
            .post("/doctors/create-doctor/", formData)
            .then((res) => {
                const { StatusCode, data } = res.data;
                if (StatusCode === 6000) {
                    // console.log(data);
                    window.location.reload();
                    // closeHandler();
                    uploadCallback();
                } else {
                    console.log(data);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
    };

    return (
        <Container>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-content">
                    <FormContainer>
                        <form method="POST">
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    value={inputs.image}
                                    accept="image/*"
                                    onChange={(e) => {
                                        setProfilePic(e.target.files[0]);
                                        setImageName(e.target.files[0].name);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    name="doctorName"
                                    value={inputs.doctorName}
                                    placeholder="Enter Name"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="doctorPhone"
                                    value={inputs.doctorPhone}
                                    placeholder="Enter Phone"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="doctorEmail"
                                    value={inputs.doctorEmail}
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qualification">qualification</label>
                                <input
                                    type="text"
                                    name="doctorQualification"
                                    value={inputs.doctorQualification}
                                    placeholder="Enter Qualification"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={inputs.userName}
                                    placeholder="Enter username"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    name="password"
                                    value={inputs.password}
                                    placeholder="Enter Password"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={inputs.location}
                                    placeholder="Enter location"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                            <div className="form-group">
                                <label htmlFor="repassword">confirm_password:</label>
                                <input
                                    type="text"
                                    name="rePassword"
                                    value={inputs.rePassword}
                                    placeholder="Enter password"
                                    onChange={(e) => {
                                        onChange(e);
                                }}
                             />
                            </div>
                        </form>
                    </FormContainer>
                    <ButtonContainer>
                        <Button onClick={createDoctorHandler}>
                            Submit
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </ButtonContainer>
                    </div>
                </div>
            </div>
        </Container>
        
    );
}

export default CreateDoctor

const Container = styled.div`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* Adjust the z-index as needed */
    }
    
    /* Styling for the modal */
    .modal {
        background-color: #fff; /* Background color of the modal */
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a shadow for depth */
        width: 630px;
        height: 700px;
    }
    
    /* Styling for modal content (you can customize this) */
    .modal-content {
        text-align: center;
    }
`;

const FormContainer = styled.div`
    .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
        }

        .form-group {
            margin-bottom: 15px;
            display: flex;

        }

        .form-group label {
            display: block;
            font-weight: bold;
            width: 180px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        .form-group button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    margin-top: 32px;
`
const Button = styled.div`
    background: #308E11;
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 120px;
    padding: 11px;
    height: 44px;
    text-align: center;
    border-radius: 5px;
`;
                        
                        
                        
                        
    
                   