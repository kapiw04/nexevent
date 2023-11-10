import EventCard from "./EventCard";

export default function EventSection(props) {
  const { events } = props;

  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            description={event.description}
            date={event.start_date}
            location={event.location}
          />
        ))}
      </div>
    </div>
  );
}
