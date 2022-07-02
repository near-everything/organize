import { useParams } from "react-router-dom";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import ImageCard from "../components/Cards/ImageCard";
import ThemedSuspense from "../components/ThemedSuspense";
import { useItemById } from "../features/itemDeck/itemDeckApi";

function Item() {
  const { itemId } = useParams();
  const { data, isLoading, isError } = useItemById(parseInt(itemId));

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
          <div className="flex flex-col m-2">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.categoryByCategoryId.name}
            </p>
            <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
              {data.subcategoryBySubcategoryId.name}
            </p>
            {data.characteristicsByItemId.edges.map((char) => {
              return (
                <p
                  key={char.node.attributeByAttributeId.name}
                  className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {char.node.attributeByAttributeId.name}:{" "}
                  {char.node.initialValue}
                </p>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Item;
