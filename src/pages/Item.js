import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AttributeField from "../components/AttributeField";
import Button from "../components/Button";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import ImageCard from "../components/Cards/ImageCard";
import EditForm from "../components/EditForm";
import ThemedSuspense from "../components/ThemedSuspense";
import { useItemById } from "../features/itemDeck/itemDeckApi";

function Item() {
  const { itemId } = useParams();
  const { data, isLoading, isError } = useItemById(parseInt(itemId));
  const [edit, setEdit] = useState(false);

  if (isLoading) {
    return <ThemedSuspense />;
  }
  return (
    <>
      <Card>
        <CardBody className="flex flex-col">
          {data.media &&
            data.media.map((url, index) => (
              <ImageCard key={index} index={index} media={url} />
            ))}
          {edit ? (
            <>
              <EditForm item={data} />
            </>
          ) : (
            <>
              <div className="flex flex-col m-2">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {data.categoryByCategoryId.name}
                </p>
                <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
                  {data.subcategoryBySubcategoryId.name}
                </p>
                {data.itemCharacteristicsByItemId.edges.map((char, index) => {
                  return (
                    <AttributeField key={index} characteristic={char.node} />
                  );
                })}
              </div>
              <br />
            </>
          )}
          <Button onClick={() => setEdit(!edit)}>Edit</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default Item;
