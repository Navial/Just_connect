
const UserDiscordInformation = ({user, guilds}) => {

  console.log({guilds});

  return (
    <div>
      <h2>Informations Utilisateur</h2>
      {user ? (
        <ul>
          <li>Nom: {user.username}</li>
          <li>Global Name: {user.global_name}</li>
        </ul>
      ) : (
        <p>Chargement des informations...</p>
      )}


      <h2>Liste des serveurs </h2>
      {guilds ? (
        <ul>
          {guilds.map(guild => <li key = {guild.id}> Name : {guild.name}</li>)}
        </ul>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
};

export default UserDiscordInformation;
