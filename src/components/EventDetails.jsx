import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/auth";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import MainLoader from "./MainLoader";
import { motion } from "framer-motion";
import { IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

function EventDetails() {
  const { uniqueName } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(false);
  const [expanded, setExpanded] = useState(false); // For collapsible sections
  const mobileCheck = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  const scrollUp = useRef(null);

  useEffect(() => {
    scrollUp.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    api
      .post("event/getSingleEvent", { uniqueName })
      .then((result) => {
        if (result.data === null) {
          setError(true);
          setLoading(false);
        } else {
          setData(result.data);
          setLoading(false);
        }
      })
      .catch(() => setError(true));
  }, [uniqueName]);

  if (loading || err) {
    return <MainLoader />;
  }

  return (
    <div ref={scrollUp}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${
          mobileCheck ? "h-screen" : "h-fit"
        } w-full flex items-center justify-evenly ${
          mobileCheck ? "overflow-hidden" : "overflow-y-scroll"
        } ${!mobileCheck ? "flex-col" : "flex-row"} min-h-screen`}
      >
        {/* Left Side - Image Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`${
            mobileCheck ? "w-[40%]" : "w-full"
          } h-full flex flex-col items-center bg-[#EBEBEB] justify-center relative ${
            mobileCheck ? "pt-0" : "pt-20"
          }`}
        >
          <img
            src="https://th.bing.com/th/id/R.918e4e1862b90b9298780a86de85bc00?rik=8KmCajyGGoiwdg&riu=http%3a%2f%2fstatic.dnaindia.com%2fsites%2fdefault%2ffiles%2f2015%2f08%2f11%2f364392-sundar-pichai-3-afp-crop.jpg&ehk=dt20eQYfLB5FdaFGHEY%2fJCZoOIJaUIyjFwnYgLPivn8%3d&risl=&pid=ImgRaw&r=0"
            alt="Sundar Pichai"
            className="w-[80%] object-contain rounded-lg shadow-lg mb-10 hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Right Side - Event Details Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`${mobileCheck ? "w-[60%]" : "w-full"} ${
            mobileCheck ? "h-screen" : "h-fit"
          } overflow-y-scroll ${!mobileCheck ? "p-8" : "px-12 pb-12"}`}
          style={{
            background: "linear-gradient(135deg, #B4C9D3, #A1B8C2)",
          }}
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between sticky top-0 bg-[#B4C9D3] p-4">
            <Typography fontSize={mobileCheck ? "60px" : "40px"} fontWeight="bold">
              {data.eventName}
            </Typography>
            {mobileCheck && (
              <motion.button
                onClick={() => navigate(-1)}
                className="px-7 py-1 border-2 border-black rounded-md hover:bg-black hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
              >
                Back
              </motion.button>
            )}
          </div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Collapsible Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
              >
                <Typography fontSize={"20px"} fontWeight={"bold"}>
                  Event Overview
                </Typography>
                <IconButton>
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </div>
              <Collapse in={expanded}>
                <Typography marginTop={"10px"} fontSize={"18px"}>
                  <strong>Department:</strong> {data.department}
                </Typography>
                <Typography marginTop={"10px"} fontSize={"18px"}>
                  <strong>Abstract:</strong> {data.eventAbstract}
                </Typography>
                <Typography marginTop={"10px"} fontSize={"18px"}>
                  <strong>Timing:</strong> {data.eventTiming}
                </Typography>
                <Typography marginTop={"10px"} fontSize={"18px"}>
                  <strong>Queries:</strong> {data.incharge} - {data.inchargeNumber}
                </Typography>
              </Collapse>
            </div>

            {/* Description Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Typography fontSize={"20px"} fontWeight={"bold"}>
                Description:
              </Typography>
              <Typography marginTop={"10px"} className="whitespace-pre-wrap">
                {data.eventDesp}
              </Typography>
            </div>

            {/* Additional Interactive Elements */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Typography fontSize={"20px"} fontWeight={"bold"}>
                Additional Information:
              </Typography>
              <Typography marginTop={"10px"}>
                This event is part of a series of futuristic tech talks aimed at
                inspiring the next generation of innovators.
              </Typography>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EventDetails;