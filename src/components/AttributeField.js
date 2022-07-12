import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  useAttributeById,
  useOptionById,
  useUpdateCharacteristic,
} from "../features/itemDeck/itemDeckApi";
import { CheckMarkIcon, EditIcon, DeleteIcon } from "../icons";

const AttributeField = React.forwardRef(function AttributeField(props, ref) {
  const { characteristic, itemId } = props;
  const [edit, setEdit] = useState(false);
  const { data: attribute } = useAttributeById(characteristic.attributeId);
  const { data: option } = useOptionById(characteristic.optionId);
  const { control, handleSubmit } = useForm();
  const updateItemCharacteristic = useUpdateCharacteristic();

  const onSubmit = (data) => {
    console.log({ ...data, id: option.id });
    const newOption = Object.entries(data)[0];
    updateItemCharacteristic.mutate({
      itemId: itemId,
      attributeId: parseInt(newOption[0]),
      oldOptionId: option.id,
      newOptionId: newOption[1].value,
    });
    // TODO : OnSuccess, OnError
    setEdit(!edit);
  };
  let options;
  options = attribute.relationships.edges?.map((relationship) => ({
    value: relationship.node.option.id,
    label: relationship.node.option.value,
  }));

  return (
    <>
      {edit ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row w-full justify-between border-t-2">
              <div className="flex w-32 p-4">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {attribute.name}:
                </span>
              </div>
              <div className="flex flex-1">
                <Controller
                  name={`${attribute.id}`}
                  control={control}
                  defaultValue={options.find((it) => it.value === option.id)}
                  render={({ field }) => (
                    // TODO : Add check for type
                    <Select
                      options={options}
                      {...field}
                      label={attribute.name}
                      // isMulti={char.isMulti}
                      // className={`${char.isMulti ? "basic-multi-select" : ""}`}
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
              <div className="flex align-middle">
                <button type="submit" className="w-4 ml-2">
                  <CheckMarkIcon />
                </button>
                <button onClick={() => setEdit(!edit)} className="w-4 ml-2">
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-row w-full justify-between border-t-2">
            <div className="flex w-32 p-4">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                {attribute.name}:
              </span>
            </div>
            <div className="flex flex-1 p-4">
              <span>{option.value}</span>
            </div>
            <button className="w-4 ml-2" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </button>
          </div>
        </>
      )}
    </>
  );
});

export default AttributeField;
