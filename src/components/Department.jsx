import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";

const Department = ({ name }) => {
  return (
    <Link className="w-full" to={`/more-events/${name}`}>
      <Paper
        elevation={2}
        className="p-4 sm:p-6 md:p-8 w-full min-h-[100px] aspect-square flex items-center justify-center hover:bg-black hover:text-white duration-300 cursor-pointer hover:scale-105 transition-transform"
      >
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
          {name}
        </h1>
      </Paper>
    </Link>
  );
};

export default Department;
