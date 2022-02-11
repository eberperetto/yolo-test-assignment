import React, { useState } from "react";

interface BaseSymbolFormProps {
  submitCallback: (baseSymbol: string) => void;
}

/**
 * Renders a form to add crypto base symbols to price list
 */
const BaseSymbolForm = ({ submitCallback }: BaseSymbolFormProps) => {
  const [baseSymbol, setBaseSymbol] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = () => {
    if (!baseSymbol) {
      setErrorMessage("Enter a cryptocurrency code!");
      return;
    }
    submitCallback(baseSymbol);
    setErrorMessage("");
    setBaseSymbol("");
  };

  return (
    <div className="bg-white">
      <label htmlFor="baseSymbol">CRYPTOCURRENCY CODE</label>
      <input
        name="baseSymbol"
        type="text"
        required
        value={baseSymbol}
        onChange={(event) =>
          setBaseSymbol(event.currentTarget.value.toUpperCase())
        }
        className="border-[1px] border-gray-300 rounded-sm"
      />
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type={"submit"}
        onClick={handleFormSubmit}
        value="Add"
        className="bg-orange-500 text-white text-center rounded-lg w-60"
      />
      <p className="text-gray-500">
        Use of this service is subject to terms and conditions.
      </p>
    </div>
  );
};

export default BaseSymbolForm;
