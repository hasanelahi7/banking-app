import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [moneyToAdd, setMoneyToAdd] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('');
  const [moneyToSend, setMoneyToSend] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
    setBalance(currentUser.balance || 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const usersList = JSON.parse(localStorage.getItem('users') || '[]');

  const handleAddMoney = () => {
    const amount = parseFloat(moneyToAdd);
    if (amount >= 1) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      // Update the user's balance in localStorage
      const updatedUser = { ...user, balance: newBalance };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      const updatedCurrentUserData = usersList.map(user => {
        if (user.email === updatedUser.email) {
            return { ...user, ...updatedUser }; // Merge updated data with existing user data
        }
        return user;
    });
  
    localStorage.setItem('users', JSON.stringify(updatedCurrentUserData));
      setErrorMessage('');
      setMoneyToAdd('');
    } else {
      setErrorMessage('Please enter an amount of 1 or greater.');
    }
  };

  const handleSendMoney = () => {
    const amount = parseFloat(moneyToSend);
    if (amount > 0 && amount <= balance) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      // Update the user's balance in localStorage
      const updatedUser = { ...user, balance: newBalance };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      let updatedBeneficiaryData = usersList.find(user=>user.email == selectedBeneficiary)
      updatedBeneficiaryData.balance = parseFloat(updatedBeneficiaryData.balance) + parseFloat(moneyToSend);
      const updatedUsers = usersList.map(user => {
        if (user.email === updatedBeneficiaryData.email) {
            return { ...user, ...updatedBeneficiaryData }; // Merge updated data with existing user data
        }
        return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const usersList1 = JSON.parse(localStorage.getItem('users') || '[]');

    const updatedCurrentUserData = usersList1.map(user => {
      if (user.email === updatedUser.email) {
          return { ...user, ...updatedUser }; // Merge updated data with existing user data
      }
      return user;
  });
    
    // Step 3: Save the updated array back to local storage
    localStorage.setItem('users', JSON.stringify(updatedCurrentUserData));

    setSelectedBeneficiary('');
    setMoneyToSend('');
      
      setErrorMessage(`Sent $${amount} to ${selectedBeneficiary}`);
    } else if (amount > balance) {
      setErrorMessage('Insufficient balance');
    } else if (amount <= 0) {
      setErrorMessage('Please enter a positive amount.');
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      <div className="flex items-center h-full justify-between">
      <div className='ml-52 text-white text-6xl font-semibold'>
          Dashboard
        </div>
        {user ? (
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-4/12 mr-16">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{user.email}</h2>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <FiLogOut size={24} />
              </button>
            </div>
            <p className="mb-4 text-xl">Current Balance: ${balance.toFixed(2)}</p>
            {errorMessage && (
              <p className="text-yellow-600 mb-4">{errorMessage}</p>
            )}
            <div className="mb-4">
              <label htmlFor="add-money" className="block font-bold mb-2">
                Add Money:
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="add-money"
                  className="border-2 bg-gray-300 rounded-lg py-2 px-4 flex-grow focus:outline-none"
                  value={moneyToAdd}
                  onChange={(e) => setMoneyToAdd(e.target.value)}
                  placeholder="Enter amount to add"
                />
                <button
                  className="bg-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-700 text-gray-100 ml-2"
                  onClick={handleAddMoney}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="select-beneficiary"
                className="block font-bold mb-2"
              >
                Select Beneficiary:
              </label>
              <select
                id="select-beneficiary"
                className="border-2 bg-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none"
                value={selectedBeneficiary}
                onChange={(e) => setSelectedBeneficiary(e.target.value)}
              >
                <option value="">Select Beneficiary</option>
                {usersList.map((user, index) => (
                  <option key={index} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
              {selectedBeneficiary && (
                <div className="mt-2">
                  <label htmlFor="send-money" className="block font-bold mb-2">
                    Amount to Send:
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="send-money"
                      className="border-2 bg-gray-300 rounded-lg py-2 px-4 flex-grow focus:outline-none"
                      value={moneyToSend}
                      onChange={(e) => setMoneyToSend(e.target.value)}
                      placeholder="Enter amount to send"
                    />
                    <button
                      className="bg-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-700 text-gray-100 ml-2"
                      onClick={handleSendMoney}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-white text-2xl">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;