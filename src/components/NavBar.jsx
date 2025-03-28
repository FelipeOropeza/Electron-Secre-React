import { Link } from "react-router-dom";
import { CreditCard, Home } from "lucide-react";


function NavBar(){
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Painel Financeiro
        </h1>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition flex items-center gap-2">
            <Home size={20} /> Início
          </Link>
          <Link to="/contas" className="text-gray-600 hover:text-blue-500 transition flex items-center gap-2">
            <CreditCard size={20} /> Contas
          </Link>
        </div>
      </nav>
    )
}
export default NavBar;