import React, { useContext } from "react";

import { CartContext, CartContextType } from "../context/context";

import TextDrop from "../components/ui/textdrop";
import { storeData } from "../data/data";

import DotPatternBackgroundProps from "../components/ui/dorpattern";
import MerchCard from "../components/card";

const StorePage: React.FC = () => {
  const {  addToCart} = useContext(CartContext) as CartContextType;

  

  return (
    <>
      <DotPatternBackgroundProps />
      <div className="bg-neutral-900 py-20 px-16 w-screen">
        <div className="py-20 md:py-36 bg-neutral-900">
          <TextDrop text="Shaastra Merch" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storeData.map((merch: any) => (
            <MerchCard key={merch.id} merch={merch} handleAdd={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StorePage;
