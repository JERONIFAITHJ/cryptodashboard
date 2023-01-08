import React from "react";
import classes from "./ErrorDisplay.module.css";

export default function ErrorDisplay({ isError }) {
  return <div className={classes.error}>{isError ? <p>No data!</p> : <p>Loading...</p>}</div>;
}
