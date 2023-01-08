import React from "react";
import classes from "./Footer.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import { RWebShare } from "react-web-share";

const styles = {
  color: "var(--white)",
  fontSize: "3rem",
  cursor: 'pointer'
};

export default function Footer() {
  return (
    <div className={classes.footer}>
      <h2>Cryptodashboard.</h2>
      <div>
        <a href="/">
          <InstagramIcon sx={styles} />
        </a>
        <a href="/">
          <FacebookIcon sx={styles} />
        </a>
        <a href="/">
          <TwitterIcon sx={styles} />
        </a>
        <RWebShare
          data={{
            text: "Cryptodashboard made by Jeroni",
            url: "https://cryptodashboard-zeta.vercel.app/",
            title: "Cryptodashboard",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <SendIcon sx={styles} />
        </RWebShare>
      </div>
    </div>
  );
}
