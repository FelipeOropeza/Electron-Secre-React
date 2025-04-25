import { useState, useContext, useEffect } from "react";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { io } from "socket.io-client";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import EditModal from "../components/EditModal";
import { AuthContext } from "../context/AuthContext";

const API_URL = "http://localhost:4000/account";
const socket = io("http://localhost:4000");

function ContasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState(null);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: contas = [], isLoading } = useQuery({
    queryKey: ["contas"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  const addContaMutation = useMutation({
    mutationFn: async (novaConta) => {
      const newObjectConta = {
        ...novaConta,
        amount: parseFloat(novaConta.amount),
        companyId: user.companyId,
        userId: user.id,
      };
      return axios.post(API_URL, newObjectConta);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contas"]);
      setModalOpen(false);
    },
  });

  const updateContaMutation = useMutation({
    mutationFn: async (contaAtualizada) => {
      return axios.put(`${API_URL}/${contaAtualizada.id}`, contaAtualizada);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contas"]);
      setEditModalOpen(false);
    },
  });

  useEffect(() => {
    socket.on("accountCreated", () => {
      queryClient.invalidateQueries(["contas"]);
    });
    return () => {
      socket.off("accountCreated");
    };
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="container mx-auto p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista de Contas</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Plus size={20} /> Adicionar Conta
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {isLoading ? (
            <p className="text-center text-gray-500">Carregando...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3">Descrição</th>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Vencimento</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contas.length > 0 ? (
                  contas.map((conta) => (
                    <tr key={conta.id} className="border-b">
                      <td className="p-3">{conta.description}</td>
                      <td className="p-3">R$ {conta.amount.toFixed(2)}</td>
                      <td className="p-3">{conta.dueDate}</td>
                      <td
                        className={`p-3 ${
                          conta.status === "recebido"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {conta.status}
                      </td>
                      <td className="p-3">{conta.type}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setContaSelecionada(conta);
                            setEditModalOpen(true);
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      Nenhuma conta cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addContaMutation.mutate}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={updateContaMutation.mutate}
        conta={contaSelecionada}
      />
    </div>
  );
}

export default ContasPage;
