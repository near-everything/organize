import { collection, query } from "firebase/firestore";
import React from "react";
import { db } from "../app/firebase";
import { signIn } from "../app/near";
import Button from "../components/Button";
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
          <Button onClick={signIn}>Login with NEAR</Button>
          {items.map((item) => 
            <ItemCard key={item.id} item={item} />
          )}
        </>
      )}
    </>
  );
}

export default Organize;
