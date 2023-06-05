import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Filter from "./components/Filter";
import Orders from "./components/Orders";
import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import ProductDetail from "./components/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<string>("oldToNew");
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchListProducts = () => {
      fetch("https://5fc9346b2af77700165ae514.mockapi.io/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    };
    fetchListProducts();
  }, []);

  // useEffect(() => {
  //   const indexOfLastProduct = currentPage * productsPerPage;
  //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //   const dataProducts = [...products];
  //   const currentProducts = dataProducts.slice(
  //     indexOfFirstProduct,
  //     indexOfLastProduct
  //   );
  //   setVisibleProducts(currentProducts);
  // }, [products, currentPage, productsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-secondary">
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex justify-between my-6 bg-secondary">
                <Filter
                  setSorting={setSorting}
                  setSelectedBrand={setSelectedBrand}
                  setSelectedModel={setSelectedModel}
                  selectedBrand={selectedBrand}
                  selectedModel={selectedModel}
                  products={products}
                />
                <List
                  currentPage={currentPage}
                  products={products}
                  handlePageChange={handlePageChange}
                  productsPerPage={productsPerPage}
                  setCurrentPage={setCurrentPage}
                  sorting={sorting}
                  selectedBrand={selectedBrand}
                  selectedModel={selectedModel}
                />
                <Orders />
              </div>
            }
          />
          <Route
            path="/detail/:id"
            element={<ProductDetail products={products} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
