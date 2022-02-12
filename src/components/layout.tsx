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
      <div className="h-max lg:background-images">
        <img
          src={logo}
          className="w-40 h-40 ml-12 md:ml-24 -mt-5"
          alt="Bitcasino icon"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 ml-12 md:ml-24">
          <div className="col-span-1">
            <div className="mb-12 md:mb-14">
              <h1 className="font-semibold text-[30px] md:text-[40px] text-white pr-[15%] md:pr-[30%] leading-tight">
                Now you can track all your cryptos here!
              </h1>
              <p className="text-gray-500 font-semibold text-[18px] md:text-[20px] pr-[50%] md:pr-[60%] pt-5 leading-tight">
                Just enter the cryptocurrency code on the form to the right.
              </p>
            </div>
            <div className="relative w-[400px] h-[300px] overflow-auto">
              {baseSymbols?.map((baseSymbol, index) => (
                <PriceCard
                  key={`${index}`}
                  baseSymbol={baseSymbol}
                  removeCardCallback={removeBaseSymbol}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 pr-3 md:pr-24 pl-3 md:pl-24 -ml-12 md:ml-20">
            <BaseSymbolForm submitCallback={addBaseSymbol} />
          </div>
        </div>
        <div className="w-full h-[15%] bg-white m-auto">
          <p className="text-center text-gray-400 text-xs p-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            pellentesque eget massa in sollicitudin. Vivamus eget eros
            tristique, bibendum diam quis, laoreet eros. Pellentesque
            condimentum dolor quis dapibus dignissim. Suspendisse non lacinia
            nunc, et vestibulum dolor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
