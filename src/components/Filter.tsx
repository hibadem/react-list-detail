import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Product } from "../types/Product";

interface FilterProps {
  setSorting: Dispatch<SetStateAction<string>>;
  setSelectedBrand: Dispatch<SetStateAction<string[]>>;
  setSelectedModel: Dispatch<SetStateAction<string[]>>;
  selectedBrand: string[];
  selectedModel: string[];
  products: Product[];
}
const Filter: React.FC<FilterProps> = ({
  setSorting,
  selectedBrand,
  selectedModel,
  setSelectedBrand,
  setSelectedModel,
  products,
}) => {
  const setFilters = (products: Product[]) => {
    const brandSet = new Set<string>();
    const modelSet = new Set<string>();

    for (const product of products) {
      brandSet.add(product.brand);
      modelSet.add(product.model);
    }

    return {
      brands: Array.from(brandSet),
      models: Array.from(modelSet),
    };
  };
  const { brands, models } = setFilters(products);

  const [filteredBrands, setFilteredBrands] = useState<string[]>(brands);
  const [filteredModels, setFilteredModels] = useState<string[]>(models);

  useEffect(() => {
    const { brands, models } = setFilters(products);
    setFilteredBrands(brands);
    setFilteredModels(models);
  }, [products]);

  const handleSortChange = (value: string) => {
    if (value === "oldToNew") {
      setSorting("oldToNew");
    }
    if (value === "newToOld") {
      setSorting("newToOld");
    }
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand([...selectedBrand, value]);
  };

  const handleModelChange = (value: string) => {
    setSelectedModel([...selectedModel, value]);
  };

  const handleSearchBrand = (value: string, brands: string[]) => {
    const selectedBrands = brands.filter((brand) =>
      brand.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedBrand(selectedBrands);
    setFilteredBrands(selectedBrands);
  };

  const handleSearchModel = (value: string, models: string[]) => {
    const selectedModels = models.filter((model) =>
      model.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedModel(selectedModels);
    setFilteredModels(selectedModels);
  };

  return (
    <div className="hidden md:block filter__items mt-6">
      <div className="filter__item p-4">
        <Sidebar title="Sort By">
          <fieldset className="px-5 py-4 bg-white">
            <div className="flex">
              <input
                type="radio"
                id="oldToNew"
                name="sortby"
                value="oldToNew"
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <label className="ml-2 text-sm" htmlFor="oldToNew">
                oldToNew
              </label>
            </div>

            <div className="flex">
              <input
                type="radio"
                id="newToOld"
                name="sortby"
                value="newToOld"
                onChange={(e) => handleSortChange(e.target.value)}
              />
              <label className="ml-2 text-sm" htmlFor="newToOld">
                newToOld
              </label>
            </div>
          </fieldset>
        </Sidebar>
        <Sidebar title="Brands" className="mt-4">
          <input
            type="search"
            name=""
            id=""
            className="border w-full"
            placeholder="Search"
            onChange={(e) => handleSearchBrand(e.target.value, brands)}
          />
          <fieldset className="px-5 py-4">
            {filteredBrands.map((brand) => (
              <div className="flex">
                <input
                  type="checkbox"
                  id={brand}
                  name={brand}
                  onChange={() => handleBrandChange(brand)}
                />
                <label htmlFor={brand} className="ml-2 text-sm">
                  {brand}
                </label>
              </div>
            ))}
            -{" "}
          </fieldset>
        </Sidebar>
        <Sidebar title="Model" className="mt-4">
          <input
            type="search"
            name=""
            id=""
            className="w-full border"
            placeholder="Search"
            onChange={(e) => handleSearchModel(e.target.value, models)}
          />
          <fieldset className="bg-white px-5 py-4">
            {filteredModels.map((model) => (
              <div>
                <input
                  type="checkbox"
                  id={model}
                  name={model}
                  onChange={() => handleModelChange(model)}
                />
                <label htmlFor={model} className="ml-2 text-sm">
                  {model}
                </label>
              </div>
            ))}
          </fieldset>
        </Sidebar>
      </div>
    </div>
  );
};

export default Filter;
