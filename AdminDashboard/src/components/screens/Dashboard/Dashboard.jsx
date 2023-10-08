import React from 'react'
import  styled  from 'styled-components'
import Header from '../../includes/Dashboard/Header'
import Graph from '../../includes/Dashboard/Graph'
import CustomerInfo from '../../includes/Dashboard/CustomerInfo'
import SearchBox from '../../small/SearchBox'


function Dashboard() {
  return (
    <Container>
      <Header />
      <SearchBox />
      <Middle>
        <Graph />
        <CustomerInfo />
      </Middle>
      <Bottom></Bottom>
    </Container>
    
  )
}

export default Dashboard

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const Middle = styled.div`
    display: flex;
    margin-top: 31px;
`
const Bottom = styled.div`
`
