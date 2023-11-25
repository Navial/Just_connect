import { getAuthenticatedUser } from "../../services/auths";
import userService from "../../services/userService";
import { useEffect, useState } from "react";

import GoogleCalendar from "./GoogleCalendar";
import AddGoogleEventForm from "./AddGoogleEventForm";
import GoogleUserInformation from "./GoogleUserInformation";
const GooglePage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const eventsFetched = await userService.getGoogleCalendar();
      setEvents(eventsFetched);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements:", error);
    }
  };

  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventAdded = () => {
    fetchEvents();
  };

  return (
    <>
      <GoogleUserInformation />

      <GoogleCalendar events={events}/>
      <AddGoogleEventForm onEventAdded={handleEventAdded}/>
    </>
  );
};

export default GooglePage;
