import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Change 'email' to 'identifier'
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Find the user with matching email/username and password
    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      // Store the user data in localStorage for the dashboard
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="flex items-center h-full justify-between">
        <div className='ml-52 text-white text-5xl font-semibold'>
          <span>Secure</span><br />
          <span className='ml-8'>Integral</span><br />
          <span className='ml-14'>Confidential</span><br />
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg shadow-lg p-8 w-4/12 mr-16">
          <h2 className="text-2xl font-sans font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="text"
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
          <div className='text-left'>
            <p className="text-gray-700 mb-4">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register!</a></p>
            <div className='text-center'>
              <button
                type="submit"
                className="bg-gray-600 font-bold py-2 px-14 rounded-lg hover:bg-gray-700 text-gray-100"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;


