import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { storage, db, fb } from "../firebase.config";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    // get the zeroth file selected and set it to image
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // create a new storage ref with the name of the image
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    // get the progress of the uploading image
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      // error function
      (error) => {
        console.log(error);
        alert(error.message);
      },
      // complete function
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post the image + data to firebase
            db.collection("posts").add({
              timestamp: fb.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              image: url,
              username: username,
            });

            // once upload is complete, reset the image, progress, and caption
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Caption"
        variant="outlined"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
      />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Post</button>
      <progress value={progress} max="100" />
    </div>
  );
}

export default ImageUpload;
