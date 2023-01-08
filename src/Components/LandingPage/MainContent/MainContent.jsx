import React from "react";
import CustomButton from "../../Common/CustomButton/CustomButton";
import classes from "./MainContent.module.css";
import gradient from "../../../Assets/gradient.png";
import floaterImg from "../../../Assets/floaterImg.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RWebShare } from "react-web-share";

export default function MainContent() {
  const navigate = useNavigate();
  const DashboardHandler = () => {
    navigate("/dashboard");
  };
  return (
    <div className={classes.maincontent}>
      <div className={classes.textContainer}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            repeatType: Infinity,
            ease: "easeIn",
          }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            repeatType: Infinity,
            ease: "easeIn",
          }}
          className={classes.difftext}
        >
          Real Time.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            repeatType: Infinity,
            ease: "easeIn",
          }}
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.75,
            repeatType: Infinity,
            ease: "easeIn",
          }}
        >
          <CustomButton
            styles={{ marginRight: "2rem" }}
            btnName="Dashboard"
            btnType="contained"
            onClick={DashboardHandler}
          />
          <RWebShare
            data={{
              text: "Cryptodashboard made by Jeroni",
              url: "https://cryptodashboard-zeta.vercel.app/",
              title: "Cryptodashboard",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <CustomButton btnName="Share" btnType="outlined" />
          </RWebShare>
        </motion.div>
      </div>
      <div className={classes.imgContainer}>
        <img src={gradient} id={classes["gradient"]} alt="gradient" />
        <motion.img
          id={classes["floater"]}
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            repeatType: "mirror",
            duration: 1.5,
            repeat: Infinity,
          }}
          src={floaterImg}
          alt="floater"
        />
      </div>
    </div>
  );
}
