import { Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import TableInfo from "./TableInfo";

const TableList = (props) => {
  const [tables, setTables] = useState([]);
  const [tableRender, setTableRender] = useState(null);
  useEffect(() => {
    const getTables = async () => {
      const response = await api.get("/tables");
      if (response.data) {
        setTables(response.data);
      }
    };
    getTables();
  }, []);

  useEffect(() => {
    setTableRender(
      tables.map((table) => {
        return <TableInfo data={table} key={table.id}/>;
      })
    );
  }, [tables]);

  return (
    <Box>
      <Typography variant="h3" align="center" fontWeight={"medium"}>
        Table List
      </Typography>
      <Divider />
      <Grid container spacing={3} sx={{ mt: "5px" }}>
        {tableRender}
      </Grid>
    </Box>
  );
};

export default TableList;
