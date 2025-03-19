function ProductList({ products, isLoading, error }) {
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
              <li key={product.id} className="py-2 border-b">
                <strong>{product.nome}</strong> - R$ {product.preco}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum produto cadastrado.</p>
        )}
      </div>
    );
  }
  
  export default ProductList;
  