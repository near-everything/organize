import { collection, query } from "firebase/firestore";
import React from "react";
import { db } from "../app/firebase";
import { signIn } from "../app/near";
import Button from "../components/Button";
import ItemCard from "../components/Cards/ItemCard";
import { useInfiniteItems } from "../hooks/useItems";

function Organize() {
  const q = query(collection(db, "items"));
  const { items, isLoading } = useInfiniteItems(q);
  return (
    <>
      <div className="my-6">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Organize;
