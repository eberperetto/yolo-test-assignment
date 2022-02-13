import React, { FunctionComponent, useState } from "react";
import BaseSymbolForm from "./baseSymbolForm";
import { validateBaseSymbol } from "../utils/helpers";
import Layout from "./layout";
import Logo from "./logo";
import Footer from "./footer";
import PriceList from "./priceList";
import Title from "./title";

/**
 * Main component of the app home
 */
const Home: FunctionComponent = () => {
  // State variable for the crypto codes entered by the user
  const [baseSymbols, setBaseSymbols] = useState<string[]>(["BTC"]);

  // Handlers to button actions on the screen
  const addBaseSymbol = async (baseSymbol: string): Promise<string> => {
    if (!validateBaseSymbol(baseSymbol)) {
      return `${baseSymbol} is not valid, your code should have at least three characters and letters among them!`;
    }
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
    <Layout>
      <div className="h-max background-images md:background-images-medium lg:background-images-large">
        <div className="ml-12 md:ml-24 -mt-5">
          <Logo />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ml-12 md:ml-24">
          <div className="col-span-1">
            <div className="mb-12 md:mb-14">
              <Title
                title={"Now you can track all your cryptos here!"}
                subtitle={
                  "Just enter the cryptocurrency code on the form to the right."
                }
              />
            </div>
            <PriceList
              baseSymbols={baseSymbols}
              removeCardCallback={removeBaseSymbol}
            />
          </div>
          <div className="col-span-1 pr-3 md:pr-24 pl-3 md:pl-24 -ml-12 md:ml-20">
            <BaseSymbolForm submitCallback={addBaseSymbol} />
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
