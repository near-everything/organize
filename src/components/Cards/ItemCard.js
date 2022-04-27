import React from "react";
import { categories } from "../../utils/categories";
import Card from "../Card";
import CardBody from "../CardBody";


function ItemCard({ item }) {
  return (
    <Card>
      <CardBody className="flex items-center">
        <img alt="not found" src={item.media[0]} className="w-32 m-2" />
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {categories.find((it) => it.value === item.category).name}
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {item.subcategory}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
