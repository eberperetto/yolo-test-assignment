import React, { FC } from "react";
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
    <div className="flex-col text-white h-50 w-100">
      <img src={icon} className="w-10 h-10" alt="icon" />
      <div>
        <p className="font-semibold text-white">{baseSymbol}</p>
        <div className="text-gray-300">
          {loading && <p>Loading...</p>}
          {error && <p>{`Error! ${error}`}</p>}
          {data && !loading && <p>{getFirstValidMarketPrice(data)}</p>}
        </div>
      </div>
      <div>
        <button onClick={() => removeCardCallback(baseSymbol)}>{"X"}</button>
        <button onClick={() => refetch()}>{"U"}</button>
      </div>
      <div className="bg-grey-500 h-3 w-max"></div>
    </div>
  );
};

export default PriceCard;
