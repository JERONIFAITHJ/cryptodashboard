import React from "react";
import classes from "./CustomButton.module.css";

export default function CustomButton({ styles, btnType, btnName }) {
  return (
    <button
      style={styles ? {...styles} : {}}
      className={btnType === "outlined" ? classes.outlined : classes.contained}
    >
      {btnName}
    </button>
  );
}
