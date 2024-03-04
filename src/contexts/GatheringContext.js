// GatheringContext.js

import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../contexts/AuthContext";

const GatheringContext = createContext();

export const GatheringContextProvider = ({ children }) => {
  const [gatherings, setGatherings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [userParticipations, setUserParticipations] = useState([]);
    const {user} = useAuth();

  // Fetch all gatherings
  const fetchGatherings = () => {
    axios
      .get("http://localhost:3001/gathering")
      .then((response) => {
        setGatherings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching gatherings!", error);
      });
  };


  const fetchUserParticipations = () => {
    axios
      .get("http://localhost:3001/auth/participations", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUserParticipations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching gatherings!", error);
      });
  }

  // Fetch gathering participants
  const fetchParticipants = (gatheringId) => {
    axios
      .get(`http://localhost:3001/gathering/${gatheringId}/participants`)
      .then((response) => {
        setParticipants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching participants!", error);
      });
  };

  const enroll = (gatheringId) => {

    axios
      .post(
        "http://localhost:3001/auth/enroll",
        { gatheringId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // After successful enrollment, fetch participants again to update state
        toast.success("Enrolled successfully!");
        fetchParticipants(gatheringId);
        fetchUserParticipations();
      })
      .catch((error) => {
        console.error("There was an error enrolling!", error);
        toast.error("You are already enrolled in this gathering!");
      });
  };

  const unenroll = (gatheringId) => {
    axios
      .delete(`http://localhost:3001/auth/unenroll/${gatheringId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // After successful unenrollment, fetch participants again to update state
        toast.success("Unenrolled successfully!");
        fetchParticipants(gatheringId);
        fetchUserParticipations();
      })
      .catch((error) => {
        console.error("There was an error unenrolling!", error);
      });
  }

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
        unenroll
      }}
    >
      {children}
    </GatheringContext.Provider>
  );
};

export const useGathering = () => {
  return useContext(GatheringContext);
};
