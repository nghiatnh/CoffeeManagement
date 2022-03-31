import { Grid, Pagination, Stack } from "@mui/material";
import React from "react";
import CustomerInfo from "./CustomerInfo";

const CustomerList = (props) => {
  const foodRender = props.data.map((food) => (
    <CustomerInfo
      data={food}
      addFoodHandler={props.addFoodHandler}
      removeFoodHandler={props.removeFoodHandler}
    />
  ));

  return (
    <Grid container spacing={3} sx={{ mt: "5px" }}>
      {foodRender}
    </Grid>
  );
};

export default CustomerList;
