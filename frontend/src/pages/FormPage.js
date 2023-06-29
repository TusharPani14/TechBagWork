import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the customer details
    const customerData = {
      name,
      email,
      shippingAddress: address,
      paymentMethod,
    };

    try {
      // Show a loading snackbar
      setSnackbarMessage("Submitting...");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);

      // Make the API call
      await axios.post("/buyNow", customerData);

      // Update the snackbar to success
      setSnackbarMessage("Order placed successfully!");
      setSnackbarSeverity("success");

      // Reset the form fields
      setName("");
      setEmail("");
      setAddress("");
      setPaymentMethod("");
    } catch (error) {
      console.error(error);

      // Update the snackbar to error
      setSnackbarMessage("An error occurred while placing the order.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    if (enteredEmail.trim() !== "" && !validateEmail(enteredEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validateEmail = (email) => {
    const regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$", "i");
    return regex.test(email);
  };

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Box p={4} width="60%">
        <img
          src="https://www.thetechbag.com/images/landing/hero.jpg"
          alt="Tech Bag"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <Box p={4} width="40%" border={1} borderRadius={8}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Customer Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                  pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                }}
                error={Boolean(emailError)}
                helperText={emailError}
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Shipping Address"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Payment Method"
                >
                  <MenuItem value="">Select Payment Method</MenuItem>
                  <MenuItem value="creditCard">Credit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Buy Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerForm;
