import React from "react";

const RepositoryCard = ({
  name,
  description,
  visibility,
  clone_url,
  created_at,
  updated_at,
}) => {
  return (
    <div className="repository-card">
      <a href={clone_url}>
        <h3>{name}</h3>
      </a>
      {description ? <p>{description}</p> : <p> Pas de description</p>}
      <p>Created the : {created_at}</p>
      <p>Last update : {updated_at}</p>
      <p>Visibilité : {visibility}</p>
      <p>Clone URL : {clone_url} </p>
    </div>
  );
};

export default RepositoryCard;
