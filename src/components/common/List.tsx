import { ACard } from "..";
import { Article } from "../../types";

const List = ({ data }: { data: Article[] }) => {
  return (
    <div className="z-10">
      <div className="grid gap-x-8 gap-y-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 my-6">
        {data.map((article: Article, idx: React.Key) => (
          <ACard key={idx} newsFeed={article} />
        ))}
      </div>
    </div>
  );
};

export default List;
{
  /* <LoadSkeleton times={10} /> */
}
