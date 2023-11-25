import React from "react";
import { Card, Typography, Space} from "antd";

const { Text } = Typography;

const GoogleEventItem = ({ event }) => {
  return (
    <Card
      title={event.summary}
      style={{ width: 400, marginBottom: 16, borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <div>
        <Text type="secondary">{event.description}</Text>
      </div>
      <Space direction="vertical" size={8} style={{ marginTop: 16 }}>
        <Text>
          <strong>Début:</strong> {new Date(event.start.dateTime).toLocaleString()}
        </Text>
        <Text>
          <strong>Fin:</strong> {new Date(event.end.dateTime).toLocaleString()}
        </Text>
      </Space>
      <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: 16 }}>
        Voir sur Google Calendar
      </a>
    </Card>
  );
};

export default GoogleEventItem;
