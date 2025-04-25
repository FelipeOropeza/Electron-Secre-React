import { useState, useEffect } from "react";

function EditModal({ isOpen, onClose, onSave, conta }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    dueDate: "",
    status: "",
    type: "",
  });

  useEffect(() => {
    if (conta) {
      setFormData({
        description: conta.description,
        amount: conta.amount,
        dueDate: conta.dueDate,
        status: conta.status,
        type: conta.type,
      });
    }
  }, [conta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: conta.id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Conta</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="amount"
            placeholder="Valor"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione o status</option>
            <option value="pendente">Pendente</option>
            <option value="recebido">Recebido</option>
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione o tipo</option>
            <option value="receita">Entrada</option>
            <option value="despesa">Saída</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
