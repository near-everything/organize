import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Card from "../Card";
import CardBody from "../CardBody";
import ThemedSuspense from "../ThemedSuspense";

function RequestCard({ request }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const viewRequest = (id) => {
    navigate(`/request/${id}`);
  };

  if (loading) {
    return <ThemedSuspense />;
  }

  return (
    <Card>
      <CardBody className="flex flex-col">
        <img alt="not found" src={request.media[0]} className="m-2" />
        <div className="flex flex-col m-2">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {request.categoryByCategoryId.name}
          </p>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {request.subcategoryBySubcategoryId.name}
          </p>
          <div className="flex justify-end">
            <Button onClick={() => viewRequest(request.id)}>view</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default RequestCard;
