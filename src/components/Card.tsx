import { agoTime } from "@utils/index";
import { Article } from "../types";

const Card = ({ newsFeed }: { newsFeed: Article }) => {
  const {
    img,
    headline,
    source,
    web_url,
    category,
    author,
    pub_date,
    description,
  } = newsFeed;

  return (
    <article className="card w-full p-2 mb-4 bg-base-300 rounded-md shadow-md flex-none h-full ">
      <div className="flex justify-between mb-1">
        <p className="text-red-500">{source}</p>
        {/* <span
          className={`tag p-1 rounded-md bg-gray-500 cursor-pointer text-xs`}
        >
          Gaming
        </span> */}
        <div className="badge badge-success">{category}</div>
      </div>
      <img
        src={img}
        alt="article image"
        className="w-full h-60 object-cover rounded-t-md mb-2"
      />
      <h2 className="text-xl font-semibold text-base-content overflow-hidden overflow-ellipsis">
        {headline}
      </h2>
      <span className="text-info mt-1">
        <svg
          className="w-4 h-4 inline mr-1 -mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        {agoTime(pub_date)}
      </span>

      <div className="card-body p-0 mt-2">
        <div className="text-base-content">
          <p>{description}...</p>
        </div>
        <div className="flex justify-between items-center card-actions mt-auto">
          <div className="flex items-center justify-center">
            <img
              className="h-8 w-8 rounded-full shadow-lg"
              src="/assets/avatar2.png"
              alt="User avatar"
            />
            <p className="text-sm ms-2 text-base-content">{author}</p>
          </div>
          <a
            href={web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:underline block"
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
};

export default Card;
