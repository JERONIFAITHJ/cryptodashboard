import React, { useEffect } from "react";
import classes from "./CustomButton.module.css";
import { useState } from "react";

export default function CustomButton({ styles, btnType, btnName, onClick = undefined }) {

  return (
    <button
      style={styles ? {...styles} : {}}
      onClick={onClick ? onClick : undefined}
      className={btnType === "outlined" ? classes.outlined : classes.contained}
    >
      {btnName}
    </button>
  );
}
