import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import {
  useAttributeById, useOptionById
} from "../features/itemDeck/itemDeckApi";

const EditAttributeField = React.forwardRef(function EditAttributeField(
  props,
  ref
) {
  const { characteristic, control } = props;
  const {
    data: attribute,
    isLoading: attributeIsLoading,
    isError: attributeIsError,
  } = useAttributeById(characteristic.attributeId);
  const {
    data: option,
    isLoading: optionIsLoading,
    isError: optionIsError,
  } = useOptionById(characteristic.optionId);
  return (
    <>
      {attributeIsLoading || optionIsLoading ? (
        "Loading..."
      ) : attributeIsError || optionIsError ? (
        "Error"
      ) : (
        <>
          <Controller
            name={`${attribute.id}`}
            control={control}
            defaultValue={option.id}
            render={({ field }) => (
              // TODO : Add check for type
              <Select
                options={attribute.relationshipsByAttributeId.edges?.map(
                  (relationship) => ({
                    value: relationship.node.optionByOptionId.id,
                    label: relationship.node.optionByOptionId.value,
                  })
                )}
                {...field}
                label={attribute.name}
                // isMulti={char.isMulti}
                // className={`${char.isMulti ? "basic-multi-select" : ""}`}
                classNamePrefix="select"
              />
            )}
          />
        </>
      )}
    </>
  );
});

export default EditAttributeField;
