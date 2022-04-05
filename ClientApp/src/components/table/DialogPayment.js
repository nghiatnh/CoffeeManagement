import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  createFilterOptions,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import api from "../api/api";

const DialogPayment = (props) => {
  const [customer, setCustomer] = React.useState(null);
  const [customers, setCustomers] = React.useState([]);
  const [discount, setDiscount] = React.useState(null);
  const [discounts, setDiscounts] = React.useState([]);
  const [bill, setBill] = React.useState(null);
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    const getCustomers = async () => {
      const response = await api.get("/customers");
      if (response.data) {
        setCustomers(response.data);
      }
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getBill = async () => {
      const response = await api.get("/bills?table=" + props.table.id);
      if (response.data) {
        setBill(response.data);
      }
    };
    getBill();
  }, []);

  useEffect(() => {
    const getDiscounts = async () => {
      const response = await api.get(
        "/discounts" + (customer != null ? "?customer=" + customer.id : "")
      );
      if (response.data) {
        setDiscounts(response.data);
      }
    };
    getDiscounts();
    setDiscount(null);
  }, [customer]);

  const handlePayment = async () => {
    if (customer){
      const response = await api.post("/payments", {table: props.table.id, customer: customer.id, discountCode: discount ? discount.id : null},
      {
        headers: {
          'content-type': 'application/json'
        }
      });
      if (response.data) {
        props.handlePayment(response.data);
      }
    } else {
      props.handlePayment({success: false});
    }
    props.handleClose();
  };

  const filterCustomerOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) => option.name + option.phone + option.code,
  });

  const filterDiscountOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option) => option.name,
  });

  return (
    <Box>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          size={"small"}
          sx={{ mt: "10px", width: "100%" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">Table: </InputAdornment>
            ),
          }}
          value={props.table.name}
        />
        <TextField
          size={"small"}
          sx={{ mt: "10px", width: "100%" }}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">Total price: </InputAdornment>
            ),
          }}
          value={
            (bill ? bill.totalPrice : null) +
            (discount
              ? " - " +
                (discount.count * bill.totalPrice < discount.limitprice ? discount.count * bill.totalPrice : discount.limitprice) +
                " = " +
                (bill.totalPrice - (discount.count * bill.totalPrice < discount.limitprice ? discount.count * bill.totalPrice : discount.limitprice))
              : "")
            }
        />
        <Autocomplete
          autoComplete
          size="small"
          id="combo-box-table"
          {...{
            options: customers,
            getOptionLabel: (option) => option.name,
          }}
          renderOption={(props, option) => {
            props.className =
              props.className + " " + props.className + "-apply";
            return (
              <Box {...props} style={{ display: "block" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {option.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Phone: {option.phone}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Code: {option.code}
                </Typography>
              </Box>
            );
          }}
          filterOptions={filterCustomerOptions}
          value={customer}
          renderInput={(params) => {
            params.InputProps.startAdornment = (
              <InputAdornment position="start">Customer: </InputAdornment>
            );
            return <TextField {...params} />;
          }}
          sx={{ backgroundColor: "white", mt: "15px" }}
          onChange={(event, newValue) => {
            setCustomer(newValue);
          }}
        />

        <Autocomplete
          autoComplete
          size="small"
          id="combo-box-table"
          {...{
            options: discounts,
            getOptionLabel: (option) => option.name,
          }}
          renderOption={(props, option) => {
            props.className =
              props.className + " " + props.className + "-apply";
            return (
              <Box {...props} style={{ display: "block" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {option.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  component="div"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"Discount " + option.count * 100 + "%"}
                </Typography>
              </Box>
            );
          }}
          filterOptions={filterDiscountOptions}
          value={discount}
          renderInput={(params) => {
            params.InputProps.startAdornment = (
              <InputAdornment position="start">Discount code: </InputAdornment>
            );
            return <TextField {...params} />;
          }}
          sx={{ backgroundColor: "white", mt: "15px" }}
          onChange={(event, newValue) => {
            setDiscount(newValue);
            console.log(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handlePayment}>Pay</Button>
      </DialogActions>
    </Box>
  );
};

export default DialogPayment;
