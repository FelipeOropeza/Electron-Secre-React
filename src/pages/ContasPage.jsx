import { useState } from "react";
import { Plus } from "lucide-react";
import NavBar from "../components/NavBar";
import Modal from "../components/Modal";

function ContasPage() {
  const [contas, setContas] = useState([
    { id: 1, description: "Aluguel", amount: 1200.5, dueDate: "2025-04-10", status: "pendente", type: "despesa" },
    { id: 2, description: "Salário", amount: 3500.0, dueDate: "2025-04-05", status: "recebido", type: "receita" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleAddConta = (novaConta) => {
    const newEntry = { ...novaConta, id: contas.length + 1, amount: parseFloat(novaConta.amount) };
    setContas([...contas, newEntry]);
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
              {contas.map((conta) => (
                <tr key={conta.id} className="border-b">
                  <td className="p-3">{conta.description}</td>
                  <td className="p-3">R$ {conta.amount.toFixed(2)}</td>
                  <td className="p-3">{conta.dueDate}</td>
                  <td className={`p-3 ${conta.status === "recebido" ? "text-green-600" : "text-red-600"}`}>
                    {conta.status}
                  </td>
                  <td className="p-3">{conta.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro */}
      <Modal isOpen={modalOpen} onClose={toggleModal} onSave={handleAddConta} />
    </div>
  );
}

export default ContasPage;
