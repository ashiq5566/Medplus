import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import './assets/css/style.css'
import './assets/css/satoshi.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom'
import { API_URL } from '../src/config/index.js'


document.addEventListener('DOMContentLoaded', async () => {
	const {publishableKey} = await fetch(`${API_URL}/api/stripe/config`).then((r) => r.json());
	const stripePromise = loadStripe(publishableKey);
  
	ReactDOM.render(
	  <BrowserRouter>
		<Elements stripe={stripePromise}>
		  <App />
		</Elements>
	  </BrowserRouter>,
	  document.getElementById('root')
	);
  });

