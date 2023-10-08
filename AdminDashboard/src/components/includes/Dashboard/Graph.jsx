import React from 'react'
import styled from 'styled-components'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



function Graph() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Monthly Sales',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56,65, 59, 80, 81, 56, 40, 30],
          },
        ],
      };
    
  return (
    <Container>
        <Top>
            <Left>
                <h4 className='label'>Total Revenue</h4>
                <h2 className='amount'>&#x20B9; 980,273.00</h2>
            </Left>
            <Right>
            </Right>
        </Top>
        <Bottom>
            <Bar data={data} />
        </Bottom>
    </Container>
  )
}

export default Graph

const Container = styled.div`
    width: 720.935px;
    height: 444.881px;
    flex-shrink: 0;
    margin-top: 30px;
    border-radius: 20px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 25.66px 37.56px;
`;
const Top = styled.div`
`;
const Left = styled.div`

    .label{
        color: #A7A7A7;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .amount{
        color: #000;
        font-family: 'Satoshi-Bold';
        font-size: 36px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;
const Right = styled.div`
`;
const Bottom = styled.div`
`;