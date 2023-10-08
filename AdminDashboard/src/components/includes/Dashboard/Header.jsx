import React from 'react'
import styled from 'styled-components'
import searchIcon from "/icons/search.svg"
import ProfileImage from '../../../assets/images/course1.jpg'
import SearchBox from '../../small/SearchBox'

function Header() {
  return (
    <Container>
		<Top>
			<Title>
				<Main>MED</Main>
				<Plus>+</Plus>
			</Title>
			<About>
				Where healing matters
			</About>
		</Top>
    </Container>
  )
}

export default Header

const Container = styled.div`
  	display: inline-flex;
	align-items: center;
	width: 100%;
    justify-content: center;
	flex-direction: column;
`;
const Title = styled.div`
	display: flex;
	margin: 0;
  	
`;
const Main = styled.h1`
	color: #08107D;
	font-family: Arial;
	font-size: 57px;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
  	
`;
const Plus = styled.h1`
    color: #F00;
    font-family: Arial;
    font-size: 57px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  	
`;
const Top = styled.div`
	display: flex;
    align-items: center;
	flex-direction: column;

`;

const About = styled.h4`
	color: #000;
	font-family: "Satoshi-Regular";
	font-size: 22px;
	font-style: normal;
	font-weight: 400;
	line-height: 1px;
`;

