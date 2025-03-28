import { CreditCard, DollarSign } from "lucide-react";
import NavBar from "../components/NavBar";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-20 p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <div className="flex items-center justify-between mb-6 border-b pb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="text-red-500" size={40} />
              <p className="text-lg font-semibold text-red-600">Contas a Pagar</p>
            </div>
            <span className="text-2xl font-bold text-gray-800">R$ 0,00</span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-500" size={40} />
              <p className="text-lg font-semibold text-green-600">Contas a Receber</p>
            </div>
            <span className="text-2xl font-bold text-gray-800">R$ 0,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
