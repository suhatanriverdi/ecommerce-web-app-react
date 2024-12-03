import { useParams } from "react-router-dom";
import Products from "../containers/Products";

// Navigation Bar
import NavBar from "../components/NavBar";
import CategoriesSortNavBar from "../components/CategoriesSortNavBar";
import { useAtom } from "jotai/index";
import { genderQueryAtom } from "../atoms/genderQueryAtom.tsx";
import { useEffect } from "react";
import ProductDetails from "../containers/ProductDetails";
import { productDetailsWindowAtom } from "../atoms/productDetailsWindowAtom.tsx";
import ProductDetailsNavBar from "../components/ProductDetailsNavBar.tsx";

export default function Home() {
  const { gender } = useParams();
  const [, setGenderQuery] = useAtom(genderQueryAtom);
  const [isProductDetailsWindowOpened] = useAtom(productDetailsWindowAtom);

  // TODO
  // Update the genderQuery
  // useEffect(() => {
  //   setGenderQuery(gender ?? null);
  // }, [gender, setGenderQuery]);

  return (
    <div>
      {/* Fixed Navigation Component */}
      <div className="z-50 text-lg fixed -top-[1px] bg-white px-[2rem] pb-[1rem] w-full flex flex-col items-center justify-center text-justify">
        <NavBar />
      </div>

      {/* Sticky Header for Products */}
      {!isProductDetailsWindowOpened && (
        <div>
          {/* Navigation Bar for Categories & Sorting */}
          <div className="sticky top-[59px] backdrop-blur-md bg-white bg-opacity-75 px-[2rem] mt-[120px] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify">
            <CategoriesSortNavBar />
          </div>

          {/* Main Content Container */}
          <div className="w-full flex flex-col px-[2rem] items-center justify-center bg-white bg-opacity-100 mb-[8rem]">
            <Products />
          </div>
        </div>
      )}

      {/* Sticky Header for Products */}
      {isProductDetailsWindowOpened && (
        <div>
          <div className="sticky top-[59px] backdrop-blur-md bg-white bg-opacity-75 px-[2rem] mt-[120px] pb-[1rem] z-10 w-full flex flex-col items-center justify-center text-justify">
            {/* Navigation Bar for Product Details */}
            <ProductDetailsNavBar />
          </div>
          <div className="w-full flex flex-col px-[2rem] items-center justify-center mb-[8rem]">
            <ProductDetails />
          </div>
        </div>
      )}
    </div>
  );
}
