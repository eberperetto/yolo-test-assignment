import React, { FunctionComponent, useState } from "react";

interface BaseSymbolFormProps {
  submitCallback: (baseSymbol: string) => Promise<string>;
}

/**
 * Renders a form to add crypto base symbols to a price list
 */
const BaseSymbolForm: FunctionComponent<BaseSymbolFormProps> = ({
  submitCallback,
}) => {
  const [baseSymbol, setBaseSymbol] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleFormSubmit = async () => {
    if (!baseSymbol) {
      setFormMessage("Enter a cryptocurrency code!");
      return;
    }
    let callbackResponse = await submitCallback(baseSymbol);
    setFormMessage(callbackResponse);
    setBaseSymbol("");
  };

  return (
    <div className="bg-white rounded-sm p-10">
      <div className="border-2 border-solid border-gray-300 rounded-sm h-10">
        <input
          id="baseSymbol"
          name="baseSymbol"
          type="text"
          required
          value={baseSymbol}
          onChange={(event) =>
            setBaseSymbol(event.currentTarget.value.toUpperCase())
          }
          className="border-none w-full rounded-sm relative h-9 font-bold text-black pl-5"
        />
        <label
          htmlFor="baseSymbol"
          className="bg-white text-gray-500 pl-1 pr-1 relative -top-[3.1rem] left-6 font-thin text-xs"
        >
          CRYPTOCURRENCY CODE
        </label>
      </div>
      <input
        type={"submit"}
        onClick={handleFormSubmit}
        value="Add"
        className="bg-orange-700 text-white text-center rounded-3xl w-full pt-2 pb-2 mt-5"
      />
      {formMessage && (
        <p className="text-gray-500 text-center w-full mt-5">{formMessage}</p>
      )}
      <p className="text-gray-500 mt-10 text-center w-full text-sm">
        Use of this service is subject to terms and conditions.
      </p>
    </div>
  );
};

export default BaseSymbolForm;
