import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";

import "./Post.css";

function Post({ image, username, caption, avatar }) {
  return (
    <div className="post">
      <Stack direction="row" spacing={2.5} className="postHeader">
        <Avatar alt={username} src={avatar} />
        <h3>{username}</h3>
      </Stack>
      <div className="postBody">
        <img className="postImage" src={image} alt="" />
        <p className="postCaption">
          <strong>{username}</strong> {caption}
        </p>
      </div>
    </div>
  );
}

export default Post;
