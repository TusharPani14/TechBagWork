import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

const clientId =
  "223924853596-jceurdc3um64175dfk4mr13o0dub9lkb.apps.googleusercontent.com";

const Navbar = () => {
  const [success, setSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSuccess = (res) => {
    console.log("Login Success", res.profileObj);
    setProfileImg(res.profileObj.imageUrl);
  
    // Call the /user/login route
    axios
      .post("/user/login", {
        name: res.profileObj.givenName + " " + res.profileObj.familyName,
        email: res.profileObj.email,
      })
      .then((response) => {
        // Handle the response from the server if needed
        console.log(response.data);
  
        const updatedProfileObj = {
          ...res.profileObj,
          id: response.data.user.id, // Append the ID from response.data
        };
  
        setSuccess(true);
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
  
        // Store updatedProfileObj in localStorage
        localStorage.setItem("profileObj", JSON.stringify(updatedProfileObj));
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Login Error:", error);
        setSuccess(false);
        setSnackbarMessage("Login failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };  

  const onFailure = (res) => {
    console.log("Login Failed", res);
    setSuccess(false);
    setSnackbarMessage("Login failed");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const onLogoutSuccess = () => {
    console.log("Logout Successful");
    setSuccess(false);
    setAnchorEl(null);
    setSnackbarMessage("Logout successful");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    // Remove profileObj from localStorage
    localStorage.removeItem("profileObj");
  };

  const handleProfileIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const profileObj = JSON.parse(localStorage.getItem("profileObj"));

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={3}
        py={2}
        bgcolor="primary.main"
        color="primary.contrastText"
      >
        <img
          src="https://www.thetechbag.com/images/logo.svg"
          alt="Logo"
          style={{ height: "30px", marginRight: "10px" }}
        />
        {profileObj ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleProfileIconClick}
              edge="end"
            >
              <Avatar src={profileObj.imageUrl} alt="Profile" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <GoogleLogout
                  clientId={clientId}
                  buttonText={"Logout"}
                  onLogoutSuccess={onLogoutSuccess}
                />
              </MenuItem>
            </Menu>
          </>
        ) : loading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText={"Login"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
          />
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </div>
  );
};

export default Navbar;
