'use client';
import React, { useState } from 'react';

interface BankDetailsState {
  accountName: string;
  accountNumber: string;
  bank: string;
}

const BankDetails: React.FC = () => {
  const [formData, setFormData] = useState<BankDetailsState>({
    accountName: '',
    accountNumber: '',
    bank: '',
  });

  const [savedData, setSavedData] = useState<BankDetailsState | null>(null);
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const banks = [
    'Select a Bank',
    'Bank of America',
    'Chase Bank',
    'Wells Fargo',
    'Citibank',
    'U.S. Bank',
    'PNC Bank',
    'Capital One',
    'TD Bank',
    'Truist Bank',
  ];

  // // Fetch saved details when component mounts
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch('/api/user-bank-details'); // Adjust API endpoint
  //       const data = await response.json();
  //       setSavedData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSavedData(formData);
    setMessage('Bank details saved successfully!');
  };

  // // Handle saving user data
  // const handleSave = async () => {
  //   setLoading(true);
  //   setMessage('');
  //   try {
  //     const response = await fetch('/api/user-bank-details', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const savedDetails = await response.json();
  //       setSavedData(savedDetails);
  //       setMessage('Bank details saved successfully!');
  //     } else {
  //       setMessage('Failed to save details. Try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //     setMessage('An error occurred while saving.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <div>
        <h3 className="relative text-black text-sm font-bold text-left ml-7 mt-8 lg:ml-7 lg:mt-8">
          Account Details
        </h3>
        {/* Display saved details */}
        {savedData && (
          <div className="bg-gray-100 p-4 lg:w-96 rounded border ml-7 lg:ml-7 mt-4">
            <h4 className="text-sm font-bold">Saved Account Details:</h4>
            <p className="text-xs">Name: {savedData.accountName}</p>
            <p className="text-xs">Number: {savedData.accountNumber}</p>
            <p className="text-xs">Bank: {savedData.bank}</p>
          </div>
        )}
        {/* Display saved details
        {loading ? (
          <p className="text-sm text-gray-500 lg:ml-7 mt-3">Loading saved details...</p>
        ) : savedData ? (
          <div className="bg-gray-100 p-4 lg:w-96 rounded border lg:ml-7 mt-4">
            <h4 className="text-sm font-bold">Saved Account Details:</h4>
            <p className="text-xs">Name: {savedData.accountName}</p>
            <p className="text-xs">Number: {savedData.accountNumber}</p>
            <p className="text-xs">Bank: {savedData.bank}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500 lg:ml-7 mt-3">No saved details available.</p>
        )} */}
        <div>
          <form className="relative bg-white p-4 w-80 lg:w-96 h-full border rounded ml-7 mt-4 lg:ml-7 lg:mt-4">
            <div className="flex flex-col gap-2">
              <label className="relative text-sm text-left">Account Name</label>
              <input
                className="relative text-xs text-black h-8 w-full p-2 bg-gray-200 rounded"
                placeholder="John Doe"
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="relative text-sm text-left">Account Number</label>
              <input
                className="relative text-xs text-black h-8 w-full p-2 bg-gray-200 rounded"
                placeholder="1234567890"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="relative text-sm text-left">Bank</label>
              <select
                className="relative text-xs text-black h-8 w-full p-2 bg-gray-200 rounded"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
              >
                {banks.map((bank, index) => (
                  <option key={index} value={bank === 'Select a Bank' ? '' : bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button
            className="relative bg-blue-950 text-white text-xs w-80 lg:w-96 ml-7 mt-7 lg:ml-7 h-8 lg:mt-7 rounded hover:bg-blue-900"
            onClick={handleSave}
          >
            Save Changes
          </button>
          {/* <button
            className="relative bg-blue-950 text-white text-xs w-96 lg:ml-7 h-8 lg:mt-7 rounded hover:bg-blue-900"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button> */}
          {/* Display success message */}
          {message && (
            <p className="text-xs text-center mt-2 text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;