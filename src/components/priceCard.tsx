import React from "react";
import { gql, useQuery } from "@apollo/client";
import icon from "../assets/icon.svg";

interface PriceCardProps {
  baseSymbol: string;
  removeCardCallback: (baseSymbol: string) => void;
}

interface PriceQueryResults {
  markets: { ticker: { lastPrice: string } }[];
}

/**
 * Renders a card that queries and displays the price of a crypto
 */
const PRICE_QUERY = gql`
  query price($baseSymbol: String!) {
    markets(
      filter: { baseSymbol: { _eq: $baseSymbol }, quoteSymbol: { _eq: "EUR" } }
    ) {
      ticker {
        lastPrice
      }
    }
  }
`;

const PriceCard = ({ baseSymbol, removeCardCallback }: PriceCardProps) => {
  const { data, error, loading, refetch } = useQuery(PRICE_QUERY, {
    variables: { baseSymbol },
    notifyOnNetworkStatusChange: true,
  });

  const formatMarketPrice = (marketPrice: string): string => {
    return `${parseFloat(marketPrice).toFixed(2)} €`;
  };

  const getFirstValidMarketPrice = (results: PriceQueryResults): string => {
    const firstValidResult = results.markets.find(
      (result) => result.ticker !== null
    );
    return firstValidResult
      ? formatMarketPrice(firstValidResult.ticker.lastPrice)
      : "Price or crypto not found!";
  };

  return (
    <div className="text-white h-auto w-auto">
      <div className="grid grid-cols-6">
        <img src={icon} className="col-span-1 w-15 h-15" alt="icon" />
        <div className="col-start-2 col-span-2">
          <p className="font-semibold text-white">{baseSymbol}</p>
          <div className="text-gray-500">
            {loading && <p>Loading...</p>}
            {error && <p>{`Error! Something went wrong!`}</p>}
            {data && !loading && <p>{getFirstValidMarketPrice(data)}</p>}
          </div>
        </div>
        <div className="col-start-5 col-span-1 fill-gray-500">
          <button onClick={() => removeCardCallback(baseSymbol)}>{"X"}</button>
          <button onClick={() => refetch()}>{"U"}</button>
        </div>
      </div>
      <div className="bg-grey-500 h-3 w-max"></div>
    </div>
  );
};

export default PriceCard;
