import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));  // Obtendo os dados do usuário do sessionStorage

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600">Usuário não autenticado</h2>
          <p className="mt-4">Você precisa estar logado para acessar o dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
          <div className="text-lg mb-4">
            <strong>Bem-vindo, {user.nome}</strong>
          </div>
          <div className="space-y-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>RA:</strong> {user.ra}</p>
            <p><strong>Senha:</strong> {user.senha}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
