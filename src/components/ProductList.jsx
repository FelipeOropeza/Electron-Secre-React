import { useState } from "react";
import ModalMovimentacao from "./ModalMovimentacao";

function ProductList({ products, isLoading, error, onUpdateQuantity }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) {
    return <p className="text-gray-500">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Produtos Cadastrados</h3>
      {products && products.length > 0 ? (
        <ul className="border p-4 rounded-md bg-gray-50">
          {products.map((product) => (
            <li key={product.id} className="py-2 border-b flex justify-between items-center">
              <div>
                <strong>Nome:</strong> {product.name} - <strong>Preço:</strong> R$ {product.price} -
                <strong>Quantidade:</strong> {product.amount}
              </div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Movimentar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum produto cadastrado.</p>
      )}

      {selectedProduct && (
        <ModalMovimentacao
          product={selectedProduct}
          closeModal={() => setSelectedProduct(null)}
          onUpdateQuantity={onUpdateQuantity}
        />
      )}
    </div>
  );
}

export default ProductList;
