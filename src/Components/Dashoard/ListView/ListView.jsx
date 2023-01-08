import React, { Fragment, useState } from "react";
import classes from "./ListView.module.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { motion } from "framer-motion";
import NumbersFunc from "../../../Functions/NumbersFunc";
import { isMobile } from "react-device-detect";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useNavigate } from "react-router-dom";
import bookmark from "../../../Functions/Bookmark";

export default function ListView({ coinData }) {
  const [isPresent, setIsPresent] = useState(JSON.parse(localStorage.getItem('userInfo')) || []);
  const navigate = useNavigate();
  const navigateToCoinPage = (to) => {
    navigate(`/coin/${to}`);
  };
  return (
    <Fragment>
      {coinData.map((val, i) => (
        <motion.div
          onClick={() => navigate(`/coin/${val.id}`)}
          className={classes.listCard}
          key={i}
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, ease: "easeOut" }}
        >
          <img
            onClick={() => navigateToCoinPage(val.id)}
            className={classes.coinLogo}
            src={val.image}
            alt="coinImage"
          />
          <div className={classes.headContainer}>
            <h2 onClick={() => navigateToCoinPage(val.id)}>
              {val.symbol.toUpperCase()}
            </h2>
            <h3 onClick={() => navigateToCoinPage(val.id)}>{val.name}</h3>
          </div>
          <div className={classes.thirdChild}>
            <p
              onClick={() => navigateToCoinPage(val.id)}
              className={
                val.price_change_percentage_24h > 0
                  ? classes.percentUp
                  : classes.percentDown
              }
            >
              {`${val.price_change_percentage_24h.toFixed(2)}%`}
            </p>
            {val.price_change_percentage_24h > 0 ? (
              <TrendingUpRoundedIcon
                onClick={() => navigateToCoinPage(val.id)}
                className={classes.trendingUpIcon}
              />
            ) : (
              <TrendingDownRoundedIcon
                onClick={() => navigateToCoinPage(val.id)}
                className={classes.trendingDownIcon}
              />
            )}
          </div>
          <div className={classes.fourthChild}>
            <p
              onClick={() => navigateToCoinPage(val.id)}
              className={classes.total_volume}
              style={{
                color:
                  val.price_change_percentage_24h > 0
                    ? "var(--green)"
                    : "var(--red)",
                cursor: "pointer",
              }}
            >{`$${val.current_price.toLocaleString({
              maximumFractionDigits: 3,
            })}`}</p>
          </div>
          <p
            onClick={() => navigateToCoinPage(val.id)}
            className={classes.total_volume}
          >{`$${val.total_volume.toLocaleString()}`}</p>
          {/* <p>{`$ ${val.market_cap.toLocaleString()}`}</p> */}
          <p
            onClick={() => navigateToCoinPage(val.id)}
            className={classes.total_volume}
          >
            {isMobile
              ? `${NumbersFunc(val.market_cap)}`
              : `$ ${val.market_cap.toLocaleString()}`}
          </p>
          <BookmarkIcon
            onClick={() => bookmark(val.id)}
            className={classes.bookmark}
          />
        </motion.div>
      ))}
    </Fragment>
  );
}
