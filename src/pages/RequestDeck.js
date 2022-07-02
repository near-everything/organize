import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import RequestCard from "../components/Cards/RequestCard";
import Header from "../components/Header";
import { useRequests } from "../features/requestDeck/requestDeckApi";
import {
  lastRequest,
  nextRequest
} from "../features/requestDeck/requestDeckSlice";

function RequestDeck() {
  const [currentRequest, setCurrentRequest] = useState(null);
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.requestDeck.currentIndex);
  const { data, isLoading, isError } = useRequests();

  useEffect(() => {
    if (data && currentIndex < data.length) {
      setCurrentRequest(data[currentIndex].node);
    }
  }, [currentIndex, data]);

  const next = () => {
    dispatch(nextRequest());
  };

  const last = () => {
    if (currentIndex > 0) {
      dispatch(lastRequest());
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="flex flex-col justify-between h-full">
            <Header className="flex flex-1" />
            <div className="flex flex-1">
              {currentRequest ? (
                <RequestCard key={currentRequest.id} request={currentRequest} />
              ) : (
                <p>No Request</p>
              )}
            </div>
            <div className="flex">
              <Button
                className="w-1/2 h-16"
                onClick={last}
                disabled={currentIndex === 0}
              >
                &#x2190;
              </Button>
              <Button className="w-1/2 h-16" onClick={next}>
                &#x2192;
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RequestDeck;
