import React, { useEffect, useState } from "react";
import classes from "./Compare.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CoinSelect from "./CoinSelect/CoinSelect";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ListView from '../Dashoard/ListView/ListView'
import NumbersFunc from "../../Functions/NumbersFunc";

const styles = {
  width: "100%",
  "& .MuiSelect-select": {
    color: "var(--white)",
  },
};

export default function Compare() {
  const [coin1, setCoin1] = useState([]);
  const [coin1Selected, setCoin1Selected] = useState("bitcoin");

  const [coin2, setCoin2] = useState([]);
  const [coin2Selected, setCoin2Selected] = useState("ethereum");

  const [coinData, setCoinData] = useState([]);
  const [days, setdays] = React.useState("7");

  const [chart1Data, setChart1Data] = useState([]);
  const [chart2Data, setChart2Data] = useState([]);

  const [xAxis, setXAxis] = useState([]);
  const [y1Axis, setY1Axis] = useState([]);
  const [y2Axis, setY2Axis] = useState([]);

  const [marketType, setmarketType] = React.useState("prices");

  const getCoinData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (!response.ok) throw new Error("Something went wrong!");
      const data = await response.json();
      console.log(
        data.map((val) => {
          return { coinName: val.name, coinId: val.id };
        })
      );
      setCoin1(
        data.map((val) => {
          return { coinName: val.name, coinId: val.id };
        })
      );
      setCoin2(
        data.map((val) => {
          return { coinName: val.name, coinId: val.id };
        })
      );
      setCoinData(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Data to be passed to the chart
  const data = {
    labels: xAxis,
    datasets: [
      {
        label: coin1Selected,
        data: y1Axis,
        borderWidth: 1,
        fill: true,
        borderColor: "rgb(100, 12, 192)",
        tension: 0.25,
        yAxisID: "y",
        pointRadius: 0,
      },
      {
        label: coin2Selected,
        data: y2Axis,
        fill: true,
        borderWidth: 1,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        yAxisID: "y2",
        pointRadius: 0,
      },
    ],
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
    scales: {
      y: {
        id: "A",
        type: "linear",
        position: "left",
      },
      y2: {
        id: "B",
        type: "linear",
        position: "right",
      },
    },
  };

  // Getting chart data
  const getChartData = async () => {
    try {
      const resp1 = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin1Selected}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      const resp2 = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin2Selected}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      const data1 = await resp1.json();
      const data2 = await resp2.json();
      console.log(data1);
      setXAxis(
        data1.prices.map(
          (val) =>
            `${new Date(val[0]).getDate()}/${new Date(val[0]).getMonth() + 1}`
        )
      );
      setY1Axis(data1.prices.map((val) => val[1]));
      setY2Axis(data2.prices.map((val) => val[1]));
      setChart1Data(data1);
      setChart2Data(data2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoinData();
  }, []);

  useEffect(() => {
    getChartData();
  }, [coin1Selected, coin2Selected, days]);

  //   Coin one handler
  const handleCoin1 = (e) => {
    console.log(e.target.value);
    setCoin1Selected(e.target.value);
  };

  //   Coin two Handler
  const handleCoin2 = (e) => {
    console.log(e.target.value);
    setCoin2Selected(e.target.value);
  };

  // Handling price, market_cap and total volume
  const handleMarketTypeChange = (event, newmarketType) => {
    setmarketType(newmarketType);
    setY1Axis(chart1Data[newmarketType].map((val) => val[1]));
    setY2Axis(chart2Data[newmarketType].map(val => val[1]));
  };

  // Handling days of chart data to be fetched
  const handleDaysChange = (event) => {
    setdays(event.target.value);
  };

  // Controls for  toggler
  const control = {
    value: marketType,
    onChange: handleMarketTypeChange,
    exclusive: true,
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
  return coinData && coinData.length > 0 ? (
    <div className={classes.compare}>
      <div className={classes.dataFeed}>
        <CoinSelect
          coinNumber="1"
          coinSelected={coin1Selected}
          coin={coin1}
          handleCoin={handleCoin1}
        />
        <CoinSelect
          coinNumber="2"
          coinSelected={coin2Selected}
          coin={coin2}
          handleCoin={handleCoin2}
        />
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "100%" }}>
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
        </div>
      </div>
      <ListView coinData={coinData.filter(val => val.id === coin1Selected || val.id === coin2Selected)} />
      <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {children}
      </ToggleButtonGroup>
      <Line data={data} options={options} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}
