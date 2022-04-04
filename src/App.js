import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import "./App.css";
import Post from "./components/Post";
import { db } from "./firebase.config";
import AuthModal from "./components/AuthModal";
import ImageUpload from "./components/ImageUpload";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="App">
      <Stack direction="row" className="header">
        <img
          className="instagramLogo"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
      </Stack>

      <AuthModal />

      {posts.map((post, index) => (
        <Post
          key={index}
          image={post.image}
          username={post.username}
          caption={post.caption}
          avatar={post.avatar}
        />
      ))}
    </div>
  );
}

export default App;
