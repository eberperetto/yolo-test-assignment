import React, { FunctionComponent } from "react";
import PriceCard from "./priceCard";

interface PriceListProps {
  baseSymbols: string[];
  removeCardCallback: (baseSymbol: string) => void;
}

/**
 * List component rendering PriceCards for each crypto code
 */
const PriceList: FunctionComponent<PriceListProps> = ({
  baseSymbols,
  removeCardCallback,
}) => {
  return (
    <div className="relative w-[400px] h-[300px] overflow-auto">
      {!baseSymbols.length && (
        <p className="text-gray-500 font-semibold text-[18px]">
          No cryptos here, go ahead and add some!
        </p>
      )}
      {baseSymbols?.map((baseSymbol, index) => (
        <PriceCard
          key={`${index}`}
          baseSymbol={baseSymbol}
          removeCardCallback={removeCardCallback}
        />
      ))}
    </div>
  );
};

export default PriceList;
