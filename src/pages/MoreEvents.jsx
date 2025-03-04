import React, { useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const theme = {
  eerieBlack: '#1C2127',
  berkeleyBlue: '#0B385F',
  uclaBlue: '#3373B0',
  columbiaBlue: '#BED4E9',
  aliceBlue: '#E7F1FB'
};

const workshopData = [
  {
    id: 1,
    title: "AI & ML Workshop",
    image: "/images/workshop.png",
    description: "Explore the fundamentals of AI & ML with hands-on projects.",
    venue: "Auditorium Hall A",
    time: "10:00 AM - 2:00 PM",
  },
  {
    id: 2,
    title: "Cybersecurity Bootcamp",
    image: "/images/workshop.png",
    description: "Learn the latest trends in cybersecurity and ethical hacking.",
    venue: "Lab 5, IT Block",
    time: "11:00 AM - 3:00 PM",
  },
  {
    id: 3,
    title: "Blockchain Fundamentals",
    image: "/images/workshop.png",
    description: "Dive into blockchain technology and smart contracts.",
    venue: "Room 201, CSE Block",
    time: "9:00 AM - 1:00 PM",
  },
  {
    id: 4,
    title: "Cloud Computing Seminar",
    image: "/images/workshop.png",
    description: "Understand cloud architecture with AWS, Azure, and GCP.",
    venue: "Conference Room B",
    time: "2:00 PM - 5:00 PM",
  },
];

const MoreEvents = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(workshopData[0]);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: theme.aliceBlue }}>
      <Navbar />
      <div className="flex flex-col items-center py-10">
        <h1 className="text-5xl font-bold text-center mb-6" style={{ color: theme.eerieBlack }}>TECHUTSAV 2025</h1>
        <h2 className="text-3xl font-semibold text-center mb-10" style={{ color: theme.berkeleyBlue }}>EVENTS</h2>
      </div>

      <div className="flex w-full max-w-7xl mx-auto p-6 gap-10">
        {/* Left Side: Workshop List */}
        <div className="w-1/2 flex flex-col gap-6 overflow-y-auto max-h-[500px]">
          {workshopData.map((workshop) => (
            <motion.div
              key={workshop.id}
              className="cursor-pointer p-4 rounded-lg shadow-md flex items-center gap-4 transition"
              style={{ backgroundColor: theme.columbiaBlue }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedWorkshop(workshop)}
            >
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold" style={{ color: theme.eerieBlack }}>{workshop.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Workshop Details */}
        <motion.div
          className="w-1/2 p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: theme.uclaBlue, color: theme.columbiaBlue }}
          key={selectedWorkshop.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">{selectedWorkshop.title}</h3>
          <img
            src={selectedWorkshop.image}
            alt={selectedWorkshop.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <p className="text-lg">{selectedWorkshop.description}</p>
          <div className="mt-4">
            <p><strong>Venue:</strong> {selectedWorkshop.venue}</p>
            <p><strong>Time:</strong> {selectedWorkshop.time}</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default MoreEvents;