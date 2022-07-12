import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import AttributeField from "../components/AttributeField";
import Button from "../components/Button";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import ImageCard from "../components/Cards/ImageCard";
import ThemedSuspense from "../components/ThemedSuspense";
import { useRequestById } from "../features/requestDeck/requestDeckApi";

function Request() {
  const { requestId } = useParams();
  const [showImages, setShowImages] = useState(false);
  const { data, isLoading, isError } = useRequestById(parseInt(requestId));

  if (isLoading) {
    return <ThemedSuspense />;
  }
  return (
    <>
      <Suspense fallback={<ThemedSuspense />}>
        <Card>
          <CardBody className="flex flex-col">
            <Button onClick={() => setShowImages(!showImages)}>
              {showImages ? "hide" : "show"} images
            </Button>
            {showImages ? (
              <>
                {data.media &&
                  data.media.map((url, index) => (
                    <ImageCard key={index} index={index} media={url} />
                  ))}
              </>
            ) : null}
            <div className="flex flex-col m-2">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {data.category.name}
              </p>
              <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
                {data.subcategory.name}
              </p>
              {data.itemCharacteristics.edges.map((char, index) => {
                return (
                  <Suspense key={index}>
                    <AttributeField
                      characteristic={char.node}
                      itemId={data.id}
                    />
                  </Suspense>
                );
              })}
            </div>
            <br />
          </CardBody>
        </Card>
      </Suspense>
    </>
  );
}

export default Request;
