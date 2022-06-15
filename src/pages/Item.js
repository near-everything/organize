import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db, st } from "../app/firebase";
import Button from "../components/Button";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import ImageCard from "../components/Cards/ImageCard";
import FileUpload from "../components/FileUpload";
import Select from "../components/Select";
import ThemedSuspense from "../components/ThemedSuspense";
import { categories, conditions } from "../utils/categories";
import { selectUser } from "../features/auth/authSlice";
import { callFunction, getAccount } from "../app/near";

function Item() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const labels = useSelector((state) => state.labels.schema);
  const [subcategory, setSubcategory] = useState(null);
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);

  const { itemId } = useParams();
  const itemRef = doc(db, "items", itemId);
  const item = useFirestoreDocument(["items", itemId], itemRef);
  const user = useSelector(selectUser);

  const removeFile = (index) => {
    setFiles((old) => {
      return old.filter((value, i) => i !== index);
    });
  };

  const resetFields = () => {
    setEdit(false);
  };


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
    let updateObject = {};
    let urls = [];
    if (files.length > 0) {
      for (const img of files) {
        const storageRef = ref(st, `images/${user}/${Timestamp.now()}`);
        const snapshot = await uploadBytes(storageRef, img);
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }
      const updatedMedia = { media: urls };
      updateObject = { ...updateObject, ...updatedMedia };
    }

    if (category) {
      updateObject = { ...updateObject, category };
    }

    try {
      const docRef = doc(db, "items", itemId);
      await setDoc(docRef, updateObject, { merge: true });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      resetFields();
    }
  };

  if (item.isLoading || loading) {
    return <ThemedSuspense />;
  }
  const snapshot = item.data;
  const data = snapshot.data();

  return (
    <>
      <Card>
        <CardBody className="flex flex-col">
          {data.media &&
            data.media.map((url, index) => (
              <ImageCard key={index} index={index} media={url} />
            ))}
          {edit ? (
            <>
              <FileUpload
                onChange={(event) => {
                  if (event.target.files.length > 0) {
                    setFiles([...files, ...event.target.files]);
                    event.target.value = null;
                  }
                }}
              />
              <div className="flex flex-row mt-4">
                {files.length > 0 &&
                  files.map((file, index) => (
                    <ImageCard
                      key={index}
                      index={index}
                      media={URL.createObjectURL(file)}
                      removeImage={removeFile}
                    />
                  ))}
              </div>
              <br />
            </>
          ) : null}
          <div className="flex flex-col m-2">
            {edit ? (
              // <Select
              //   placeholder="category"
              //   onChange={(e) => setCategory(e.target.value)}
              //   options={labels.categories}
              // />
              null
            ) : (
              null
              // <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              //   {data.category && data.category.name}
              // </p>
            )}
            {/* <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
              {data.subcategory && data.subcategory.name}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Brand: {data.brand}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Condition:{" "}
              {data.condition &&
                conditions.find((it) => it.value === data.condition).name}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Material: {data.material}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Size: {data.size}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Description: {data.description}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Created Timestamp: {data.createdTimestamp.toString()}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Updated Timestamp: {data.updatedTimestamp.toString()}
            </p>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              isValidated: {data.isValidated.toString()}
            </p> */}
            <div className="flex flex-row">
              <Button onClick={() => setEdit(!edit)} className="mx-2">
                Edit
              </Button>
              <Button
                onClick={update}
                className={`mx-2 ${edit ? "" : "hidden"}`}
              >
                Update
              </Button>
            </div>

            {/* <Button onClick={() => approve(item.id)}>Approve</Button>
          <Button onClick={decline}>Decline</Button>
          <Button onClick={() => update(item.id)}>Update</Button> */}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Item;
