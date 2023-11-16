import React, { useState, useEffect } from "react";

const UserDiscordInformation = () => {
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await fetch("http://localhost:3000/userInformations");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations utilisateur.");
        }

        const data = await response.json();
        console.log(data);
        setUserInformation(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchUserInformation();
  }, []); // La dépendance vide signifie que cela ne doit être exécuté qu'une fois au montage

  return (
    <div>
      <h2>Informations Utilisateur</h2>
      {userInformation ? (
        <ul>
          <li>Nom: {userInformation.name}</li>
          <li>Email: {userInformation.email}</li>
          {/* Ajoutez d'autres éléments en fonction des propriétés de vos données */}
        </ul>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
};

export default UserDiscordInformation;
