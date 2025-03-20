import { useState } from "react";

function ModalMovimentacao({ product, closeModal, onUpdateQuantity }) {
  const [quantidade, setQuantidade] = useState(0);
  const [tipo, setTipo] = useState("entrada");

  const handleConfirm = () => {
    if (quantidade <= 0) {
      alert("A quantidade deve ser maior que zero.");
      return;
    }

    onUpdateQuantity(product.id, quantidade, tipo);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Movimentação de Produto</h2>
        <p><strong>Produto:</strong> {product.nome}</p>

        <label className="block mt-4">Quantidade:</label>
        <input
          type="number"
          className="border p-2 w-full rounded-md"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />

        <label className="block mt-4">Tipo de movimentação:</label>
        <select
          className="border p-2 w-full rounded-md"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <div className="flex justify-between mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMovimentacao;
