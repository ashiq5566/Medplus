import React, { useMemo, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import SearchBox from '../../small/SearchBox';
import {
    BsHouseAddFill
  } from 'react-icons/bs';
import CreateDoctor from '../../modal/CreateDoctor';
import { ruppellsAuthConfig } from '../../../config/axios';


function Doctors() {
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [searchInput, setSearchInput] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    
    const filterDoctors = () => {
        const filtered = tableData.data.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredDoctors(filtered);
      };

    const openModal = () => {
        setIsModalOpen(true);
      };
    
    // Function to close the modal
    const closeModal = () => {
    setIsModalOpen(false);
    };

    const [tableData, setTableData] = useState({
        starting_count: 0,
        // skelton: [],
        data: [],
    });

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        filterDoctors();
      };

    useEffect(() => {

        ruppellsAuthConfig
            .get("/doctors/")
            .then((res) => {
                const { StatusCode, data } = res.data;
                console.log(data);
                if (StatusCode === 6000) {

                    const apiData = data.data.map((item, i) => ({
                        ...item
                       
                    }));
                    setTableData({
                        // skelton,
                        starting_count: 0,
                        data: apiData,
                    });
                } else {
                    //error page
                    setEmpty(true);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log("Error in fetching updates", err);
            });
    }, []);

      
    return (
        <MainContainer>
            <Top>
                <SearchBox onSearch={handleSearchInput} />
                <Button onClick={openModal}>
                    <BsHouseAddFill className='icon' /> Add
                </Button>
            </Top>
            <Container>
                <StyledTable>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Qualification</th>
                        <th>Department</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.qualification}</td>
                            <td>{item.department}</td>
                            <td>{item.phone}</td>
                        </tr>
                    ))}
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