import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../app/firebase";
import Button from "../components/Button";
import ItemCard from "../components/Cards/ItemCard";
import Header from "../components/Header";
import { useInfiniteItems } from "../hooks/useItems";

function ItemDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  const q = query(collection(db, "items"));
  const { items, isLoading } = useInfiniteItems(q);

  useEffect(() => {
    setCurrentItem(items[currentIndex]);
  }, [currentIndex, items]);

  const nextItem = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const lastItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
                onClick={lastItem}
                disabled={currentIndex === 0}
              >
                &#x2190;
              </Button>
              <Button className="w-1/2 h-16" onClick={nextItem}>
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
