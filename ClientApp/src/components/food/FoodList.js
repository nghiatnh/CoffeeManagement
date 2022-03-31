import { Grid, Pagination, Stack } from "@mui/material";
import React from "react";
import FoodInfo from "./FoodInfo";

const FoodList = (props) => {
  const foodRender = props.data.map((food) => (
    <FoodInfo
      data={food}
      addFoodHandler={props.addFoodHandler}
      removeFoodHandler={props.removeFoodHandler}
      key={food.id}
    />
  ));

  return (
    <Grid container spacing={3} sx={{ mt: "5px" }}>
      {foodRender}
    </Grid>
  );
};

export default FoodList;
