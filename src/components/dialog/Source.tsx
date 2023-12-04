import { Source } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getUserSource,
  sourceListSelector,
  userDataSelector,
} from "../../redux/features/userPrefSlice";

const Source = () => {
  const dispatch = useAppDispatch();
  const sourceList = useAppSelector(sourceListSelector);
  const userData = useAppSelector(userDataSelector);

  const toggleSourceTag = (tag: string) => dispatch(getUserSource(tag));

  return (
    <>
      <h3 className="font-extrabold text-lg">Select Your Interests</h3>
      <div className="flex flex-wrap pt-4">
        <div className="flex flex-wrap gap-4">
          <p className="text-lg font-bold block">Sources: </p>
          {sourceList.map((data: Source, idx: React.Key) => (
            <label key={idx} className="inline-flex items-center">
              <input type="checkbox" className="hidden" />
              <div
                onClick={() => toggleSourceTag(data?.name)}
                className={`badge capitalize cursor-pointer p-3 ${
                  userData.source.includes(data?.name)
                    ? "badge-success"
                    : "badge-outline badge-success"
                }`}
              >
                {data?.name}
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Source;
