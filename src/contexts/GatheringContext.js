// GatheringContext.js

import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const GatheringContext = createContext();

export const GatheringContextProvider = ({ children }) => {
  const [gatherings, setGatherings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [userParticipations, setUserParticipations] = useState([]);

  // Fetch all gatherings
  const fetchGatherings = async () => {
    try {
      const res = await axios.get(
        "https://telescope-server.onrender.com/gathering"
      );
      setGatherings(res.data);
    } catch (error) {
      console.error("There was an error fetching gatherings!", error);
    }
  };

  const fetchUserParticipations = async () => {
    try {
      const res = await axios.get(
        "https://telescope-server.onrender.com/auth/participations",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      setUserParticipations(res.data);
    } catch (error) {
      console.error("There was an error fetching gatherings!", error);
    }
  };

  // Fetch gathering participants
  const fetchParticipants = async (gatheringId) => {
    try {
      const res = await axios.get(
        `https://telescope-server.onrender.com/gathering/${gatheringId}/participants`
      );
      setParticipants(res.data);
    } catch (error) {
      console.error("There was an error fetching participants!", error);
    }
  };

  const enroll = async (gatheringId) => {
    try {
      const res = axios.post(
        "https://telescope-server.onrender.com/auth/enroll",
        { gatheringId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      toast.success("Enrolled successfully!");
    } catch (error) {
      console.error("There was an error enrolling!", error);
      toast.error("You are already enrolled in this gathering!");
    }
  };

  const unenroll = async (gatheringId) => {
    try {
      await axios.delete(
        `https://telescope-server.onrender.com/auth/unenroll/${gatheringId}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      toast.success("Unenrolled successfully!");
    } catch (error) {
      console.error("There was an error unenrolling!", error);
    }
  };

  return (
    <GatheringContext.Provider
      value={{
        gatherings,
        participants,
        fetchGatherings,
        fetchParticipants,
        enroll,
        fetchUserParticipations,
        userParticipations,
        unenroll,
      }}
    >
      {children}
    </GatheringContext.Provider>
  );
};

export const useGathering = () => {
  return useContext(GatheringContext);
};
