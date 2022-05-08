import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../app/firebase";
import ItemCard from "../components/Cards/ItemCard";
import ThemedSuspense from "../components/ThemedSuspense";

function Item() {
  const { itemId } = useParams();
  const ref = doc(db, "items", itemId);
  const item = useFirestoreDocument(["items", itemId], ref);

  if (item.isLoading) {
    return <ThemedSuspense />;
  }
  const snapshot = item.data;
  return (
    <>
      <ItemCard item={snapshot.data()} />
    </>
  );
}

export default Item;
