import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import PriceCard, { GET_PRICE_QUERY } from "../components/priceCard";

const mockCallback = (baseSymbol: string): void => {
  return;
};

const mockResponses = [
  {
    request: {
      query: GET_PRICE_QUERY,
      variables: {
        baseSymbol: "ETH",
      },
    },
    result: {
      data: {
        markets: [
          {
            ticker: {
              lastPrice: "100",
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PRICE_QUERY,
      variables: {
        baseSymbol: "TEST111",
      },
    },
    result: {
      data: {
        markets: [],
      },
    },
  },
];

const mockNetworkErrorResponses = [
  {
    request: {
      query: GET_PRICE_QUERY,
      variables: {
        baseSymbol: "ETH",
      },
    },
    error: new Error("An error occurred"),
  },
];

test("renders with real crypto code", async () => {
  render(
    <MockedProvider mocks={mockResponses} addTypename={false}>
      <PriceCard baseSymbol="ETH" removeCardCallback={mockCallback} />
    </MockedProvider>
  );
  expect(screen.getByText("ETH")).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await screen.findByText("100.00 €");
});

test("renders with invalid crypto code", async () => {
  render(
    <MockedProvider mocks={mockResponses} addTypename={false}>
      <PriceCard baseSymbol="TEST111" removeCardCallback={mockCallback} />
    </MockedProvider>
  );
  expect(screen.getByText("TEST111")).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await screen.findByText("Price or crypto not found!");
});

test("renders with API network error", async () => {
  render(
    <MockedProvider mocks={mockNetworkErrorResponses} addTypename={false}>
      <PriceCard baseSymbol="ETH" removeCardCallback={mockCallback} />
    </MockedProvider>
  );
  expect(screen.getByText("ETH")).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await screen.findByText("Error! Something went wrong!");
});
