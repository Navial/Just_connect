import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

const GoogleEventItem = ({ event }) => {
  return (
    <Card title={event.summary} style={{ width: 300, marginTop: 16 }}>
      <Text>{event.description}</Text>
      <p>
        <strong>Début:</strong> {new Date(event.start.dateTime).toLocaleString()}
      </p>
      <p>
        <strong>Fin:</strong> {new Date(event.end.dateTime).toLocaleString()}
      </p>
      <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
        Voir sur Google Calendar
      </a>
    </Card>
  );
};

export default GoogleEventItem;
