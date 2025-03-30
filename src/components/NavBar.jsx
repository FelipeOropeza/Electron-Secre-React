import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Home, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-10">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        Painel Financeiro
      </h1>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-500 transition flex items-center gap-2">
          <Home size={20} /> Início
        </Link>
        <Link to="/contas" className="text-gray-600 hover:text-blue-500 transition flex items-center gap-2">
          <CreditCard size={20} /> Contas
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 transition flex items-center gap-2 border border-red-600 px-3 py-1 rounded-lg hover:bg-red-100"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
