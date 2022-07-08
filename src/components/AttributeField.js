import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  useAttributeById,
  useOptionById,
  useUpdateCharacteristic
} from "../features/itemDeck/itemDeckApi";
import { CartIcon, EditIcon } from "../icons";

const AttributeField = React.forwardRef(function AttributeField(props, ref) {
  const { characteristic, itemId } = props;
  const [edit, setEdit] = useState(false);
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
  const { control, handleSubmit } = useForm();
  const updateItemCharacteristic = useUpdateCharacteristic();

  const onSubmit = (data) => {
    console.log({ ...data, id: option.id });
    const newOption = Object.entries(data)[0]
    updateItemCharacteristic.mutate({ itemId: itemId, attributeId: newOption[0] ,oldOptionId: option.id, newOptionId: newOption[1].value})
    // TODO : OnSuccess, OnError
    setEdit(!edit)
  };

  return (
    <>
      {attributeIsLoading || optionIsLoading ? (
        "Loading..."
      ) : attributeIsError || optionIsError ? (
        "Error"
      ) : (
        <>
          <div className="flex flex-row">
            {edit ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  <button type="submit" className="w-4 ml-2">
                    <CartIcon />
                  </button>
                </form>
              </>
            ) : (
              <>
                <span className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {attribute.name}:
                </span>{" "}
                {option.value}
                <button className="w-4 ml-2" onClick={() => setEdit(!edit)}>
                  <EditIcon />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
});

export default AttributeField;
