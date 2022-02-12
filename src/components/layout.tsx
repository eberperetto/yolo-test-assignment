import React, { useState } from "react";
import PriceCard from "./priceCard";
import logo from "../assets/logo.svg";
import BaseSymbolForm from "./baseSymbolForm";

/**
 * Main component of the app
 */
const Layout = () => {
  const [baseSymbols, setBaseSymbols] = useState(["BTC", "XRP", "BNB"]);

  const addBaseSymbol = async (baseSymbol: string): Promise<string> => {
    if (baseSymbols.find((symbol) => symbol === baseSymbol)) {
      return `${baseSymbol} is already on the list!`;
    }
    setBaseSymbols([...baseSymbols, baseSymbol]);
    return `${baseSymbol} added to the list!`;
  };

  const removeBaseSymbol = (baseSymbol: string): void => {
    setBaseSymbols(baseSymbols.filter((symbol) => symbol !== baseSymbol));
  };

  return (
    <div className="bg-[#1E003C] h-screen">
      <div className="h-[85%] background-images">
        <img src={logo} className="w-40 h-40 ml-24 -mt-5" alt="logo" />
        <div className="grid grid-cols-1 md:grid-cols-2 ml-24">
          <div className="col-span-1">
            <div className="mb-14">
              <p className="font-semibold text-[40px] text-white pr-[30%] leading-tight">
                Now you can track all your cryptos here!
              </p>
              <p className="text-gray-500 font-semibold text-[20px] pr-[60%] pt-5 leading-tight">
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
          <div className="col-span-1 pr-24 pl-24 ml-20">
            <BaseSymbolForm submitCallback={addBaseSymbol} />
          </div>
        </div>
      </div>
      <div className="bottom-0 w-full h-[15%] bg-white">
        <p className="text-center text-gray-400 text-xs p-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          pellentesque eget massa in sollicitudin. Vivamus eget eros tristique,
          bibendum diam quis, laoreet eros. Pellentesque condimentum dolor quis
          dapibus dignissim. Suspendisse non lacinia nunc, et vestibulum dolor.
        </p>
      </div>
    </div>
  );
};

export default Layout;
