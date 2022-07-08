import React from "react";
import { useAttributeById } from "../features/itemDeck/itemDeckApi";
import { useOptionById } from "../features/itemDeck/itemDeckApi";

const AttributeField = React.forwardRef(function AttributeField(props, ref) {
  const { characteristic } = props;
  const { data: attribute, isLoading: attributeIsLoading, isError: attributeIsError } = useAttributeById(characteristic.attributeId);
  const { data: option, isLoading: optionIsLoading, isError: optionIsError } = useOptionById(characteristic.optionId);
  return (
    <>
      {attributeIsLoading || optionIsLoading ? (
        "Loading..."
      ) : attributeIsError || optionIsError ? (
        "Error"
      ) : (
        <>
          <p>
            <span className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{attribute.name}:</span> {option.value}
          </p>
        </>
      )}
    </>
  );
});

export default AttributeField;
