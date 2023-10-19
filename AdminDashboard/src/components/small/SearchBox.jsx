import React from 'react'
import styled from 'styled-components'
import searchIcon from "/icons/search.svg"

function SearchBox({ onSearch }) {
  return (
    <Bottom>
        <SearchContainer>
            <div className="left">
                <label htmlFor="search">
                    <img src={searchIcon} alt="search icon" />
                </label>
                <input type="search" id="search" placeholder='Search...' onChange={onSearch} />
            </div>
        </SearchContainer>
    </Bottom>
  )
}

export default SearchBox

const Bottom = styled.div`
	display: flex;
	margin-top: 39px;
`;
const SearchContainer = styled.div`
    border: 1px solid #EEE;
    display: flex;
    align-items: center;
    border-radius: 2px;
	width: 562px;
	border-radius: 10px;
	background: #FFF;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    .left{
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;

        img{
            width: 16px;
        }
        input{
            width: 100%;
            color: #d3d3d3;
            font-size: 16px;

            &::placeholder{
                color: inherit;
            }
        }
    }
    .right{
        cursor: pointer;
        padding: 8px 12px;
        border-left: 1px solid #eee;

        img{
            width: 16px;
        }
    }
;`