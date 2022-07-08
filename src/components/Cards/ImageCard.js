import React from "react";
import Card from "../Card";
import CardBody from "../CardBody";

function ImageCard({ index, media, removeImage }) {
  return (
    <Card>
      <div className="max-w-sm rouded overflow-hidden shadow-lg">
        {removeImage ? (
          <button
            className="absolute top-0 right-2 z-10"
            onClick={() => removeImage(index)}
          >
            &times;
          </button>
        ) : null}
        <CardBody className="flex flex-col">
          <img alt="not found" src={media} className="w-full" loading="lazy"/>
        </CardBody>
      </div>
    </Card>
  );
}

export default ImageCard;
