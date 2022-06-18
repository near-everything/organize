import { useFirestoreDocument } from "@react-query-firebase/firestore";
import axios from "axios";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { API_URL } from "../app/api";
import { db } from "../app/firebase";
import Button from "../components/Button";
import Card from "../components/Card";
import CardBody from "../components/CardBody";
import ImageCard from "../components/Cards/ImageCard";
import FileUpload from "../components/FileUpload";
import ThemedSuspense from "../components/ThemedSuspense";

function Item() {
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);

  const { itemId } = useParams();
  const itemRef = doc(db, "items", itemId);
  const item = useFirestoreDocument(["items", itemId], itemRef);
  const { control } = useForm({
    defaultValues: item.attributes,
  });
  
  useEffect(() => {
    setLoading(true);
    async function getAllLabels() {
      await axios
        .get(API_URL + "/attribute/")
        .then((res) => {
          const allAttributes = res.data.attributes;
          setAttributes(allAttributes);
        })
        .catch((err) => console.error(err));
    };
    getAllLabels();
    setLoading(false);
  }, [])

  const removeFile = (index) => {
    setFiles((old) => {
      return old.filter((value, i) => i !== index);
    });
  };

  const resetFields = () => {
    setEdit(false);
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
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data.category && data.category}
            </p>
            <p className="mb-2 text-md font-medium text-gray-600 dark:text-gray-400">
              {data.subcategory && data.subcategory}
            </p>
            {attributes &&
              attributes.map((char) => {
                  if (edit) {
                    return (
                      <Controller
                        key={char.id}
                        name={char.name}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            options={char.options}
                            {...field}
                            label={char.label}
                            isMulti={char.isMulti}
                            className={`${
                              char.isMulti ? "basic-multi-select" : ""
                            }`}
                            classNamePrefix="select"
                          />
                        )}
                      />
                    );
                  } else {
                    return (
                      <p key={char.id} className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {char.name}: {data.attributes[char.name]}
                      </p>
                    );
                  }
                })}
            <div className="flex flex-row">
              <Button onClick={() => setEdit(!edit)} className="mx-2">
                Edit
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
