import { useState } from "react";
import { XCircle } from "lucide-react";

function Modal({ isOpen, onClose, onSave }) {
  const [novaConta, setNovaConta] = useState({
    description: "",
    amount: "",
    dueDate: "",
    status: "pendente",
    type: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setNovaConta({ ...novaConta, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!novaConta.description || !novaConta.amount || !novaConta.dueDate || !novaConta.type) {
      alert("Preencha todos os campos!");
      return;
    }
    onSave(novaConta);
    setNovaConta({ description: "", amount: "", dueDate: "", status: "pendente", type: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nova Conta</h2>
          <button onClick={onClose}>
            <XCircle className="text-gray-500 hover:text-red-500 transition" size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="description"
            value={novaConta.description}
            onChange={handleChange}
            placeholder="Descrição"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="amount"
            value={novaConta.amount}
            onChange={handleChange}
            placeholder="Valor (R$)"
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            name="dueDate"
            value={novaConta.dueDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <select
            name="type"
            value={novaConta.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecione o Tipo</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
