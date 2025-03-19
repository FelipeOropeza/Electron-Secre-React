import { useState } from 'react';

function Modal({ closeModal, addProduct }) {
  const [newProduct, setNewProduct] = useState({ nome: "", preco: "" });

  const handleAddProduct = () => {
    if (!newProduct.nome || !newProduct.preco) return;
    addProduct(newProduct);
    setNewProduct({ nome: "", preco: "" });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Cadastrar Produto</h3>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={newProduct.nome}
          onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Preço"
          value={newProduct.preco}
          onChange={(e) => setNewProduct({ ...newProduct, preco: e.target.value })}
          className="border p-2 w-full mb-4 rounded-md"
        />
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
