import { useEffect, useState } from "react";
import { Article } from "../../types";

const Slider = ({ data }: { data: Article[] }) => {
  const [headlines, setHeadlines] = useState<Article[]>(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setHeadlines(data);
  }, [data]);

  useEffect(() => {
    // Auto slide every 5 seconds
    const intervalId = setInterval(() => {
      setHeadlines((prevHeadlines) => {
        const updatedHeadlines = prevHeadlines
          .slice(1)
          .concat(prevHeadlines.slice(0, 1));
        return updatedHeadlines;
      });
      setCurrentIndex(0); // Reset currentIndex to 0
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [headlines]); // Include headlines in the dependencies array to trigger the effect when headlines change

  const handleIndicatorClick = (index: number) => {
    // Create a new array starting from the clicked index
    const updatedHeadlines = headlines
      .slice(index)
      .concat(headlines.slice(0, index));
    setCurrentIndex(0); // Reset currentIndex to 0
    setHeadlines(updatedHeadlines); // Update the array
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="relative">
        <div className="flex space-x-4 overflow-x-hidden relative slide-container">
          {headlines.map((article: Article, idx: number) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-full ${
                idx === currentIndex ? "" : "scale-100"
              }`}
            >
              <div
                onClick={() => handleIndicatorClick(idx + 1)}
                className="relative rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={article.img}
                  alt={article.headline}
                  className="object-cover w-full h-64"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 p-4">
                  <h2 className="text-white text-xl font-bold">
                    {article.headline}
                  </h2>
                  <p className="text-gray-300">{article.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {headlines.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-4 h-4 rounded-full bg-white focus:outline-none ${
                index === currentIndex ? "opacity-75" : "opacity-50"
              }`}
            ></button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Slider;
