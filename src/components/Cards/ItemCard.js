import React, { useState } from "react";
import { setDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { categories } from "../../utils/categories";
import Card from "../Card";
import CardBody from "../CardBody";
import Button from "../Button";
import Select from "../Select";
import ThemedSuspense from "../ThemedSuspense";
import { callFunction, getAccount } from "../../app/near";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const approve = async (id) => {
    setLoading(true);

    try {
      const docRef = doc(db, "items", id);
      await setDoc(
        docRef,
        {
          isValidated: true,
          updatedTimestamp: Timestamp.now(),
        },
        { merge: true }
      );
      const account = getAccount();
      await callFunction(
        "nft_mint",
        {
          token_id: `${account.accountId + Date.now()}`,
          metadata: {
            title: "test title",
            description: "test description",
          },
          receiver_id: account.accountId,
        },
        "0.1"
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const decline = () => {};

  const update = async (id) => {
    setLoading(true);

    try {
      const docRef = doc(db, "items", id);
      await setDoc(
        docRef,
        {
          category: category,
          updatedTimestamp: Timestamp.now(),
        },
        { merge: true }
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ThemedSuspense />;
  }

  return (
    <Card>
      <CardBody className="flex flex-col">
        <img alt="not found" src={item.media[0]} className="m-2" />
        <div className="flex flex-col m-2">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {categories.find((it) => it.value === item.category).name}
          </p>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            {item.subcategory}
          </p>
          <div className="flex justify-end">
            <Link to={{ pathname: `item/${item.id}` }}>see more</Link>
          </div>
          {/* <Button onClick={() => approve(item.id)}>Approve</Button>
          <Button onClick={decline}>Decline</Button>
          <Button onClick={() => update(item.id)}>Update</Button> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
