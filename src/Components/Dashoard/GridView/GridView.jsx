import React, { useEffect, useState } from "react";
import classes from "./GridView.module.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bookmark from "../../../Functions/Bookmark";

export default function GridView({ coinData }) {
  const [isPresent, setIsPresent] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || []
  );
  const navigate = useNavigate();

  const navigateToCoinPage = (to) => {
    navigate(`/coin/${to}`);
  };

  return (
    <div className={classes.cardContainer}>
      {coinData.map((val, i) => {
        return (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: (i * 0.1) % 0.5,
            }}
            key={i}
            className={`${classes.card} ${
              val.price_change_percentage_24h > 0
                ? classes.cardUp
                : classes.cardDown
            }`}
          >
            {/* First Row of elements in the card */}
            <div className={classes.firstChild}>
              <img onClick={() => navigateToCoinPage(val.id)} src={val.image} />
              <div className={classes.headContainer}>
                <h2 onClick={() => navigateToCoinPage(val.id)}>
                  {val.symbol.toUpperCase()}
                </h2>
                <h3 onClick={() => navigateToCoinPage(val.id)}>{val.name}</h3>
              </div>
              <BookmarkIcon
                onClick={() => bookmark(val.id)}
                className={classes.bookmark}
              />
            </div>
            {/* Second Row of elements in the card */}
            <div className={classes.secondChild}>
              <p
                onClick={() => navigateToCoinPage(val.id)}
                className={
                  val.price_change_percentage_24h > 0
                    ? classes.percentUp
                    : classes.percentDown
                }
              >
                {`${val.price_change_percentage_24h.toFixed(2)} %`}
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
            <div className={classes.thirdChild}>
              <p
                onClick={() => navigateToCoinPage(val.id)}
                style={{
                  color:
                    val.price_change_percentage_24h > 0
                      ? "var(--green)"
                      : "var(--red)",
                  cursor: "pointer",
                }}
              >{`$ ${val.current_price.toLocaleString({
                maximumFractionDigits: 3,
              })}`}</p>
            </div>
            <div className={classes.fourthChild}>
              <p
                onClick={() => navigateToCoinPage(val.id)}
              >{`Total volume: $ ${val.total_volume.toLocaleString()}`}</p>
              <p
                onClick={() => navigateToCoinPage(val.id)}
              >{`Total market cap: $ ${val.market_cap.toLocaleString()}`}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
