import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../app/firebase";
import Button from "../components/Button";
import ItemCard from "../components/Cards/ItemCard";
import Header from "../components/Header";
import { lastItem, nextItem } from "../features/itemDeck/itemDeckSlice";
import { useInfiniteItems } from "../hooks/useItems";

function ItemDeck() {
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.itemDeck.currentIndex); 
  const q = query(collection(db, "items"));
  const { items, isLoading } = useInfiniteItems(q);

  useEffect(() => {
    setCurrentItem(items[currentIndex]);
  }, [currentIndex, items]);

  const next = () => {
    dispatch(nextItem())
  };

  const last = () => {
    if (currentIndex > 0) {
      dispatch(lastItem())
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
              {currentItem ? (
                <ItemCard key={currentItem.id} item={currentItem} />
              ) : (
                <p>No item</p>
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

export default ItemDeck;
