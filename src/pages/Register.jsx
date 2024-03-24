import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user) => user.email === formData.email);

    if (userExists) {
      alert('User already exists. Try a different E-mail')
    } else {
      // Generate a random ID for the user
      const userId = generateRandomId();

      // Store the user data in localStorage
      const newUser = { ...formData, id: userId, balance: 0};
      const newUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(newUsers));

      // Navigate to the login page
      navigate('/');
    }
  };

  // Function to generate a random ID
  const generateRandomId = () => {
    const idLength = 8; // Length of the random ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="flex items-center h-full justify-between">
        <div className='ml-52 text-white text-5xl font-semibold'>
          <span>Secure</span><br/>
          <span className='ml-8'>Integral</span><br/>
          <span className='ml-14'>Confidential</span><br/>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg shadow-lg p-8 w-4/12 mr-16">
          <h2 className="text-2xl font-sans font-bold mb-6 text-center">Register Here!</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 bg-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 bg-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 bg-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none"
              required
            />
          </div>
          <div className='text-center'> 
          <button
            type="submit"
            className="bg-gray-600 font-bold py-2 px-10 rounded-lg hover:bg-gray-700 text-gray-100"
          >
            Register
          </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
};

export default Register;