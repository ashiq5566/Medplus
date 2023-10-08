import React, { useMemo, useState } from 'react'
import { styled } from 'styled-components'
import SearchBox from '../../small/SearchBox';
import {
    BsHouseAddFill
  } from 'react-icons/bs';
import CreateDoctor from '../../modal/CreateDoctor';


function Doctors() {
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const openModal = () => {
        setIsModalOpen(true);
      };
    
    // Function to close the modal
    const closeModal = () => {
    setIsModalOpen(false);
    };
      
    return (
        <MainContainer>
            <Top>
                <SearchBox />
                <Button onClick={openModal}>
                    <BsHouseAddFill className='icon' /> Add
                </Button>
            </Top>
            <Container>
                <StyledTable>
                    <thead>
                    <tr>
                        <th>ID No</th>
                        <th>Name</th>
                        <th>Fellowships</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>MD001</td>
                            <td>Dr Albin</td>
                            <td>MBBS</td>
                            <td>PAEDIATRICS</td>
                            <td>Edit</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <CreateDoctor isOpen={isModalOpen} onClose={closeModal} />
            </Container>

        </MainContainer>
        
    )
}

export default Doctors

const MainContainer = styled.div`
`;

const Container = styled.div`
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-top: 30px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  // You can add more styles here as needed
`;

const Top = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;

`;
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;