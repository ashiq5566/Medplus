import React, { useEffect } from 'react';
import { styled } from 'styled-components'
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string';
import { API_URL } from '../../../config/index';

function BannerManage() {
  const location = useLocation();

	useEffect(() => {
		const values = QueryString.parse(location.search);

		if (values.success) {
			console.log(
				'Order placed! You will receive an email confirmation.'
			);
		}

		if (values.canceled) {
			console.log(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);
  return (
    <Section>
		<div className='product'>
			<img
				src='https://i.imgur.com/EHyR2nP.png'
				alt='The cover of Stubborn Attachments'
			/>
			<div className='description'>
				<h3>Stubborn Attachments</h3>
				<h5>$20.00</h5>
			</div>
		</div>
		<form
			action={`${API_URL}/api/stripe/create-checkout-session`}
			method='POST'
		>
			<button className='button' type='submit'>
				Checkout
			</button>
		</form>
	</Section>
  )
}

export default BannerManage

const Section = styled.div`
	.product {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 480px;
		height: 150px;
		background-color: rgba(0, 0, 0, 0.1);
		margin-top: 50px;
		margin-left: 50px;
		margin-bottom: 10px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
	}

	.product img {
		width: 200px;
		height: 150px;
	}

	.description h3 {
		font-size: 24px;
		padding-right: 20px;
	}

	.description h5 {
		font-size: 18px;
		font-size: 200;
	}

	.button {
		font-size: 18px;
		padding: 10px;
		background-color: #556cd6;
		color: white;
		border: none;
		margin-left: 50px;
		width: 480px;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
	}

	.button:hover {
		cursor: pointer;
		opacity: 0.9;
	}

`