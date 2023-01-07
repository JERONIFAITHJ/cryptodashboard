import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CoinSelect({ coinNumber, coin, coinSelected, handleCoin }) {
  return (
    <div>
      <h2>{`Crypto ${coinNumber}`}</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Coin 1</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coinSelected}
            label="coin1"
            onChange={handleCoin}
          >
            {coin.map((val) => (
              <MenuItem key={val.coinId} value={val.coinId}>
                {val.coinName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
