import React from 'react'
import { styled } from 'styled-components'

function CreateDoctor({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <Container>
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-content">
                    <FormContainer>
                        <form method="POST">
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                <input type="file" id="file" name="file" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">First Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name:</label>
                                <input type="text" id="last_name" name="last_name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qual">Qualifications</label>
                                <input type="text" id="qual" name="qual" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exp">Experience</label>
                                <input type="text" id="exp" name="exp" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" id="phone" name="phone" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bg">Blood group</label>
                                <input type="text" id="bg" name="bg" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialization">Specialization:</label>
                                <input type="text" id="specialization" name="specialization" required />
                            </div>
                        </form>
                    </FormContainer>
                    <ButtonContainer>
                        <Button>
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
                        
                        
                        
                        
    
                   