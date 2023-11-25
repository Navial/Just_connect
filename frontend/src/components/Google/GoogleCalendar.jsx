import { useState, useEffect } from "react";
import userService from "../../services/userService";
import GoogleEventItem from "./GoogleEventItem";

const GoogleCalendar = ({events}) => {
  
  // Fonction pour diviser le tableau en sous-tableaux de taille donnée (ici, 3)
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Diviser les événements en sous-listes de 3
  const eventsChunks = chunkArray(events, 3);

  console.log({events});
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Liste des Événements</h2>
      {events.length === 0 ? (
      <p>Aucun événement</p>
    ) : (
      eventsChunks.map((eventsRow, index) => (
        <div key={index} style={{ display: "flex", marginBottom: 16 }}>
          {eventsRow.map((event) => (
            <GoogleEventItem key={event.id} event={event} />
          ))}
        </div>
      ))
    )}
    </div>
  );
};

export default GoogleCalendar;
