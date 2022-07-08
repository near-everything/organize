import { useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../components/FileUpload";
import Button from "./Button";
import ImageCard from "./Cards/ImageCard";
import EditAttributeField from "./EditAttributeField";

function EditForm({ item }) {
  const [files, setFiles] = useState([]);
  const { control, handleSubmit } = useForm();

  const removeFile = (index) => {
    setFiles((old) => {
      return old.filter((value, i) => i !== index);
    });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
      <div className="flex flex-col m-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {item.itemCharacteristicsByItemId.edges.map((char, index) => (
            <EditAttributeField
              key={index}
              characteristic={char.node}
              control={control}
            />
          ))}
          <Button type="submit">Update</Button>
        </form>
      </div>
    </>
  );
}

export default EditForm;
