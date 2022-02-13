import React, { FunctionComponent } from "react";
import { gql, useQuery } from "@apollo/client";
import icon from "../assets/icon.svg";
import clear from "../assets/clear.svg";
import refresh from "../assets/refresh.svg";
import { formatPrice } from "../utils/helpers";

interface PriceCardProps {
  baseSymbol: string;
  removeCardCallback: (baseSymbol: string) => void;
}

interface PriceQueryResults {
  markets: { ticker: { lastPrice: string } }[];
}

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

/**
 * Renders a card that queries and displays the price of a crypto
 */

const PriceCard: FunctionComponent<PriceCardProps> = ({
  baseSymbol,
  removeCardCallback,
}) => {
  // Uses apollo client query hook to handle all data fetching
  const { data, error, loading, refetch } = useQuery(PRICE_QUERY, {
    variables: { baseSymbol },
    notifyOnNetworkStatusChange: true,
  });

  // Get the first market ticker that is not null and return its lastPrice
  const getFirstValidMarketPrice = (results: PriceQueryResults): string => {
    const firstValidResult = results.markets.find(
      (result) => result.ticker !== null
    );
    return firstValidResult
      ? formatPrice(firstValidResult.ticker.lastPrice)
      : "Price or crypto not found!";
  };

  return (
    <div className="text-white h-auto w-auto mt-4 mb-4">
      <div className="grid grid-cols-6">
        <img
          src={icon}
          height={50}
          width={50}
          className="col-span-1 w-[50px] h-[50px]"
          alt="Trophy icon"
        />
        <div className="col-start-2 col-span-2">
          <p className="font-semibold text-white">{baseSymbol}</p>
          <div className="text-gray-500 pt-1">
            {loading && <p>Loading...</p>}
            {error && <p>{`Error! Something went wrong!`}</p>}
            {data && !loading && <p>{getFirstValidMarketPrice(data)}</p>}
          </div>
        </div>
        <div className="col-start-5 col-span-2 pt-4">
          <button onClick={() => refetch()} className="w-[40px] h-[40px] mr-2">
            <img
              src={refresh}
              height={5}
              width={5}
              className="w-5 h-5"
              alt="Refresh crypto price icon"
            />
          </button>
          <button
            onClick={() => removeCardCallback(baseSymbol)}
            className="w-[40px] h-[40px]"
          >
            <img
              src={clear}
              height={5}
              width={5}
              className="w-5 h-5"
              alt="Remove crypto icon"
            />
          </button>
        </div>
        <div className="h-[1px] mt-2 col-start-1 col-span-5 bg-gradient-to-r from-gray-400"></div>
      </div>
    </div>
  );
};

export default PriceCard;
