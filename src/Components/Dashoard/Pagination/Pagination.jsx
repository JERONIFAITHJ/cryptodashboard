import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import GridView from "../GridView/GridView";
import { PaginationItem } from "@mui/material";
import { TabPanel } from "@mui/lab";
import ListView from "../ListView/ListView";

export default function PaginationComponent({ coinData, totalPages }) {
  const [currPage, setCurrPage] = useState(1);
  return (
    <div style={{ width: "100%" }}>
      <TabPanel value="1">
        <GridView
          coinData={coinData.slice(currPage * 10 - 10, currPage * 10)}
        />
      </TabPanel>
      <TabPanel sx={{ padding: '0 !important', boxSizing: 'border-box' }} value="2">
        <ListView
          coinData={coinData.slice(currPage * 10 - 10, currPage * 10)}
        />
      </TabPanel>
      <Pagination
        sx={{
          "& ul": {
            justifyContent: "center",
            marginTop: "2rem",
            "& li": {
              fontFamily: "Inter sans-serif !important",
              fontSize: "1.2rem",
            },
          },
          marginBottom: '2rem'
        }}
        count={totalPages}
        onChange={(e, page) => {
          setCurrPage(page);
        }}
        color="primary"
      />
    </div>
  );
}
