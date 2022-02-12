import React, { useState } from "react";
import PriceCard from "./priceCard";
import logo from "../assets/logo.svg";
import BaseSymbolForm from "./baseSymbolForm";

/**
 * Main component of the app
 */
const Layout = () => {
  const [baseSymbols, setBaseSymbols] = useState(["BTC", "XRP", "BNB"]);

  const addBaseSymbol = (baseSymbol: string): void => {
    setBaseSymbols([...baseSymbols, baseSymbol]);
  };

  const removeBaseSymbol = (baseSymbol: string): void => {
    setBaseSymbols(baseSymbols.filter((symbol) => symbol !== baseSymbol));
  };

  return (
    <div className="bg-[#1E003C] h-screen">
      <div className="h-auto ml-10 background-images">
        <img src={logo} className="w-40 h-40" alt="logo" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1">
            <div>
              <p className="font-extrabold text-2xl text-white">
                Now you can track all your cryptos here!
              </p>
              <p className="text-gray-500 font-semibold text-lg">
                Just enter the cryptocurrency code on the form to the right.
              </p>
            </div>
            <div className="w-[400px] h-[400px]">
              {baseSymbols?.map((baseSymbol, index) => (
                <PriceCard
                  key={`${index}`}
                  baseSymbol={baseSymbol}
                  removeCardCallback={removeBaseSymbol}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <BaseSymbolForm submitCallback={addBaseSymbol} />
          </div>
        </div>
      </div>
      <div className="bottom-0 w-full h-20 bg-white">
        <p className="text-center text-gray-400 text-xs">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          pellentesque eget massa in sollicitudin. Vivamus eget eros tristique,
          bibendum diam quis, laoreet eros. Pellentesque condimentum dolor quis
          dapibus dignissim. Suspendisse non lacinia nunc, et vestibulum dolor.
          Curabitur tempor fringilla sapien, ornare facilisis lectus interdum a.
          Morbi ac tellus vitae lacus imperdiet ultrices in non odio.
        </p>
      </div>
    </div>
  );
};

export default Layout;