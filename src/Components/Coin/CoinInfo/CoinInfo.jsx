import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./CoinInfo.module.css";
import { useContext } from "react";
import { CoinStore } from "../../../Store/Store";
import ListView from "../../Dashoard/ListView/ListView";
import LineChart from "../LineChart/LineChart";

export default function CoinInfo() {
  const coin = useParams();
  const [coins] = useContext(CoinStore);
  const [coinData, setCoinData] = useState([]);
  const getData = async () => {
    try {
      const resp = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.coinInfo}`
      );
      const data = await resp.json();
      const [
        id,
        image,
        symbol,
        name,
        price_change_percentage_24h,
        current_price,
        total_volume,
        market_cap,
        description,
      ] = [
        data.id,
        data.image.large,
        data.symbol,
        data.name,
        data.market_data.price_change_percentage_24h,
        data.market_data.current_price.usd,
        data.market_data.total_volume.usd,
        data.market_data.market_cap.usd,
        data.description.uk,
      ];
      setCoinData((prevState) => {
        return [
          {
            id,
            image,
            symbol,
            name,
            price_change_percentage_24h,
            current_price,
            total_volume,
            market_cap,
            description,
          },
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return coinData && coinData.length > 0 ? (
    <div className={classes.coinInfo}>
      <ListView coinData={coinData} />
      <LineChart coinData={coinData[0]} />
      <div className={classes.descHolder}>
        <h2>Description:</h2>
        <p dangerouslySetInnerHTML={{ __html: coinData[0].description }}></p>
      </div>
    </div>
  ) : (
    <p>Error Loading!</p>
  );
}
