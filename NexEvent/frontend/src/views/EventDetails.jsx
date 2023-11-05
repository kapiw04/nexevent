import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";

export default function EventDetails() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events/` + id + `/`
        );
        setEventData(response.data);
      } catch (error) {
        console.error(
          "Error fetching event data:",
          error.response || error.message
        );
      }
    };
    fetchEventData();
  }, []);

  return (
    <div className="grid grid-cols-3">
      <img
        src="https://picsum.photos/800"
        alt=""
        className="overflow-hidden object-cover h-full col-span-1"
      />
      <div className="flex justify-start items-start col-span-2 flex-col m-12">
        <h1 className="text-8xl font-extrabold">
          {eventData ? eventData.name : "Loading..."}
        </h1>
        <div>
          <h2 className="text-4xl font-semibold mt-16">Description</h2>
          <p className="text-2xl text-gray-500 pt-2 text-justify mx-6">
            {eventData ? eventData.description : "Loading..."}
          </p>
        </div>
        <div>
          <h2 className="text-4xl font-semibold mt-16">Date and Time</h2>
          <p className="grid-cols-6 text-2xl mt-2 p-4 pr-12 shadow-xl rounded-2xl border">
            {eventData ? eventData.start_date : "Loading..."} to{" "}
            {eventData ? eventData.end_date : "Loading..."}
            <p className="text-gray-500 font-thin">
              {eventData ? eventData.start_time : "Loading..."} to{" "}
              {eventData ? eventData.end_time : "Loading..."}
            </p>
          </p>
        </div>
        <div>
          <h2 className="text-4xl font-semibold mt-16">Location</h2>
          <p className="text-2xl text-gray-500 pt-2">
            {eventData ? eventData.location : "Loading..."}
          </p>
        </div>
        <div className="mt-16 flex justify-center items-center w-full">
          <Button>Join Event</Button>
        </div>
      </div>
    </div>
  );
}
