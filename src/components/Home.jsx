import RecentActivity from "./RecentActivity";
import TaskSummary from "./TaskSummary";
import { ButtonsHome } from "./ButtonsHome";
import HeaderHome from "./HeaderHome";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <HeaderHome />

      <ButtonsHome />

      <TaskSummary />

      <RecentActivity />
    </div>
  );
};

export default Home;
