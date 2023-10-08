import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import { useLocation, useNavigate, Link, NavLink } from 'react-router-dom'
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from 'react-icons/bs';

function SideBar() {
	const navigate = useNavigate()
	const [activeNavItem, setActiveNavItem] = useState(null);

	const handleItemClick = (navItem) => {
		setActiveNavItem(navItem);
	};

  return (
	
    <SidebarContainer>
		<SidebarTitle>
			<SidebarBrand>
				Welcome Admin
			</SidebarBrand>
		</SidebarTitle>
		<SidebarList>
			<SidebarListItem >
				<SidebarLink
					to="/dashboard"
					className={({ isActive }) => isActive ? "active" : ""} >
					<BsFillArchiveFill className='icon' /> Dashboard
				</SidebarLink>
			</SidebarListItem>
			<SidebarListItem>
				<SidebarLink
					to="/doctor"
					className={({ isActive }) => isActive ? "active" : ""} >
					<BsFillArchiveFill className='icon' /> Doctors
				</SidebarLink>
			</SidebarListItem>
			<SidebarListItem>
				<SidebarLink
					to="/banner-manage"
					className={({ isActive }) => isActive ? "active" : ""} >
					<BsFillGrid3X3GapFill className='icon' /> Banner Manage
				</SidebarLink>
			</SidebarListItem>
		</SidebarList>
  	</SidebarContainer>
  )
}

export default SideBar



const SidebarContainer = styled.aside`
  grid-area: sidebar;
  height: 100vh;
  background: #08107D;	
  overflow-y: auto;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  width: 282px;
`;

const SidebarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 0px 30px;
  margin-bottom: 30px;
`;

const SidebarBrand = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;

  .icon_header {
    margin-right: 10px;
  }
`;


const SidebarList = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const SidebarListItem = styled.li`
  padding: 20px 20px 20px 20px;
  font-size: 18px;
  color: white;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SidebarLink = styled(NavLink)`
	text-decoration: none;
	color: #fff;
	font-size: 24px;
	font-style: normal;
	font-weight: 200;
	line-height: normal;

	&.active {
		font-weight: bold;
		color: red;
	}
`;
