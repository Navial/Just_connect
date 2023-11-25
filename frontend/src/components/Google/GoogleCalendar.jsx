import GoogleEventItem from "./GoogleEventItem";
import { Empty, Space } from "antd";
const GoogleCalendar = ({ events }) => {
  // Fonction pour diviser le tableau en sous-tableaux de taille donnée (ici, 3)
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // Diviser les événements en sous-listes de 3
  const eventsChunks = chunkArray(events, 2);

  console.log({ events });
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <h2>Liste des Événements</h2>
      {events.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<p>Aucun événement</p>}
        />
      ) : (
        eventsChunks.map((eventsRow, index) => (
          <div key={index}>
            <Space key={index} style={{ marginBottom: 16 }}>
              {eventsRow.map((event) => (
                <GoogleEventItem key={event.id} event={event} />
              ))}
            </Space>
          </div>
        ))
      )}
    </div>
  );
};

export default GoogleCalendar;
