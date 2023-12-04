import { useEffect } from "react";
import { ASlider, AList } from "@comp/index";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Article } from "../../types";
import {
  getHeadlineAction,
  headlinesListSelector,
} from "../../redux/features/headLineSlice";
import { arr } from "@utils/index";
import { userDataSelector } from "../../redux/features/userPrefSlice";
const Home = () => {
  const dispatch = useAppDispatch();
  const articles: Article[] = useAppSelector(headlinesListSelector);
  const userData = useAppSelector(userDataSelector);

  // useEffect(() => {
  //   dispatch(
  //     getHeadlineAction({
  //       country: userData.country,
  //       category: userData.category,
  //     })
  //   );
  // }, []);

  return (
    <div className="max-w-screen-xl mx-auto min-w-screen-sm-sm xl:px-0 lg:px-8 md:px-6 px-4">
      <ASlider data={arr.first(articles, 5)} />
      <AList data={articles} />
    </div>
  );
};

export default Home;
