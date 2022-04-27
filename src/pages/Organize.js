import { collection, query } from "firebase/firestore";
import React from "react";
import { db } from "../app/firebase";
import ItemCard from "../components/Cards/ItemCard";
import PageTitle from "../components/Typography/PageTitle";
import { useInfiniteItems } from "../hooks/useItems";

function Organize() {
  const q = query(collection(db, "items"));
  const { items, isLoading } = useInfiniteItems(q);
  return (
    <>
      <PageTitle>organize</PageTitle>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {items.map((item) => 
            <ItemCard key={item.id} item={item} />
          )}
        </>
      )}
    </>
  );
}

export default Organize;
