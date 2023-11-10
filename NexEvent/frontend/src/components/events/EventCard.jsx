import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

export default function EventCard(props) {
  const id = props.id;
  const name = props.name;
  const date = props.date;
  const location = props.location;
  const description = props.description;
  const image = props.image;

  const navigate = useNavigate();

  return (
    <div className="relative m-8 flex w-3/5 items-center justify-between rounded-3xl bg-gray-100 p-28">
      <img
        src="https://picsum.photos/400" // src={image}
        alt=""
        className="absolute left-0 -ml-64 rounded-lg p-6 shadow-lg"
      />
      <div className="ml-24 flex w-full flex-col">
        <span className="p-2 text-gray-500">{date}</span>
        <span className="p-2 text-5xl font-bold">{name}</span>
        <p className="p-2 text-lg">{description}</p>
        <div className="mt-12 flex flex-row items-center justify-between">
          <Button
            onClick={() => {
              navigate(`/event/${id}/`);
            }}
          >
            Read More
          </Button>
          <span className="mr-12 flex p-2 text-xl text-gray-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
            At: {location}
          </span>
        </div>
      </div>
    </div>
  );
}
