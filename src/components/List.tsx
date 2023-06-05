import { SetStateAction, Dispatch, useEffect, useState } from "react";
import { Product } from "../types/Product";
import Card from "./Card";
import AddToBasketButton from "./AddToBasket";
import { Link } from "react-router-dom";

interface ListProps {
  products: Product[];
  //visibleProducts: Product[],
  handlePageChange: (i: number) => void;
  productsPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sorting: string;
  selectedBrand: string[];
  selectedModel: string[];
}

const List: React.FC<ListProps> = ({
  products,
  handlePageChange,
  productsPerPage,
  currentPage,
  setCurrentPage,
  sorting,
  selectedBrand,
  selectedModel
}) => {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageButtons = [];
  for (let i: number = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className="shadow-sm text-primary rounded border p-1 mr-1 hover:bg-gray-300"
      >
        {i}
      </button>
    );
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const filterAndPaginateProducts = (): Product[] => {
    let filteredProducts = [...products];

    if (sorting === "oldToNew") {
      filteredProducts = filteredProducts.sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
    } else if (sorting === "newToOld") {
      filteredProducts = filteredProducts.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
    }

    if (selectedBrand.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrand.includes(product.brand));
    }

    if (selectedModel.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedModel.includes(product.model));
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return paginatedProducts;
  };

  const visibleProducts = filterAndPaginateProducts();
  return (
    <div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3">
        {visibleProducts.map((product: Product) => (
          <Card key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <div className="text-primary">${product.price}</div>
              <div className="text-sm font-medium">{product.name}</div>
              <div>{product.model}</div>
              <div>{product.brand}</div>
            </Link>
              <AddToBasketButton product={product} />
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <button onClick={handlePrevPage}>&lt;</button>
        {pageButtons}
        <button onClick={handleNextPage}>&gt;</button>
      </div>
    </div>
  );
};

export default List;
