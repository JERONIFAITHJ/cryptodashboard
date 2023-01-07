import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import classes from "./LineChart.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function LineChart({ coinData }) {
  const [days, setdays] = React.useState("7");
  const [chartData, setChartData] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [marketType, setmarketType] = React.useState("prices");

  // Handling price, market_cap and total volume
  const handleMarketTypeChange = (event, newmarketType) => {
    setmarketType(newmarketType);
    setYAxis(chartData[newmarketType].map((val) => val[1]));
  };

  // Handling days of chart data to be fetched
  const handleDaysChange = (event) => {
    setdays(event.target.value);
  };

  // Children for toggle
  const children = [
    <ToggleButton value="prices" key="prices">
      PRICE
    </ToggleButton>,
    <ToggleButton value="market_caps" key="market_cap">
      MARKET CAP
    </ToggleButton>,
    <ToggleButton value="total_volumes" key="total_volumes">
      TOTAL VOLUME
    </ToggleButton>,
  ];

  // Controls for  toggler
  const control = {
    value: marketType,
    onChange: handleMarketTypeChange,
    exclusive: true,
  };

  // Options for the chart
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  // Data to be passed to the chart
  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "Bitcoin",
        data: yAxis,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Setting axes
  const setAxes = (data) => {
    setXAxis(
      data.map(
        (val) =>
          `${new Date(val[0]).getDate()}/${new Date(val[0]).getMonth() + 1}`
      )
    );
    setYAxis(data.map((val) => val[1]));
  };

  // Getting chart data
  const getChartData = async () => {
    try {
      const resp = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinData.id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      const data = await resp.json();
      setAxes(data.market_caps);
      setChartData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChartData();
  }, [days]);

  return (
    <div className={classes.lineChart}>
      <div className={classes.dateChange}>
        <h2>Price change in last: </h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: "12rem" }}>
            <InputLabel id="demo-simple-select-label">Days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={days}
              label="days"
              onChange={handleDaysChange}
            >
              <MenuItem value={7}>7 days</MenuItem>
              <MenuItem value={30}>30 days</MenuItem>
              <MenuItem value={60}>60 days</MenuItem>
              <MenuItem value={90}>90 days</MenuItem>
              <MenuItem value={126}>120 days</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
          {children}
        </ToggleButtonGroup>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}