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
    <div className="bg-gray-100 rounded-3xl w-3/5 p-28 m-8 flex justify-between relative items-center">
      <img
        src="https://picsum.photos/400" // src={image}
        alt=""
        className="p-6 rounded-lg shadow-lg absolute left-0 -ml-64"
      />
      <div className="flex flex-col ml-24 w-full">
        <span className="p-2 text-gray-500">{date}</span>
        <span className="font-bold p-2 text-5xl">{name}</span>
        <p className="p-2 text-lg">{description}</p>
        <div className="flex flex-row mt-12 justify-between items-center">
          <Button
            onClick={() => {
              navigate(`/event/${id}/`);
            }}
          >
            Read More
          </Button>
          <span className="p-2 text-xl text-gray-500 flex mr-12">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-2"
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
