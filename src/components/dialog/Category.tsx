import { Source } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  categoryListSelector,
  getUserCategory,
  userDataSelector,
} from "../../redux/features/userPrefSlice";

const Category = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(categoryListSelector);
  const userData = useAppSelector(userDataSelector);

  const toggleCategoryTag = (tag: string) => dispatch(getUserCategory(tag));

  return (
    <>
      <h3 className="font-extrabold text-lg">Select Your Interests</h3>
      <div className="flex flex-wrap pt-4">
        <div className="flex flex-wrap gap-4 py-4">
          <p className="text-lg font-bold block">Categories: </p>
          {categoryList?.map((category: Source, idx: number) => (
            <label className="inline-flex items-center" key={idx}>
              <input type="checkbox" className="hidden" />
              <div
                onClick={() => toggleCategoryTag(category.name)}
                className={`badge capitalize hover:bg-success hover:text-black cursor-pointer p-3 ${
                  userData.category.includes(category.name)
                    ? "badge-success"
                    : "badge-outline badge-success"
                }`}
              >
                {category.name}
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
