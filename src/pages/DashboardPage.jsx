import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import ProductList from "../components/ProductList";
import Modal from "../components/Modal";
import { io } from "socket.io-client";

const API_URL = "http://localhost:4000/produtos";
const socket = io("http://localhost:4000");

function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: fetchProducts,
  });

  const { mutate: addProduct } = useMutation({
    mutationFn: addProductRequest,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  async function fetchProducts() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Erro ao carregar os produtos."
      );
    }
  }

  async function addProductRequest(newProduct) {
    try {
      console.log("addProductRequest", newProduct.nome, newProduct.preco);
      await axios.post(API_URL, newProduct);
      socket.emit("updateProdutos", newProduct);
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Erro ao adicionar produto."
      );
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600">
            Usuário não autenticado
          </h2>
          <p className="mt-4">
            Você precisa estar logado para acessar o dashboard.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  // Atualizando os produtos ao receber dados via socket
  useEffect(() => {
    socket.on("updateProdutos", (updatedProducts) => {
      refetch(); // Recarrega os produtos ao receber um evento de atualização
    });

    return () => {
      socket.off("updateProdutos"); // Limpa o evento ao sair do componente
    };
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <p className="text-lg mb-4">
          <strong>Bem-vindo, {user.nome}</strong>
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Adicionar Produto
        </button>

        <ProductList products={products} isLoading={isLoading} error={error} />

        {isModalOpen && (
          <Modal
            closeModal={() => setIsModalOpen(false)}
            addProduct={addProduct}
          />
        )}

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
