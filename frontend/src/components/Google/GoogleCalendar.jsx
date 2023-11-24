import { useState, useEffect } from "react";
import userService from "../../services/userService";
import GoogleEventItem from "./GoogleEventItem";

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsFetched = await userService.getGoogleCalendar();
        setEvents(eventsFetched);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour diviser le tableau en sous-tableaux de taille donnée (ici, 3)
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Diviser les événements en sous-listes de 3
  const eventsChunks = chunkArray(events, 3);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Liste des Événements</h2>
      {eventsChunks.map((eventsRow, index) => (
        <div key={index} style={{ display: "flex", marginBottom: 16  }}>
          {eventsRow.map((event) => (
            <GoogleEventItem key={event.id} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GoogleCalendar;
