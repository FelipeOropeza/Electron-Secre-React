import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { CreditCard, DollarSign } from "lucide-react";
import NavBar from "../components/NavBar";

const fetchAccounts = async () => {
  const res = await fetch("http://localhost:4000/account/sum");
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
};

function DashboardPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("accountCreated", () => {
      queryClient.invalidateQueries(["accounts"]);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados</p>;

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
            <span className="text-2xl font-bold text-gray-800">
              R$ {data?.despesasPendentes?.reduce((sum, acc) => sum + acc.amount, 0) || 0},00
            </span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <DollarSign className="text-green-500" size={40} />
              <p className="text-lg font-semibold text-green-600">Contas a Receber</p>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              R$ {data?.totalRecebido || 0},00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
