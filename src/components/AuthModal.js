import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

import { auth } from "../firebase.config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [user, setUser] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // if they already have a username, don't do anything
        } else {
          // if they don't have a firebase displayName, set it to their username
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user logged out
        setUser(null);
      }
    });
    return () => {
      // cleanup the listener
      unsubscribe();
    };
  }, [username, user]);

  const handleSignUp = (e) => {
    console.log("handling sign up");
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    // close the modal after sign up
    setOpen(false);
  };

  const handleSignIn = (e) => {
    console.log("handling sign in");
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });

    // close the modal after sign in
    setOpenSignIn(false);
  };

  return (
    <div>
      {user ? (
        <Stack direction="row" spacing={4} className="alignVerticallyCenter">
          {/* <p>Welcome, {user.displayName}</p> */}
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </Stack>
      ) : (
        <div className="loginOptions">
          <Button onClick={handleOpen}>Sign Up</Button>
          <Button onClick={handleOpenSignIn}>Sign In</Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram"
          />
          <form>
            <Stack direction="column" spacing={1}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleSignUp} type="submit" variant="text">
                Sign Up
              </Button>
            </Stack>
          </form>
          <div></div>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram"
          />
          <form>
            <Stack direction="column" spacing={1}>
              <TextField
                id="outlined-basic"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleSignIn} type="submit" variant="text">
                Sign In
              </Button>
            </Stack>
          </form>
          <div></div>
        </Box>
      </Modal>
    </div>
  );
}
