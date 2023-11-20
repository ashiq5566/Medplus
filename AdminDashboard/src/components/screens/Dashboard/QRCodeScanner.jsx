import React, { useState } from 'react';
import axios from 'axios';

const QRCodeScanner = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleScan = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/doctors/scan/');
      const scannedPhoneNumber = response.data.code;

      // Redirect to phone dial pad
      window.location.href = `tel:${scannedPhoneNumber}`;
    } catch (error) {
      console.error('Error scanning QR code:', error);
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <button onClick={handleScan}>Scan QR Code</button>
    </div>
  );
};

export default QRCodeScanner;
