import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, color } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../api/auth'
import Navbar from '../components/Navbar'
import Footer from './Footer'
import { useParams } from 'react-router-dom'
import MainLoader from '../components/MainLoader'
import '../css/entire.css'
import Typography from '@mui/material/Typography'

const workshopData = [
  {
    id: 1,
    title: 'AI & ML Workshop',
    image: '/images/event1.jpg',
    description: 'Explore AI & ML fundamentals with hands-on projects.',
    venue: 'Auditorium Hall A',
    time: '10:00 AM - 2:00 PM',
    teamSize: 'Up to 3 members',
    prerequisites: 'Basic Python knowledge',
    eligibility: 'Open to all students and professionals',
    fullDescription:
      'This workshop introduces AI and ML concepts, including supervised and unsupervised learning, neural networks, and practical applications.'
  },
  {
    id: 2,
    title: 'Cybersecurity Bootcamp',
    image: '/images/event2.jpg',
    description: 'Learn ethical hacking and cybersecurity techniques.',
    venue: 'Lab 5, IT Block',
    time: '11:00 AM - 3:00 PM',
    teamSize: 'Individual only',
    prerequisites: 'Basic networking knowledge',
    eligibility: 'Students with IT background preferred',
    fullDescription:
      'Understand cybersecurity threats, penetration testing, and ethical hacking techniques. Learn how to secure networks and protect data.'
  },
  {
    id: 3,
    title: 'Blockchain Seminar',
    image: '/images/event3.jpg',
    description: 'Dive into blockchain and cryptocurrency applications.',
    venue: 'Seminar Hall 2',
    time: '1:00 PM - 4:00 PM',
    teamSize: 'Up to 4 members',
    prerequisites: 'Basic understanding of databases',
    eligibility: 'Open to all',
    fullDescription:
      'Learn the fundamentals of blockchain technology, its security aspects, and real-world applications in finance and beyond.'
  },
  {
    id: 4,
    title: 'AR/VR Innovation Summit',
    image: '/images/event4.jpg',
    description: 'Explore the future of Augmented and Virtual Reality.',
    venue: 'Innovation Lab',
    time: '3:00 PM - 6:00 PM',
    teamSize: 'Up to 5 members',
    prerequisites: 'None',
    eligibility: 'Tech enthusiasts welcomed',
    fullDescription:
      'This summit showcases AR/VR technologies, industry trends, and hands-on experience with cutting-edge immersive tools.'
  }
]

const theme = {
  eerieBlack: '#1C2127',
  berkeleyBlue: '#0B385F',
  uclaBlue: '#3373B0',
  columbiaBlue: '#BED4E9',
  aliceBlue: '#E7F1FB'
}

const MoreEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const originalNames = [
    'All',
    'Computer Science and Engineering',
    'Information Technology',
    'Computer Science and Business Systems',
    'Applied Mathematics and Computational Science'
  ]
  const { departmentName } = useParams()
  const options = ['All', 'CSE', 'IT', 'CSBS', 'DS']
  const [isSeeMoreHovered, setIsSeeMoreHovered] = useState(false)
  const scrollUp = useRef(null)
  useEffect(() => {
    scrollUp.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const [eventDetails, setEventDetails] = useState([])
  const [loading, setLoading] = useState(true)

  //Toggle
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  }

  const handleMenuItemClick = (event, index) => {
    console.log(options[index])
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    setLoading(true)
    api
      .post('event/getSpecificEvents', {
        departmentName: originalNames[options.indexOf(departmentName)]
      })
      .then(result => {
        // console.log(departmentName,'dep name'),
        setEventDetails(result.data)
        // console.log(eventDetails[0]['uniqueName'], '.........')
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(true)
      })
  }, [selectedIndex])

  return (
    <div>
      {
        loading?(<MainLoader/> ) :(
          <div
      className='w-full min-h-screen text-gray-800'
      style={{ backgroundColor: theme.aliceBlue }}
    >
      <Navbar />

      <div
        className='text-center py-6'
        style={{ backgroundColor: theme.aliceBlue }}
      >
        <h1 className='text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
          Techutsav 2025 Events
          
        </h1>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full p-6 gap-6'>
        {/* Left - Image Section */}
        <motion.img
          key={eventDetails[currentIndex]._id}
          src='/images/event2.jpg'
          alt={eventDetails[currentIndex].uniqueName}
          className=' lg:w-1/1 h-96 object-scale-down rounded-xl shadow-lg '
          initial={{ opacity: 0.5, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3  }}
          whileHover={{scale:1.02}}
        />

        {/* Right - Event Details */}
        <motion.div
          className='w-full  p-6 rounded-xl shadow-lg '
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: theme.columbiaBlue ,color:theme.berkeleyBlue}}
        >
          <h2 className='text-3xl font-bold text-blue-600'>
            {eventDetails[currentIndex].eventName}
          </h2>
          <p className='text-lg mt-2'>
            {eventDetails[currentIndex].eventAbstract}
          </p>
          <p className='mt-2'>
            <strong>📍 Venue:</strong> {eventDetails[currentIndex].venue}
          </p>
          <p>
            <strong>🕒 Time:</strong> {eventDetails[currentIndex].eventTiming}
          </p>

          <button
            className='mt-4 px-6 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300'
            onClick={() => setModalOpen(true)}
          >
            More Details
          </button>
        </motion.div>
      </div>

      {/* Thumbnails */}
      <div className='flex overflow-x-auto p-4 gap-4 justify-center'>
        {eventDetails.map((event, index) => (
          <motion.img
            key={event.id}
            src={''}
            alt={event.uniqueName}
            className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? 'border-4 border-blue-500 scale-110'
                : 'border-2 border-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      

      {/* Modal for More Details */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className='fixed inset-0 mt-3 bg-black bg-opacity-70 flex items-center justify-center p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 1000 }} // Ensure the modal is on top

          >
            <motion.div
              className='bg-white text-gray-800 p-8 rounded-xl max-w-xl w-full shadow-2xl relative '
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              style={{backgroundColor:theme.aliceBlue, color:theme.berkeleyBlue}}
            >
              <h2 className='text-3xl font-bold text-center'>
                {eventDetails[currentIndex].eventName}
              </h2>
              <div className='overflow-y-auto max-h-[60vh] mt-3'>
              <Typography
                marginTop={'24px'}
                fontSize={'18px'}
                className='whitespace-pre-wrap'
              >
                {eventDetails[currentIndex].eventDesp}
              </Typography>
              {/* <p className='mt-3'>
                <strong>👥 Team Size:</strong>{' '}
                {workshopData[currentIndex].teamSize}
              </p> */}
              <p className='mt-3'>
                <strong>📚 Contact :</strong>{' '}
                {eventDetails[currentIndex].incharge}
              </p>
              
              <p>
                <strong>Mobile Number:</strong>{' '}
                {eventDetails[currentIndex].inchargeNumber}
              </p>
              </div>

              <div className='flex justify-between mt-5'>
                <button className='px-5 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300'>
                  Register Now
                </button>
                <button
                  className='px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-800 transition-all duration-300'
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
        )
      }
    </div>
  )
}

export default MoreEvents
