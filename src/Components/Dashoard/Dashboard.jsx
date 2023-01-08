import React, { Fragment, useEffect, useState } from "react";
import { Box, Pagination, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import classes from "./Dashboard.module.css";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import PaginationComponent from "./Pagination/Pagination";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ErrorDisplay from "../Common/ErrorDisplay/ErrorDisplay";

export default function Dashboard({ watchlist = false }) {
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchValues, setSearchValues] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      if (watchlist.watch) {
        const d = data.filter((val) => watchlist.localData.includes(val.id));
        console.log(d);
        setCoinData(d);
        return;
      }
      setCoinData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchDataHandler = (e) => {
    setIsLoading(true);
    setSearchData(e.target.value);
    const newData = coinData.filter(
      (val) =>
        val.name.toLowerCase().includes(e.target.value.toLowerCase().trim()) ||
        val.symbol.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setSearchValues(newData);
    setIsLoading(false);
  };

  return (
    <div className={classes.dashboard}>
      <div className={classes.inputContainer}>
        <SearchRoundedIcon sx={{ fontSize: "2.5rem", color: "var(--grey)" }} />
        <input
          type="text"
          placeholder="Search"
          value={searchData}
          onChange={searchDataHandler}
        />
      </div>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="fullWidth"
              onChange={handleChange}
              sx={{ fontSize: "30px !important" }}
              aria-label="lab API tabs example"
            >
              <Tab
                label={<span className={classes.label}>Grid</span>}
                value="1"
              />
              <Tab
                label={<span className={classes.label}>List</span>}
                value="2"
              />
            </TabList>
          </Box>
          {searchValues.length != 0 ? (
            <PaginationComponent
              totalPages={Math.ceil(searchValues.length / 10)}
              coinData={searchValues}
            />
          ) : coinData.length != 0 ? (
            <PaginationComponent
              totalPages={Math.ceil(coinData.length / 10)}
              coinData={coinData}
            />
          ) : searchValues.length === 0 && !isLoading ? (
            <ErrorDisplay isError={true} />
          ) : (
            <ErrorDisplay isError={false} />
          )}
        </TabContext>
      </Box>
    </div>
  );
}
