# Solution by Éber Jessé da Silva Peretto

As requested in the assignment, this website was created on React with TypeScript, using Apollo Client and hooks to fetch the required data from a GraphQL API service. The page styles were created using Tailwind CSS.

The layout was made following the model of the preview image, with the addition of a refetch/refresh button on each cryptocurrency card and also a second layout to support mobile screens. I'm not used at all to creating the component styles and screen layouts, but I gave my best to achieve a good looking and well performing page, following all the Lighthouse recommendations that I could implement.

Regarding the React aspect of the website, I've componentized only the parts that were fitting to be reused in other pages. The form input is being validated using regex and there is also error handling on the GraphQL queries. At last, I've also created a set of tests using React Testing Library, mainly with the cryptocurrency price card that performs GraphQL queries.

This website is also running on Heroku on https://yellow-strong-carrion.herokuapp.com/

I want to thank you all for the opportunity and hope to have met expectations with this test.

# Frontend Developer Test Assignment

Create a website that will display the prices of different cryptocurrencies. The prices will be fetched from a 3rd party GraphQL API service.

Task description:

- Use React, Apollo, TypeScript and hooks.
- Create a website that looks similar to preview.png.
- The required images are in “assets” folder.
- The exact colours, fonts and text sizes used are not important.
- User can add cryptocurrencies to the list by entering their codes ("BTC", "XRP", BNB" etc.)
- User can see the list of added currencies together with their EUR prices.
- User can remove the cryptocurrencies from the list.
- The EUR price is fetched from an API service.

An example query to fetch the current EUR value of BTC currency:

```
https://api.blocktap.io/graphql
query price {
  markets(filter:{ baseSymbol: {_eq:"BTC"} quoteSymbol: {_eq:"EUR"}}) {
    marketSymbol
    ticker {
      lastPrice
    }
  }
}
```

You can explore the Graphiql interface for that API at https://api.blocktap.io/graphiql

You may also use any other GraphQL API service to fetch the prices from.

Sample JSON response from the request above:

```
  {
  "data": {
    "markets": [
      {
        "marketSymbol": "Binance:BTC/EUR",
        "ticker": {
          "lastPrice": "8791.81000000"
        }
      },
      {
        "marketSymbol": "BinanceJe:BTC/EUR",
        "ticker": {
          "lastPrice": "8814.64000000"
        }
      },
      {
        "marketSymbol": "Bitfinex:BTC/EUR",
        "ticker": {
          "lastPrice": "8757.80000000"
        }
      },
...
```

You can ignore the different markets in the API response and just use, for example, the price from the first market. So markets don’t matter in the context of this test assignment.
