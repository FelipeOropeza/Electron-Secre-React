import { useState, useContext, useEffect } from "react";
import { Plus } from "lucide-react";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://localhost:4000/account";

function ContasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contas, setContas] = useState([]); 
  const { user } = useContext(AuthContext);

  const toggleModal = () => setModalOpen(!modalOpen);

  const fetchContas = async () => {
    try {
      const response = await axios.get(API_URL);
      setContas(response.data);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  useEffect(() => {
    fetchContas();
  }, []);

  const handleAddConta = async (novaConta) => {
    const newObjectConta = {
      ...novaConta,
      amount: parseFloat(novaConta.amount),
      companyId: user.companyId,
      userId: user.id,
    };

    try {
      const response = await axios.post(API_URL, newObjectConta);
      if (response.status === 201) {
        fetchContas();
      }
    } catch (error) {
      console.error("Erro ao adicionar conta:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="container mx-auto p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista de Contas</h2>
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
          >
            <Plus size={20} /> Adicionar Conta
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">Descrição</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Vencimento</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tipo</th>
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
                        conta.status === "recebido" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {conta.status}
                    </td>
                    <td className="p-3">{conta.type}</td>
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
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={toggleModal} onSave={handleAddConta} />
    </div>
  );
}

export default ContasPage;
