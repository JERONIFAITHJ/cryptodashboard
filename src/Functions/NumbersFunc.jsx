import React from "react";

const NumbersFunc = (num) => {
  if (num >= 100000 && num < 1000000) {
    return `$${num.toString()[0]}.${num.toString().slice(1, 3)}K`;
  }
  if (num >= 1000000 && num < 1000000000) {
    return `$${num.toString()[0]}.${num.toString().slice(1, 3)}M`;
  }
  if (num >= 1000000000) {
    return `$${num.toString()[0]}.${num.toString().slice(1, 3)}B`;
  }
  return `$${num}`;
};

export default NumbersFunc;
