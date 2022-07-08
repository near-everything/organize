import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Card from "../Card";
import CardBody from "../CardBody";

function ItemCard({ item }) {
  const navigate = useNavigate();

  const viewItem = (id) => {
    navigate(`/item/${id}`);
  };
  return (
    <Card>
      <CardBody className="flex flex-col">
        <img alt="not found" src={item.media[0]} className="m-2" />
        <div className="flex flex-col m-2">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {item.categoryByCategoryId.name}
          </p>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {item.subcategoryBySubcategoryId.name}
          </p>
          <div className="flex justify-end">
            <Button onClick={() => viewItem(item.id)}>view</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
