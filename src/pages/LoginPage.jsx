import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/login', { ra, password });

      console.log('Login bem-sucedido', response.data);

      login(response.data.user, response.data.token);

      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ra" className="block text-sm font-medium text-gray-700">
              RA
            </label>
            <input
              type="text"
              id="ra"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
