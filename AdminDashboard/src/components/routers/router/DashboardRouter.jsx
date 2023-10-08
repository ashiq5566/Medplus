import { useState } from 'react'
import React, { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'
import Dashboard from '../../screens/Dashboard/Dashboard'
import SideBar from '../../includes/SideBar'
import SignIn from '../../screens/auth/SignIn'
import Doctors from '../../screens/Dashboard/Doctors'
import BannerManage from '../../screens/Dashboard/BannerManage'


const DashboardRouter = () => {

	const screenRef = useRef()
	const { pathname } = useLocation()
	const [isActive, setActive] = useState(false)


	return (
		<Wrapper>
			<Container>
				<SideBar />
				<Screen>
					<Routes>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="doctor" element={<Doctors />} />
						<Route path="banner-manage" element={<BannerManage />} />
						<Route path="banner-manage" element={<BannerManage />} />
					</Routes>
				</Screen>
			</Container>
		</Wrapper>
	)
}

export default DashboardRouter

const Wrapper = styled.section`
	
`
const Container = styled.div`
	display: flex;
`
const Screen = styled.div`
	padding: 20px;
	width: calc(100vw - 250px);
	height: calc(100vh - 98px);
	overflow-y: scroll;
	overflow-x: hidden;
`