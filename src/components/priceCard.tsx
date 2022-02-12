import React from "react";
import { gql, useQuery } from "@apollo/client";
import icon from "../assets/icon.svg";
import clear from "../assets/clear.svg";
import refresh from "../assets/refresh.svg";

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
    <div className="text-white h-auto w-auto mb-4">
      <div className="grid grid-cols-6">
        <img src={icon} className="col-span-1 w-15 h-15" alt="Trophy icon" />
        <div className="col-start-2 col-span-2">
          <p className="font-semibold text-white">{baseSymbol}</p>
          <div className="text-gray-500 pt-1">
            {loading && <p>Loading...</p>}
            {error && <p>{`Error! Something went wrong!`}</p>}
            {data && !loading && <p>{getFirstValidMarketPrice(data)}</p>}
          </div>
        </div>
        <div className="col-start-5 col-span-1 pt-4">
          <button onClick={() => refetch()}>
            <img src={refresh} className="w-5 h-5" alt="Refresh crypto price" />
          </button>
          <button onClick={() => removeCardCallback(baseSymbol)}>
            <img src={clear} className="w-5 h-5" alt="Remove crypto" />
          </button>
        </div>
        <div className="h-[1px] mt-2 col-start-1 col-span-5 bg-gradient-to-r from-gray-400"></div>
      </div>
    </div>
  );
};

export default PriceCard;
